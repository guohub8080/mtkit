/* eslint-disable no-mixed-spaces-and-tabs */
import FindOnlyChordInComplex from "@/apps/FindNotesInChordOrScale/components/FindOnlyChordInComplex.tsx";
import NoWrapSection from "@/components/common/NoWrapSection.tsx";
import {css} from "@emotion/react";
import {useEffect, useRef, useState} from "react";
import useFindChord from "@/apps/FindNotesInChordOrScale/useFindChord.tsx";
import useFindChordConfig from "@/assets/stores/useFindChordConfig.ts";
import {isArray} from "lodash";
import NoteByLocation from "@/components/reNote/NoteByLocation/NoteByLocation.tsx";
import googleColors from "@/assets/colors/googleColors.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import collect from "collect.js";
import * as music12 from "@/music12";
import useChordConfig from "@/assets/stores/useChordConfig.ts";
import useGlobalSettings from "@/assets/stores/useGlobalSettings.ts";
import {useNavigate} from "react-router-dom";
import routerPath from "@/router/routerPath.ts";


const FindOnlyChord = () => {
	const {findResult} = useFindChord()

	const {setChordKey} = useChordConfig()
	const {setNotePickerStep, setNotePickerAlter} = useGlobalSettings()
	const navigate = useNavigate()
	const {setDetailChordKeyAndLocation, detailChordKeyAndLocation, isNoteStrictIn} = useFindChordConfig()
	return <div css={FindOnlyChord_css}>
		{/*普通的查询*/}
		{findResult.map((x, y) => <div
			onClick={() => setDetailChordKeyAndLocation([x.rootNoteLocation, x.chordKey])}
			onDoubleClick={() => {
				const rootNote = collect(music12.note.getNoteByLocation(x.rootNoteLocation)).random()
				setNotePickerStep(rootNote.step as any)
				setNotePickerAlter(rootNote.alter as any)
				setChordKey(x.chordKey)
				navigate(`/${routerPath.chordDisplay}`, {replace: true})
			}}
			css={isSelected_css(isArray(detailChordKeyAndLocation) &&
				detailChordKeyAndLocation[0] === x.rootNoteLocation && detailChordKeyAndLocation[1] === x.chordKey)}
			className="line" key={`${x.chordKey}_${x.rootNoteLocation}`}>
			<div className="order">{y + 1}</div>
			<div className="note_window">
				<div className="inner_f">
					<NoteByLocation color={googleColors.gray800} location={x.rootNoteLocation}/>
				</div>
			</div>
			<div className="cn_name">
				{x.cnName}和弦
			</div>
		</div>)}
	</div>
}

export default FindOnlyChord

const FindOnlyChord_css = css({
	width: "100%",
	"& .line:not(:first-of-type)": {
		borderTop: `1px solid ${googleColors.gray300}`
	},
	"& .line": {
		marginRight: "auto",
		marginLeft: "auto",
		width: "100%",
		maxWidth: 450,
		display: "flex",
		height: 40,
		"& .note_window": {
			width: "25%",
			...cssPresets.flexCenter,
			"& .inner_f": {
				...cssPresets.flexCenter,
				backgroundColor: googleColors.blue50,
				borderRadius: 999,
				height: 30,
				width: "80%"
			}
		},
		"& .order": {
			textAlign: "left",
			width: "12%",
			...cssPresets.flexCenter,
		},
		"& .cn_name": {
			// color: googleColors.blue800,
			width: "63%",
			...cssPresets.flexCenter
		}
	}
})

const isSelected_css = (i: boolean) => css({
	background: i ? googleColors.blue700 : "white",
	userSelect: "none",
	cursor: "pointer",
	"& .order": {
		color: i ? googleColors.blue50 : googleColors.blue800
	},
	"& .cn_name": {
		color: i ? googleColors.blue50 : googleColors.blue800
	}
	// "&>div:not(:first-of-type)": {
	//   borderLeft: `1px solid ${i ? googleColors.yellow100 : googleColors.gray300}`
	// }
})
