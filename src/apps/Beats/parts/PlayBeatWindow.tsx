import googleColors from "@/assets/colors/googleColors.ts";
import rhythmPatterns from "@/assets/instruments/metronome/rhythmPatterns.ts";
import useMetronome from "@/assets/instruments/metronome/useMetronome.ts";
import useBeatFunctionsConfig from "@/assets/stores/useBeatFunctionsConfig.ts";
import cssFunctions from "@/assets/styles/cssFunctions.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import * as music12 from "@/music12";
import {css} from "@emotion/react";
import {Button} from "antd-mobile";
import {random, range} from "lodash";
import {useEffect, useMemo, useState} from "react";

const darkLightBgColor = googleColors.gray500;

const PlayBeatWindow = () => {
	const {beatType, isMetronomeReady, beatIndexOfMeasure, setBpm, isMetronomePlaying} = useBeatFunctionsConfig();

	const {loadAudio, startPlayback, stopPlayback, measureLength, currentStrongType} = useMetronome();

	//两位数字
	const [tik, setTik] = useState(-1)
	useEffect(() => {
		if (!isMetronomePlaying) {
			setTik(-1)
			return;
		}
		setTik(pre => pre + 1)
	}, [isMetronomePlaying, beatIndexOfMeasure])
	const twoDigitNumber = useMemo(() => {
		if (!isMetronomePlaying) return [0, 0]
		if (tik <= 0) return [1, 1]
		const radix = new music12.Radix.Radix(tik, measureLength).twoDigitArray
		if (radix[0] < 99) {
			return [radix[0] + 1, radix[1] + 1]
		}
		setTik(0)
		return [1, 1]
	}, [currentStrongType, isMetronomePlaying, measureLength, tik])


	//计算节拍跑马灯的颜色（通过数组取下标的方式）
	const lightsCssList = useMemo(() => {
		const darkList = Array.from({length: measureLength}, () => darkLightBgColor);
		const scaleList = Array.from({length: measureLength}, () => 1);
		if (!isMetronomePlaying) {
			return {color: darkList, scale: scaleList};
		}
		const colorMap = rhythmPatterns[beatType]['accentMap'];
		for (let index = 0; index < measureLength; index++) {
			const color = colorMap[index];
			if (index === beatIndexOfMeasure) {
				scaleList[index] = 1.2;
				if (color === "strong") {
					darkList[index] = googleColors.red400;
				} else if (color === "medium") {
					darkList[index] = googleColors.amber400;
				} else if (color === "weak") {
					darkList[index] = googleColors.green500;
				}
			}
		}
		return {color: darkList, scale: scaleList};
	}, [isMetronomePlaying, beatIndexOfMeasure, beatType, measureLength]);

	const BeatLightsReactNode = useMemo(() => {
		return range(measureLength).map((index, i) => {
			return <div key={i} className={`each_light`}
			            style={{backgroundColor: lightsCssList.color[i], transform: `scale(${lightsCssList.scale[i]})`}}/>;
		});
	}, [lightsCssList, measureLength]);

	return (
		<>
			<div css={PlayBeatWindow_css({measureLength, twoDigitNumber, isMetronomePlaying})}>
				<div className="lights_frame">
					{BeatLightsReactNode}
				</div>
				<div className="beat_frame">
					<div className="i1">{twoDigitNumber[0]}</div>
					<div className="i2">{twoDigitNumber[1]}</div>
				</div>
			</div>
		</>
	);
};

const PlayBeatWindow_css = (i: {
	measureLength: number
	twoDigitNumber: [number, number] | any
	isMetronomePlaying: boolean
}) => css({
	width: "100%",
	backgroundColor: googleColors.gray800,
	maxWidth: 350,
	...cssPresets.mxAuto,
	borderRadius: 18,
	overflow: "hidden",
	"& .lights_frame": {
		width: "100%",
		height: 50,
		...cssPresets.flexCenter,
		flexWrap: "nowrap",
		"& .each_light": {
			width: 20,
			height: 20,
			borderRadius: 999,
			overflow: "hidden",
			...cssFunctions.mx(3),
			// backgroundColor: darkLightBgColor,
		},
		// "& .strong": {
		//     backgroundColor: googleColors.red500,
		// }, "& .medium": {
		//     backgroundColor: googleColors.yellow300,
		// }, "& .weak": {
		//     backgroundColor: googleColors.green500,
		// },
	},
	"& .beat_frame": {
		width: "100%",
		...cssPresets.flexCenter,
		paddingBottom: 20,
		"& .i1": {
			fontSize: 80,
			width: i.twoDigitNumber[0].toString().length === 1 ? 90 : 130,
			transition: "all ease  0.3s",
			color: !i.isMetronomePlaying ? googleColors.gray800 : googleColors.blue300,
			backgroundColor: googleColors.gray900,
			borderRadius: 18,
			marginRight: 20
		}, "& .i2": {
			fontSize: 80,
			width: 90,
			transition: "all ease  0.3s",
			backgroundColor: googleColors.gray900,
			borderRadius: 18,
			color: !i.isMetronomePlaying ? googleColors.gray800 : googleColors.green300
		}
	},
});

export default PlayBeatWindow;
