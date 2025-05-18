/* eslint-disable no-mixed-spaces-and-tabs */
import googleColors from "@/assets/colors/googleColors.ts";
import useMIDIConfig from "@/assets/stores/useMIDIConfig.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import OctavePiano from "@/components/rePiano/OctavePiano.tsx";
import dt from "@/utils/guoDT.ts";
import useMidiEvents from "@/utils/useMIDI/useMidiEvents.ts";
import {css} from "@emotion/react";
import {random, range} from "lodash";
import {useMemo} from "react";


const colorList = [
	{backgroundColor: googleColors.yellow200, color: googleColors.yellow900},
	{backgroundColor: googleColors.green200, color: googleColors.green900},
	{backgroundColor: googleColors.orange200, color: googleColors.orange900},
	{backgroundColor: googleColors.blue200, color: googleColors.blue900},
	{backgroundColor: googleColors.deepOrange200, color: googleColors.red800},
	{backgroundColor: googleColors.indigo200, color: googleColors.indigo700},
	{backgroundColor: googleColors.pink200, color: googleColors.pink700},
]


const MidiPiano = () => {
	const {noteOnNumList, noteOnNumWithOctaveList, setLatestEvent, setNoteOnNumList} = useMidiEvents()
	const {pianoOctaveGapList, whiteKeyWidth} = useMIDIConfig()
	const pianoConfig = {
		blackKeyBorderWidth: 2,
		blackKeyHeightRatio: 0.6,
		whiteKeyBorderRadius: Array.from({length: 7}, () => [0, 0, 5, 5])
	}

	//计算钢琴的总宽度
	const pianoWidth = useMemo(() => {
		const octavesCount = pianoOctaveGapList[1] - pianoOctaveGapList[0] + 1;
		return whiteKeyWidth * 7 * octavesCount;
	}, [pianoOctaveGapList, whiteKeyWidth])

	const keyColorList = useMemo(() => {
		const octavesCount = pianoOctaveGapList[1] - pianoOctaveGapList[0] + 1;

		// 创建 octavesCount 个、每个长度为 12、元素为 undefined 的数组
		const octaveArrays = Array.from({length: octavesCount}, () => Array.from({length: 12}, () => void 0));
		if (noteOnNumWithOctaveList.length === 0) return octaveArrays
		try {
			noteOnNumWithOctaveList.map((item, index) => {
				const shiftColorIndex = item[0] - pianoOctaveGapList[0]
				octaveArrays[shiftColorIndex][item[1]] = googleColors.amber200
			})
			return octaveArrays
		} catch (e) {
			if (e instanceof TypeError && !/Cannot set properties of undefined/.test(e.message)) {
				console.error("Unexpected error in keyColorList", e);
			}
		}
		return octaveArrays
	}, [noteOnNumWithOctaveList, pianoOctaveGapList])
	const clickPiano = (octave: number, location: number) => {
		const pitchValue = octave * 12 + location
		setLatestEvent({
			name: "乐理计算器", note: pitchValue, isNoteOn: !noteOnNumList.includes(pitchValue),
			isNoteOff: noteOnNumList.includes(pitchValue),
			velocity: random(10, 126),
			time: dt.getDayjs()
		})
	}

	return <>
		<div css={MidiPiano_css({whiteKeyWidth: whiteKeyWidth, totalW: pianoWidth})}>
			<div className="wrapper">
				<div className="inner_frame">
					{range(pianoOctaveGapList[1] - pianoOctaveGapList[0] + 1).map((i, y) => <div className="each_octave" key={i}>
						<OctavePiano
							isPureDisplay={false}
							onClick={e => clickPiano(i + pianoOctaveGapList[0], e)}
							// keyNodeList={range(12).map(x => <div style={{color: googleColors.red400}}>{x}</div>)}
							ml={y === 0 ? 0 : -2}
							config={{...pianoConfig, whiteKeyWidth, keyBgColorList: keyColorList[i]}}/>
						<div style={{
							backgroundColor: colorList[i].backgroundColor,
							color: colorList[i].color,
							height: 28,
							...cssPresets.flexCenter,
						}}>{i + pianoOctaveGapList[0]}</div>
					</div>)}
				</div>
			</div>
		</div>
	</>
}

export default MidiPiano

const MidiPiano_css = (i: {
	whiteKeyWidth: number,
	totalW: number
}) => css({
	width: "calc(100vw)",
	maxWidth: "calc(100vw)",
	minWidth: "calc(100vw)",
	display: "block",
	overflowX: "auto",
	overflowY: "hidden",
	marginBottom: 10,
	minHeight: 160,
	"&>.wrapper": {
		display: "flex",
		justifyContent: "center",
		minWidth: i.totalW,
		...cssPresets.mxAuto,
		width: i.totalW,
		maxWidth: i.totalW,
		paddingBottom: 10,
		"&>.inner_frame": {
			// width: wkw,
			// minWidth: wkw,
			...cssPresets.flexCenter,
			"&>.each_octave": {},
		},
	},

})
