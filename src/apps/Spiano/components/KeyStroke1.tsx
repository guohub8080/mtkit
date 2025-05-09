/* eslint-disable no-mixed-spaces-and-tabs */
import googleColors from "@/assets/colors/googleColors.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import NoteText from "@/components/reNote/NoteText/NoteText.tsx";
import * as music12 from "@/music12";
import useMidiEvents from "@/utils/useMIDI/useMidiEvents.ts";
import {css} from "@emotion/react";
import {isNumber, isString} from "lodash";

const KeyStroke1 = (props: {
	location: number,
	octave: number | string
}) => {
	const notesList = music12.note.getNoteByLocation(props.location)
	// console.log(notesList)
	return <div css={KeyStroke1_css}>
		<div className="fd">音符</div>
		<div className="note_wrapper">
			<NoteText step={notesList[0].step} alter={notesList[0].alter} fontSize={60} color={googleColors.blue800}/>
			{notesList.length > 1 && <>
				<div className="slash">|</div>
				<div>
					<NoteText step={notesList[1].step} alter={notesList[1].alter} fontSize={60} color={googleColors.blue800}/>
				</div>
			</>}
		</div>
		<div className="od">
			{isNumber(props.octave) && `位于第${props.octave}个八度`}
			{isString(props.octave) && `位于${props.octave}八度`}
		</div>
	</div>
}

export default KeyStroke1

const KeyStroke1_css = css({
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
		fontSize: 18,
		color: googleColors.gray600,
		marginTop: 10,
	},
})
