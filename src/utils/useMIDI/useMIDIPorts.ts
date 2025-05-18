// useMIDIPorts.ts
import useMidiPortsStore from "@/assets/stores/useMidiPortsStore.ts";
import useMIDIPortsStore from "@/assets/stores/useMidiPortsStore.ts";
import useMIDIReady from "@/utils/useMIDI/useMIDIReady.ts";
import {isNull, isUndefined} from "lodash";
import {useEffect, useMemo, useState} from "react";
import {useLocation} from "react-router-dom";

const useMIDIPorts = () => {
	const {
		inputs,
		outputs,
		selectedInPortIndex,
		selectedOutPortIndex,
		setInputs,
		setOutputs,
		setSelectedInPortIndex,
		setSelectedOutPortIndex,
		cleanup,
	} = useMIDIPortsStore();
	const {initJzz} = useMidiPortsStore()
	const {isWebMidiSupport, isJzzEngineReady} = useMIDIReady();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const jzzInstance = useMemo(() => {
		initJzz();
		return useMIDIPortsStore.getState().jzzInstance
	}, [isWebMidiSupport, isJzzEngineReady])

	jzzInstance.onChange(() => {
		jzzInstance.refresh();
		initJzz();
		refreshPorts();
	})

	// 监听JZZ引擎状态变化，更新端口列表
	useEffect(() => {
		initJzz();
		if (!isWebMidiSupport || !isJzzEngineReady) {
			setInputs([]);
			setOutputs([]);
			setError("WebMIDI不支持或引擎未就绪");
			return;
		}

		setLoading(true);
		setError(null);


		if (!jzzInstance) {
			setError("JZZ实例未初始化");
			setLoading(false);
			return;
		}
		if (isNull(jzzInstance)) return;
		if (isUndefined(jzzInstance)) return;

		jzzInstance.and(() => {
			try {
				const info = jzzInstance.info();
				setInputs(info.inputs || []);
				setOutputs(info.outputs || []);
			} catch (err) {
				console.error("获取MIDI端口信息时发生异常:", err);
				setError(err instanceof Error ? err.message : "未知错误");
				setInputs([]);
				setOutputs([]);
			} finally {
				setLoading(false);
			}
		}).or((err) => {
			console.error("获取MIDI端口信息失败:", err);
			setError(err?.toString() || "获取端口信息失败");
			setInputs([]);
			setOutputs([]);
			setLoading(false);
		});
	}, [isWebMidiSupport, isJzzEngineReady, setInputs, setOutputs, cleanup]);

	// 手动刷新端口信息
	const refreshPorts = () => {
		if (!isWebMidiSupport || !isJzzEngineReady) return;

		setLoading(true);
		setError(null);

		const jzzInstance = useMIDIPortsStore.getState().jzzInstance;
		if (!jzzInstance) {
			setError("JZZ实例未初始化");
			setLoading(false);
			return;
		}

		jzzInstance.and(() => {
			try {
				const info = jzzInstance.info();
				setInputs(info.inputs || []);
				setOutputs(info.outputs || []);
			} catch (err) {
				console.error("刷新MIDI端口信息时发生异常:", err);
				setError(err instanceof Error ? err.message : "未知错误");
			} finally {
				setLoading(false);
			}
		}).or((err) => {
			console.error("刷新MIDI端口信息失败:", err);
			setError(err?.toString() || "刷新端口信息失败");
			setLoading(false);
		});
	};

	// 返回状态和操作方法
	return useMemo(
		() => ({
			inputs,
			outputs,
			selectedInPortIndex,
			selectedOutPortIndex,
			setSelectedInPortIndex,
			setSelectedOutPortIndex,
			loading,
			error,
			refreshPorts,
			isWebMidiSupport,
			isJzzEngineReady,
		}),
		[
			inputs,
			outputs,
			selectedInPortIndex,
			selectedOutPortIndex,
			loading,
			error,
			refreshPorts,
			isWebMidiSupport,
			isJzzEngineReady,
		]
	);
};

export default useMIDIPorts;
