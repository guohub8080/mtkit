/* eslint-disable no-mixed-spaces-and-tabs */
import googleColors from "@/assets/colors/googleColors.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import NoteText from "@/components/reNote/NoteText/NoteText.tsx";
import * as music12 from "@/music12";
import {numberToChinese} from "chinese-numbering"
import useMidiEvents from "@/utils/useMIDI/useMidiEvents.ts";
import {css} from "@emotion/react";
import {useMemo, useState} from "react";

const KeyStroke2 = (props: {
	notesList: number[]
}) => {
	const [sg, setSg] = useState(0)
	const itvList = useMemo(() => {
		const tsg = Math.abs(props.notesList[0] - props.notesList[1])
		const findIntervals = music12.interval.getIntervalBySemitoneGap(tsg)
		if (findIntervals.length === 0) {
			setSg(0)
			return []
		}
		return findIntervals.map(x => {
			setSg(tsg)
			if (x.num <= 8) return {num: x.num, des: x.simpleDescription}
			return {
				cnPrefix: x.cnPrefix,
				num: x.num,
				des: x.simpleDescription,
				numWithinOctave: x.numWithinOctave,
				semitoneGapWithinOctave: x.semitoneGapWithinOctave
			}
		})
	}, [props])
	return <div css={KeyStroke2_css}>
		<div className="fd">音程</div>
		{itvList.length === 0 && <div className="od">无法识别</div>}
		{sg !== 0 && <div className={"sg"}>音符相差{sg}个半音</div>}
		{itvList.map((item, index) => {
			return <div className="itv_frame" key={index}>
				<div className={"des"}>
					{item.des}
				</div>
				{item.num > 8 && <div style={{marginTop: 2}}>
					<span>对应八度内音程是</span>
					<span style={{color: googleColors.blue500}}>
						{item.cnPrefix}
						{numberToChinese(item.numWithinOctave, {chineseType: "simplified"})}
						度
					</span>
				</div>}
			</div>
		})}
	</div>
}

export default KeyStroke2

const KeyStroke2_css = css({
	"&>.note_wrapper": {
		...cssPresets.flexCenter,
		height: 85,
		"&>.slash": {
			fontSize: 60,
			color: googleColors.gray100,
			marginLeft: 10,
			marginRight: 10,
		}
	},
	"&>.fd": {
		fontSize: 25,
		color: googleColors.blue300,
		marginBottom: 2,
	},
	"&>.od": {
		fontSize: 28,
		color: googleColors.gray400,
		marginTop: 10,
	},
	"& .sg": {
		marginTop: 5
	},
	"& .itv_frame": {
		"&>.des": {
			fontSize: 45,
			color: googleColors.blue800,
		}
	}
})
