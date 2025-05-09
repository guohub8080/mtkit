/* eslint-disable no-mixed-spaces-and-tabs */
import TransformedNote from "@/apps/Spiano/components/TransformedNote.tsx";
import googleColors from "@/assets/colors/googleColors.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import NoteChordSymbol from "@/components/reNote/ChordText/NoteChordSymbol.tsx";
import * as music12 from "@/music12";
import byDefault from "@/utils/byDefault.ts";
import {css} from "@emotion/react";

const KeyStrokeFindChord1Result = (props: {
	chordInfo: any
	rootNotePitch: number
	hideTitle?: boolean
	fontSize?: number
	height?: number
}) => {
	const fontSize = byDefault(props.fontSize, 50)
	const isHideTitle = byDefault(props.hideTitle, false)
	const realRootNoteRadix = new music12.Radix.Base12Radix(props.rootNotePitch)
	const realRootNotesList = music12.note.getNoteByLocation(realRootNoteRadix.lastDigit)
	// const notesWithinOctaveList = props.notesList.map(x => new music12.Radix.Base12Radix(x).lastDigit)
	const rootNoteLocationOfGivenChord = props.chordInfo.rootNoteLocation
	const mayRootNotes = music12.note.getNoteByLocation(rootNoteLocationOfGivenChord)
	const scoreChord = new music12.chord.Chord(mayRootNotes[0], props.chordInfo.chordKey)
	const scoreChordDisplay = scoreChord.scoreSymbol
	const isRootMaintained = rootNoteLocationOfGivenChord === realRootNoteRadix.lastDigit
	const mayRootStepList = mayRootNotes.map(x => x.step)
	//如果根音的step并不在整个chord内，则无法转换（例如重升、重降）
	const isRightRootTransformed = mayRootStepList.length === 1 ? [false] : [false, false]
	const compareChordList = mayRootStepList.length === 1 ? [scoreChord] : [
		scoreChord,
		new music12.chord.Chord(mayRootNotes[1], props.chordInfo.chordKey)
	]


	for (let i in compareChordList) {
		if (realRootNotesList.length === 1) {
			isRightRootTransformed[i] = true
			continue
		}
		const comparechord1 = compareChordList[i].notesList.map(x => x.mathName)
		if (comparechord1.includes(realRootNotesList[0].mathName)) {
			isRightRootTransformed[i] = true
			continue;
		}
		if (comparechord1.includes(realRootNotesList[1].mathName)) {
			isRightRootTransformed[i] = true
		}
	}
	return <div css={KeyStroke3_css} style={{height: byDefault(props.height, "auto"), width: "fit-content"}}>
		<div className="fd" style={isHideTitle ? {display: "none"} : void 0}>和弦</div>
		<div style={{...cssPresets.flexCenter, width: "100%", flexWrap: "wrap"}}>
			{mayRootNotes.map((x, y) => {
				if (!isRightRootTransformed[y]) return void 0;
				const chordInstance = new music12.chord.Chord(x, props.chordInfo.chordKey)
				return <div style={{...cssPresets.flexCenter, maxHeight: 60, marginLeft: 16, marginRight: 16}} key={y}>
					<NoteChordSymbol
						chordSymbol={scoreChordDisplay} step={x.step}
						alter={x.alter}
						fontSize={fontSize} color={googleColors.blue800}/>
					{!isRootMaintained && isRightRootTransformed[y] && <TransformedNote
						fontSize={fontSize}
						chordNotesList={chordInstance.notesList}
						rootNoteLocation={realRootNoteRadix.lastDigit}/>}
				</div>
			})}
		</div>
	</div>
}

export default KeyStrokeFindChord1Result

const KeyStroke3_css = css({
	width: "100%",
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
