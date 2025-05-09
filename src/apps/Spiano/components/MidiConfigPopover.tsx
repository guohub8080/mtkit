/* eslint-disable no-mixed-spaces-and-tabs */
import googleColors from "@/assets/colors/googleColors.ts";
import useMIDIConfig from "@/assets/stores/useMIDIConfig.ts";
import cssFunctions from "@/assets/styles/cssFunctions.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import {css} from "@emotion/react";
import {Mask, Slider} from "antd-mobile";
import {useEffect, useState} from "react";

const marks = {
	2: 2,
	3: 3,
	4: 4,
	5: 5,
	6: 6,
	7: 7,
	8: 8,
}

const whiteKeyWidthMarks = {
	20: "窄",
	21: void 0,
	22: void 0,
	23: void 0,
	24: void 0,
	25: void 0,
	26: void 0,
	27: void 0,
	28: void 0,
	29: void 0,
	30: void 0,
	31: void 0,
	32: void 0,
	33: void 0,
	34: void 0,
	35: void 0,
	36: "中",
	37: void 0,
	38: void 0,
	39: void 0,
	40: void 0,
	41: void 0,
	42: void 0,
	43: void 0,
	44: void 0,
	45: void 0,
	46: void 0,
	47: void 0,
	48: void 0,
	49: void 0,
	50: void 0,
	51: "宽"
};

const eventLengthMarks = {
	5: 5,
	10: void 0,
	15: void 0,
	20: 20,
	25: void 0,
	30: void 0,
	35: 35,
	40: void 0,
	45: void 0,
	50: 50,
}
const MidiConfigPopover = (props: {}) => {
	const {
		isMidiConfigPopoverOpen,
		setIsMidiConfigPopoverOpen,
		pianoOctaveGapList,
		setPianoOctaveGapList,
		whiteKeyWidth,
		setWhiteKeyWidth,
		eventListLength,
		setEventListLength
	} = useMIDIConfig()

	const [tempList, setTempList] = useState([...pianoOctaveGapList])
	const [tempWhiteKeyWidth, setTempWhiteKeyWidth] = useState(whiteKeyWidth)
	useEffect(() => {
		setPianoOctaveGapList(tempList as any)
	}, [tempList]);
	return <>
		<div css={MidiConfigPopover_css}>
			<Mask visible={isMidiConfigPopoverOpen}
			      style={{
				      ...cssPresets.flexCenter, ...cssPresets.defaultBlur,
				      width: "calc(100vw)",
				      height: "100%",
				      pointerEvents: "auto",
			      }}
			      destroyOnClose={true}
			>
				<div className="inner_frame" onClick={() => setIsMidiConfigPopoverOpen(false)}>
					<div className="slider_frame" onClick={e => e.stopPropagation()}>
						<div style={{color: googleColors.blue800, marginBottom: 20}}>钢琴八度跨度</div>
						<Slider
							marks={marks}
							max={8}
							min={2}
							step={1}
							ticks={true}
							style={{"--fill-color": googleColors.blue800}}
							range={true}
							value={[...tempList] as any}
							onChange={(value) => setTempList(value as any)}
						/>
					</div>
					<div className="white_key_frame" onClick={e => e.stopPropagation()}>
						<div style={{color: googleColors.blue800, marginBottom: 20}}>琴键宽度</div>
						<Slider
							max={51}
							min={20}
							marks={whiteKeyWidthMarks}
							step={1}
							ticks={false}
							popover={true}
							value={whiteKeyWidth}
							onChange={(value) => {
								setWhiteKeyWidth(value as number)
							}}
							style={{"--fill-color": googleColors.blue800}}
							range={false}
						/>
					</div>
					<div className="event_frame" onClick={e => e.stopPropagation()}>
						<div style={{color: googleColors.blue800, marginBottom: 20}}>MIDI信号最大展示条数</div>
						<Slider
							max={50}
							min={5}
							marks={eventLengthMarks}
							step={1}
							popover={true}
							ticks={true}
							value={eventListLength}
							onChange={(value) => {
								setEventListLength(value as number)
							}}
							style={{"--fill-color": googleColors.blue800}}
							range={false}
						/>
					</div>
				</div>

			</Mask>
		</div>
	</>
}

export default MidiConfigPopover

const MidiConfigPopover_css = css({
	width: "calc(100vw)",
	"& .inner_frame": {
		width: "calc(100vw)",
		height: "calc(100vh)",
		overflow: "hidden",
		...cssPresets.flexCenter,
		flexDirection: "column",
		gap: 20,
		...cssFunctions.px(15),
	},
	"& .slider_frame": {
		width: "100%",
		backgroundColor: "white",
		...cssFunctions.px(30),
		...cssFunctions.py(25),
		paddingBottom: 40,
		maxWidth: 450,
		borderRadius: 8,
		...cssPresets.mxAuto,
		"& .adm-slider-mark-text": {
			fontSize: 16,
			width: 30,
			...cssPresets.flexCenter,
			height: 30,
			borderRadius: 999,
			backgroundColor: googleColors.gray300,
			color: googleColors.gray400
		},
		"& .adm-slider-mark-text-active": {
			color: googleColors.blue50,
			fontSize: 16,
			width: 30,
			...cssPresets.flexCenter,
			height: 30,
			borderRadius: 999,
			backgroundColor: googleColors.blue800
		}
	},
	"& .white_key_frame": {
		width: "100%",
		backgroundColor: "white",
		...cssFunctions.px(30),
		...cssFunctions.py(25),
		paddingBottom: 40,
		maxWidth: 450,
		borderRadius: 8,
		"& .adm-slider-mark-text": {
			color: googleColors.blue50,
			fontSize: 16,
			width: 30,
			...cssPresets.flexCenter,
			height: 30,
			borderRadius: 999,
			backgroundColor: googleColors.blue800
		}
	},
	"& .event_frame": {
		width: "100%",
		backgroundColor: "white",
		...cssFunctions.px(30),
		...cssFunctions.py(25),
		paddingBottom: 40,
		maxWidth: 450,
		borderRadius: 8,
		"& .adm-slider-mark-text": {
			color: googleColors.blue50,
			fontSize: 12,
			width: 30,
			...cssPresets.flexCenter,
			height: 30,
			borderRadius: 999,
			backgroundColor: googleColors.blue800
		}
	}
})
