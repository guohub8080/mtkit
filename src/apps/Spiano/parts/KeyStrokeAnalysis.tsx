/* eslint-disable no-mixed-spaces-and-tabs */
import KeyStroke1 from "@/apps/Spiano/components/KeyStroke1.tsx";
import KeyStroke2 from "@/apps/Spiano/components/KeyStroke2.tsx";
import KeyStrokeComplexChord from "@/apps/Spiano/components/KeyStrokeComplexChord.tsx";
import KeyStrokeFindChord1Result from "@/apps/Spiano/components/KeyStrokeFindChord1Result.tsx";
import KeyStrokeFindChordMoreResult from "@/apps/Spiano/components/KeyStrokeFindChordMoreResult.tsx";
import googleColors from "@/assets/colors/googleColors.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import logo from "@/assets/svgs/logos/Production.svg"
import useMidiEvents from "@/utils/useMIDI/useMidiEvents.ts";
import {css} from "@emotion/react";
import * as music12 from "@/music12";
import {sortBy, uniq} from "lodash";
import {useEffect, useMemo} from "react";

const key0 = <div style={{fontSize: 50, color: googleColors.gray400, width: 100, height: 100}}>
	<img src={logo} alt="" style={{width: "100%", height: "100%", filter: "grayscale(1) contrast(0) opacity(0.15)"}}/>
</div>

const KeyStrokeAnalysis = () => {
	const {noteOnNumWithOctaveList, noteOnNumList, latestEvent} = useMidiEvents()
	const findChordComponents = useMemo(() => {
		if (noteOnNumList.length <= 2) return void 0
		const findList = sortBy(uniq(noteOnNumWithOctaveList.map(v => v[1])))
		const findResults = music12.chord.findChord(findList, true)
		if (findResults.length === 0) return <KeyStrokeComplexChord
			rootNotePitch={sortBy(noteOnNumList)[0]}
			pitchList={noteOnNumList}
			locationList={findList}/>
		if (findResults.length === 1) return <KeyStrokeFindChord1Result
			chordInfo={findResults[0]}
			rootNotePitch={sortBy(noteOnNumList)[0]}/>
		if (findResults.length > 1) {
			return <KeyStrokeFindChordMoreResult
				chordInfos={findResults}
				rootNotePitch={sortBy(noteOnNumList)[0]}/>
		}
	}, [noteOnNumList, latestEvent])
	return <>
		<div css={KeyStrokeAnalysis_css}>
			<div className="inner_frame">
				{/*没有任何输入时显示的是Logo*/}
				{noteOnNumWithOctaveList.length === 0 && key0}
				{/*有1个输入显示的是音符名称*/}
				{noteOnNumWithOctaveList.length === 1 && <KeyStroke1
					location={noteOnNumWithOctaveList[0][1]}
					octave={noteOnNumWithOctaveList[0][0]}/>}
				{/*有2个输入显示的是音程名称*/}
				{noteOnNumWithOctaveList.length === 2 && <KeyStroke2 notesList={noteOnNumList}/>}
				{/*有3个输入显示的是和弦*/}
				{noteOnNumWithOctaveList.length >= 3 && findChordComponents}
			</div>
		</div>
	</>
}

export default KeyStrokeAnalysis

const KeyStrokeAnalysis_css = css({
	width: "100%",
	...cssPresets.flexCenter,
	marginBottom: 15,
	"& .inner_frame": {
		width: "100%",
		maxWidth: 450,
		marginLeft: 15,
		marginRight: 15,
		height: 300,
		minHeight: 300,
		backgroundColor: "white",
		borderRadius: 9,
		boxShadow: "0px 0px 15px rgba(0,0,0,0.05)",
		...cssPresets.flexCenter
	}
})
