/* eslint-disable no-mixed-spaces-and-tabs */
import KeyStroke1 from "@/apps/Spiano/components/KeyStroke1.tsx";
import KeyStroke2 from "@/apps/Spiano/components/KeyStroke2.tsx";
import googleColors from "@/assets/colors/googleColors.ts";
import cssFunctions from "@/assets/styles/cssFunctions.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import NoteText from "@/components/reNote/NoteText/NoteText.tsx";
import * as music12 from "@/music12";
import getBareChordTransformString from "@/utils/getBareChordTransformString.ts";
import getChordTransform from "@/utils/getChordTransform.ts";
import {css} from "@emotion/react";
import collect from "collect.js";
import {useMemo} from "react";

const KeyStrokeComplexChord = (props: {
	locationList: number[]
	rootNotePitch: number
	pitchList: number[]
}) => {
	//如果实际上就是一个音，则显示为音符名称
	if (props.locationList.length === 1) return <KeyStroke1 location={props.locationList[0]} octave={"多个"}/>
	//如果实际上就是一个音，则显示为音程
	if (props.locationList.length === 2) {
		return <KeyStroke2 notesList={props.locationList}/>
	}
	const absoluteRootNoteLocation = new music12.Radix.Base12Radix(props.rootNotePitch).lastDigit

	//取前两个相似度的和弦，并尽量保证根音和第一个和弦的根
	const showChordsInfo = useMemo(() => {
		const findChordsInfo = music12.find.findComplexChordByMidi(props.pitchList)
		if (findChordsInfo.length === 0) return []
		if (findChordsInfo.length <= 2) return findChordsInfo
		const result = [findChordsInfo[0]]
		if (findChordsInfo[0]['rootNoteLocation'] === absoluteRootNoteLocation) {
			result.push(findChordsInfo[1])
			return result
		}
		const nextChord = collect(result.slice(1)).where("rootNoteLocation", absoluteRootNoteLocation).first()
		if (nextChord) {
			result.push(nextChord)
			return result
		}
		result.push(findChordsInfo[1])
		return result
	}, [props])

	const absoluteRootNotes = music12.note.getNoteByLocation(new music12.Radix.Base12Radix(props.rootNotePitch).lastDigit)
	//如果为0，那么则强制分析
	if (showChordsInfo.length === 0) {
		const analyseString = getBareChordTransformString(props.locationList, absoluteRootNoteLocation)
		return <div css={KeyStroke2_css}>
			<div className="fd">复杂和弦</div>
			<div>{
				absoluteRootNotes.map((item, index) => {
					return <div key={index} style={{...cssPresets.flexCenter, height: 50}}>
						<NoteText step={item.step} alter={item.alter} color={googleColors.blue800} fontSize={40}/>
						{analyseString[0].length > 1 && <div
							style={{fontSize: 40, color: googleColors.blue800}}>
							{analyseString[0]}
						</div>}
						<div style={{fontSize: 28, color: googleColors.blue500}}>
							({analyseString[1]})
						</div>
					</div>
				})
			}</div>
		</div>
	}

	//现在是一个元素或两个元素的列表
	const transformObj = showChordsInfo.map((item, index) => {
		return getChordTransform({
			rootNoteLocation: item.rootNoteLocation,
			n3L: item.n3L,
			n5L: item.n5L,
			n7L: item.n7L,
			n9L: item.n9L,
			n11L: item.n11L,
			n13L: item.n13L,
		}, item.chordKey, props.locationList, absoluteRootNoteLocation)
	})

	const getChordNodes = (chordRootNoteLocation: number, givenTransformObj: object, pressedKeyNoteLocation: number[]) => {
		const chordRootNotes = music12.note.getNoteByLocation(chordRootNoteLocation)
		const getTonicReplacedNote = () => {
			if (absoluteRootNotes.length === 1) {
				return <div style={{...cssPresets.flexCenter}}>
					<div style={{fontSize: 35, color: googleColors.blue800}}>/</div>
					<NoteText step={absoluteRootNotes[0].step} alter={absoluteRootNotes[0].alter} color={googleColors.blue800}
					          fontSize={30}/>
				</div>
			}
			if (pressedKeyNoteLocation.includes(absoluteRootNotes[1].locationId)) {
				return <div style={{...cssPresets.flexCenter}}>
					<div style={{fontSize: 35, color: googleColors.blue800}}>/</div>
					<div style={{
						...cssPresets.flexCenter, ...cssFunctions.px(3),
						backgroundColor: googleColors.blue50, ...cssFunctions.py(3),
						borderRadius: 8
					}}>
						<div style={{...cssFunctions.px(3)}}>
							<NoteText step={absoluteRootNotes[0].step}
							          alter={absoluteRootNotes[0].alter}
							          color={googleColors.blue800}
							          fontSize={25}/></div>
						<div style={{color: googleColors.blue400}}>/</div>
						<div style={{...cssFunctions.px(3)}}>
							<NoteText step={absoluteRootNotes[1].step}
							          alter={absoluteRootNotes[1].alter}
							          color={googleColors.blue800}
							          fontSize={25}/></div>
					</div>


				</div>
			}
		}
		return chordRootNotes.map((item, index) => <div
			key={index}
			style={{...cssPresets.flexCenter, marginLeft: 20, marginRight: 20, height: 50}}>
			<div>
				<NoteText step={item.step} alter={item.alter} color={googleColors.blue800} fontSize={35}/>
			</div>
			<div
				style={{fontSize: 25, color: googleColors.blue800, marginRight: 5}}>{givenTransformObj['scoreSymbol']}</div>
			<div style={{fontSize: 20, color: googleColors.blue500}}>({givenTransformObj['transformString']})</div>
			{givenTransformObj['isRootNoteTransformed'] && <div>{getTonicReplacedNote()}</div>}
		</div>)

	}

	return <div css={KeyStroke2_css}>
		<div className="fd">变化和弦</div>
		{showChordsInfo.map((item, index) => <div key={index}>
			{getChordNodes(transformObj[index].rootNoteLocationOfChord, transformObj[index], props.locationList)}
		</div>)
		}

	</div>
}

export default KeyStrokeComplexChord

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
