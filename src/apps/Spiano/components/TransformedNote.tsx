/* eslint-disable no-mixed-spaces-and-tabs */
import googleColors from "@/assets/colors/googleColors.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import NoteText from "@/components/reNote/NoteText/NoteText.tsx";
import * as music12 from "@/music12";
import {isUndefined} from "lodash";

const TransformedNote = (props: {
	rootNoteLocation: number
	chordNotesList: music12.note.Note[]
	fontSize: number
}) => {
	const notes = music12.note.getNoteByLocation(props.rootNoteLocation)
	if (notes.length === 1) {
		return <div style={{...cssPresets.flexCenter}}>
			<div style={{color: googleColors.blue800, fontSize: props.fontSize}}>/</div>
			<div style={{color: googleColors.blue800, fontSize: props.fontSize}}>
				<NoteText step={notes[0].step} alter={notes[0].alter} fontSize={props.fontSize} color={googleColors.blue800}/>
			</div>
		</div>
	}
	let readyRootNote: music12.note.Note | undefined = undefined
	for (let i of notes) {
		for (let j of props.chordNotesList) {
			if (i.step === j.step && i.alter === j.alter) {
				readyRootNote = i
				break
			}
		}
	}
	if (!isUndefined(readyRootNote)) {
		return <div style={{...cssPresets.flexCenter}}>
			<div style={{color: googleColors.blue800, fontSize: props.fontSize}}>/</div>
			<div style={{color: googleColors.blue800, fontSize: props.fontSize}}>
				<NoteText step={readyRootNote.step} alter={readyRootNote.alter} fontSize={props.fontSize}
				          color={googleColors.blue800}/>
			</div>
		</div>
	}
	return <div style={{...cssPresets.flexCenter}}>
		<div style={{color: googleColors.blue800, fontSize: props.fontSize}}>/</div>
		<div style={{color: googleColors.blue300, fontSize: props.fontSize * 0.85}}>
			?
		</div>
	</div>
}


export default TransformedNote

