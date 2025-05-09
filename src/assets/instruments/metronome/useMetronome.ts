import rhythmPatterns from "@/assets/instruments/metronome/rhythmPatterns.ts";
import useBeatFunctionsConfig from "@/assets/stores/useBeatFunctionsConfig.ts";
import {useCallback, useEffect, useMemo, useRef} from "react";
import * as Tone from "tone";
import metronomeBase64URLs from "./metronomeBase64URLs.ts";


const useMetronome = () => {
	const {
		isMetronomePlaying,
		isMetronomeReady,
		setIsMetronomeReady,
		bpm,
		beatType,
		setBeatIndexOfMeasure,
		setIsMetronomePlaying,
		beatIndexOfMeasure
	} = useBeatFunctionsConfig();

	// 音频播放器实例
	const players = useRef({
		weak: new Tone.Player().toDestination(),
		medium: new Tone.Player().toDestination(),
		strong: new Tone.Player().toDestination()
	});

	// 显式管理Transport
	const transport = useRef(Tone.getTransport());

	// 音频加载逻辑
	const loadAudio = useCallback(async () => {
		await Tone.start();
		const loadPromises = [
			players.current.weak.load(metronomeBase64URLs.C3),
			players.current.medium.load(metronomeBase64URLs.G4),
			players.current.strong.load(metronomeBase64URLs.C5)
		];
		await Promise.all(loadPromises);
		setIsMetronomeReady(true);
		if (import.meta.env.DEV) {
			console.log("[系统] 音频加载完成，准备就绪");
		}
	}, []);

	// 用户手势触发加载
	useEffect(() => {
		const handleUserGesture = async () => {
			window.removeEventListener("click", handleUserGesture);
			window.removeEventListener("touchstart", handleUserGesture);
			await loadAudio();
		};
		window.addEventListener("click", handleUserGesture);
		window.addEventListener("touchstart", handleUserGesture);
		return () => {
			window.removeEventListener("click", handleUserGesture);
			window.removeEventListener("touchstart", handleUserGesture);
		};
	}, [loadAudio]);

	const beatIndexRef = useRef(0);
	const lastBeatTime = useRef(0);

	useEffect(() => {
		if (import.meta.env.DEV) {
			console.log(beatIndexRef.current);
		}
	}, [beatIndexRef]);

	// BPM变化处理
	useEffect(() => {
		if (isMetronomePlaying) stopPlayback();
		const adjustedBpm = beatType === "6/8" ? bpm / 2 : bpm;
		transport.current.bpm.value = adjustedBpm;
		console.log(`[BPM变更] 新BPM：${adjustedBpm}`);
	}, [bpm, beatType]);

	// 节奏类型变化处理
	useEffect(() => {
		beatIndexRef.current = 0;
		setBeatIndexOfMeasure(0);
		if (import.meta.env.DEV) {
			console.log(`[节奏切换] 新节奏：${beatType}`);
		}
		stopPlayback();
	}, [beatType]);

	// 核心调度逻辑
	const scheduleBeats = useCallback((startTime: number) => {
		const currentPattern = rhythmPatterns[beatType];
		if (!currentPattern || !isMetronomeReady) {
			if (import.meta.env.DEV) {
				console.warn("[调度失败] 音频未就绪或节奏类型无效");
			}
			return;
		}

		// const adjustedBpm = beatType === "6/8" ? bpm / 2 : bpm;
		const interval = beatType === "6/8" ? 30 / bpm : 60 / bpm;
		const intervalTone = `${interval}n`;
		console.log(`[调度配置] 节奏：${beatType}，BPM：${bpm}，间隔：${interval.toFixed(3)}s`);

		// 彻底清除旧调度并重置Transport时间
		transport.current.stop();
		transport.current.cancel();

		// 首拍立即触发（相对于Transport当前时间，即startTime）
		transport.current.schedule(() => {
			const firstAccent = currentPattern.accentMap[0];
			players.current[firstAccent].start(0); // 0表示相对于transport.time的偏移，即startTime
			lastBeatTime.current = startTime;
			beatIndexRef.current = 1; // 重置节拍索引，这里是从1开始
			setBeatIndexOfMeasure(0);
			console.log(`[首拍触发] ${firstAccent}，时间：${startTime.toFixed(3)}s`);
		}, 0);

		// 后续节拍按间隔重复（相对于Transport时间，从interval偏移开始）
		transport.current.scheduleRepeat((time) => {
			const accentType = currentPattern.accentMap[beatIndexRef.current];
			players.current[accentType].start(time);

			const actualInterval = time - lastBeatTime.current;
			lastBeatTime.current = time;
			beatIndexRef.current = (beatIndexRef.current + 1) % currentPattern.beatsPerMeasure;

			console.log(`[节拍触发] 当前节拍索引: ${beatIndexRef.current}`); // 添加日志
			if (beatIndexRef.current === 0) {
				setBeatIndexOfMeasure(currentPattern.accentMap.length - 1);
			} else {
				setBeatIndexOfMeasure(beatIndexRef.current - 1);
			}

			console.log(
				`[节拍触发] ${accentType}，时间：${(time + startTime).toFixed(3)}s，` +
				`预期间隔：${interval.toFixed(3)}s，实际间隔：${actualInterval.toFixed(3)}s`
			);
		}, intervalTone, interval); // 从interval偏移开始，即startTime + interval
	}, [beatType, bpm, isMetronomeReady]);

	// 播放控制
	const startPlayback = useCallback(() => {
		setBeatIndexOfMeasure(0)
		if (!isMetronomeReady) {
			console.warn("[播放失败] 音频未加载完成");
			return;
		}
		if (isMetronomePlaying) {
			console.log("[操作] 已在播放中，跳过重复启动");
			return;
		}

		const startTime = Tone.now();
		setIsMetronomePlaying(true);
		setBeatIndexOfMeasure(0); // 手动更新第一拍的索引
		scheduleBeats(startTime);
		transport.current.start(); // 启动Transport，基于已设置的startTime
		console.log(`[操作] 开始播放，起始时间：${startTime.toFixed(3)}s`);
	}, [isMetronomeReady, isMetronomePlaying, scheduleBeats]);

	// 停止控制
	const stopPlayback = useCallback(async () => {
		if (!isMetronomePlaying) return;

		// 停止所有音频播放器
		Object.values(players.current).forEach(player => player.stop());

		transport.current.stop();
		transport.current.cancel();

		// 增加等待时间，确保操作完成
		await new Promise((resolve) => setTimeout(resolve, 100));

		setIsMetronomePlaying(false);
		beatIndexRef.current = 0;
		lastBeatTime.current = 0;
		setBeatIndexOfMeasure(0);
		console.log(`[操作] 停止播放，当前Tone时间：${Tone.now().toFixed(3)}s`);
	}, [isMetronomePlaying]);

	// 组件卸载清理
	useEffect(() => () => {
		stopPlayback();
		players.current.weak.dispose();
		players.current.medium.dispose();
		players.current.strong.dispose();
		console.log("[系统] 组件卸载，资源已释放");
	}, []);

	const measureLength = useMemo(() => rhythmPatterns[beatType].accentMap.length, [beatType]);
	const currentStrongType = useMemo(() => {
		return rhythmPatterns[beatType].accentMap[beatIndexOfMeasure];
	}, [beatType, beatIndexOfMeasure]);

	return {
		loadAudio,
		startPlayback,
		stopPlayback,
		beatIndexRef,
		measureLength,
		currentStrongType
	};
};

export default useMetronome;
