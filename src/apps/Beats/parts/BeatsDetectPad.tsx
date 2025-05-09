/* eslint-disable no-mixed-spaces-and-tabs */
import googleColors from "@/assets/colors/googleColors.ts";
import useBeatFunctionsConfig from "@/assets/stores/useBeatFunctionsConfig.ts";
import cssFunctions from "@/assets/styles/cssFunctions.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import guoDT from "@/utils/guoDT.ts";
import useMidiEvents from "@/utils/useMIDI/useMidiEvents.ts";
import {css} from "@emotion/react";
import {ProgressBar} from "antd-mobile";
import {isEmpty} from "lodash";
import {useEffect, useMemo, useState} from "react";
import {useHotkeys} from "react-hotkeys-hook";

const BeatsDetectPad = () => {

	const [isDetecting, setIsDetecting] = useState(false)
	const [detectPercent, setDetectPercent] = useState(0)
	const [isDetectFinished, setIsDetectFinished] = useState(false)
	const genEvent = () => {
		if (!isDetecting) {
			setIsDetecting(true)
		}
		setLatestEvent({
			name: "a",
			note: 60,
			velocity: 127,
			isNoteOn: true,
			isNoteOff: false,
			time: guoDT.getDayjs()
		})
	}
	const {isDetectBpmMaskOpen, setIsDetectBpmMaskOpen, setBpm} = useBeatFunctionsConfig()
	const {latestEvent, setLatestEvent} = useMidiEvents()
	const [isTouched, setIsTouched] = useState(false)
	const [timeLine, setTimeLine] = useState([])
	useEffect(() => {
		if (!isDetecting) return setTimeLine([]);
		if (isEmpty(latestEvent)) return;
		if (detectPercent < 100) {
			setDetectPercent(pre => pre + 100 / 25)
			setTimeLine([...timeLine, latestEvent.time])
		}
	}, [latestEvent]);


	const detectedBpm = useMemo(() => {
		if (detectPercent < 100) return;
		const timeGapList = []
		for (let i = 1; i < timeLine.length; i++) {
			const interval = timeLine[i] - timeLine[i - 1];
			timeGapList.push(interval)
		}
		const sortedList = [...timeGapList].sort((a, b) => a - b)
		const slicedList = sortedList.slice(2, sortedList.length - 2);
		const avarage = slicedList.reduce((a, b) => a + b, 0) / slicedList.length;
		setIsDetectFinished(true)
		return Math.round((60000 / avarage) * 10) / 10;
	}, [detectPercent])

	//绑定键盘事件
	useHotkeys("space", e => {
		if (e.repeat) return;
		if (e.type === "keydown") {
			genEvent()
		}
	}, {
		keyup: false,
		keydown: true,
	})
	useEffect(() => {
		if (isEmpty(latestEvent)) return;
		if (latestEvent.isNoteOff) return;
		setIsTouched(true)
		setTimeout(() => {
			setIsTouched(false)
		}, 100)
	}, [latestEvent])

	return <>
		<div css={BeatsDetectPad_css({isTouched})} onClick={genEvent}>
			{!isDetectFinished && <div className={`board`}>
				<div className="tip">
					{!isDetecting ? "连续敲击以开始检测BPM" : "请持续敲击..."}
					<div>{detectedBpm}</div>
				</div>
				<div className="prograss">
					<ProgressBar
						rounded={false} style={{
						'--track-width': '18px',
						'--fill-color': googleColors.blue500
					}} percent={detectPercent}/>
				</div>
			</div>}
			{isDetectFinished && <div className="finished_board">
				<div className="title">检测到BPM接近于</div>
				<div className="bpm">{detectedBpm}</div>
				<div className="apply" onClick={() => {
					setBpm(detectedBpm)
					setIsDetectBpmMaskOpen(false)
				}}>以此为BPM
				</div>
				<div className="cancel" onClick={() => setIsDetectBpmMaskOpen(false)}>无事发生</div>
			</div>}

		</div>
	</>
}

export default BeatsDetectPad

const BeatsDetectPad_css = (info: { isTouched: boolean }) => css({
	width: "100%",
	// overflow: "hidden",
	"& .board": {
		borderRadius: 18,
		overflow: "hidden",
		height: 200,
		transition: "all 0.1s ease",
		...cssPresets.flexCenter,
		flexDirection: "column",
		cursor: "pointer",
		filter: `drop-shadow(0px 0px ${info.isTouched ? 10 : 5}px rgba(0, 0, 0, ${info.isTouched ? 0.1 : 0.06}))`,
		backgroundColor: info.isTouched ? googleColors.gray100 : "white",
		transform: info.isTouched ? "scale(0.99)" : "scale(1)",
		"& .tip": {
			color: googleColors.gray600,
			height: "100%",
			...cssPresets.flexCenter,
		}
	},
	"& .prograss": {
		width: "100%",
		height: 10,
		bottom: 0,
	},
	"& .finished_board": {
		backgroundColor: "white",
		borderRadius: 18,
		...cssFunctions.py(40),

		"& .title": {
			color: googleColors.gray500,
		},
		"& .bpm": {
			color: googleColors.blue800,
			fontSize: 56,
		},
		"& .apply,.cancel": {
			backgroundColor: googleColors.blue50,
			fontSize: 18,
			color: googleColors.blue800,
			border: `1px solid ${googleColors.blue800}`,
			width: 240,
			...cssPresets.mxAuto,
			borderRadius: 999,
			...cssFunctions.py(15),
			...cssFunctions.px(40),
			...cssPresets.transition,
			marginTop: 20,
			cursor: "pointer",
			"&:active": {
				backgroundColor: googleColors.blue100,
			}
		},
	}
	// "& .clicked": {
	// 	backgroundColor: "red"
	// }
})
