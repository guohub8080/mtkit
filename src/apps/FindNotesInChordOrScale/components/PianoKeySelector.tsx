/* eslint-disable no-mixed-spaces-and-tabs */
import useMidiEvents from "@/utils/useMIDI/useMidiEvents.ts";
import useMIDIReady from "@/utils/useMIDI/useMIDIReady.ts";
import {css} from "@emotion/react";
import {useEffect, useMemo} from "react";
import OctavePiano from "@/components/rePiano/OctavePiano.tsx";
import googleColors from "@/assets/colors/googleColors.ts";
import {useWindowSize} from "react-use";
import {isEmpty, isNull, isNumber, isUndefined, min, range} from "lodash";
import useFindChord from "@/apps/FindNotesInChordOrScale/useFindChord.tsx";
import useFindChordConfig from "@/assets/stores/useFindChordConfig.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import {LiaExchangeAltSolid} from "react-icons/lia";
import {Radix} from "@/music12";

const grayButtonBg = googleColors.gray300
const PianoKeySelector = () => {
	const {
		pianoKeyList,
		setPianoKeyList,
		isNoteStrictIn,
		setIsNoteStrictIn,
		setDetailChordKeyAndLocation,
		isFindChordInScale,
		setIsFindChordInScale,
		setDetailModeKeyAndLocation
	} = useFindChordConfig()
	const {keyNoteList, scaleKeyNoteList} = useFindChord()
	const keyColorList = useMemo(() => {
		const res = Array.from({length: 12}, () => void 0)
		if (pianoKeyList.length === 0) return res
		pianoKeyList.forEach(x => {
			res[x] = googleColors.amber200
		})
		return res
	}, [pianoKeyList])

	const {width} = useWindowSize()
	const pianoConfig = useMemo(() => {
		return {
			keyBgColorList: keyColorList,
			whiteKeyWidth: min([60, width / 7]),
			blackKeyWidthRatio: 0.8,
			whiteKeyBorderWidth: 2.5,
			blackKeyBorderWidth: 2.5,
			blackKeyBorderRadius: range(5).map(() => [0, 0, 6, 6]),
			whiteKeyHeight: 150,
		}
	}, [keyColorList, width])

	const handleClick = (k: number) => {
		setDetailModeKeyAndLocation(void 0)
		setDetailChordKeyAndLocation(void 0)
		if (pianoKeyList.length === 0) {
			setPianoKeyList([k])
			return
		}
		if ((pianoKeyList as number[]).includes(k)) {
			const newList = pianoKeyList.filter(x => x !== k)
			setPianoKeyList(newList)
		} else {
			setPianoKeyList([...pianoKeyList, k])
		}
	}

	// 新增使用MIDI键盘控制查询音符功能
	const {isJzzEngineReady, isWebMidiSupport} = useMIDIReady()
	const {latestEvent} = useMidiEvents()
	useEffect(() => {
		if (!(isJzzEngineReady && isWebMidiSupport)) return;
		if (isUndefined(latestEvent) || isNull(latestEvent) || isEmpty(latestEvent)) return;
		if (latestEvent['isNoteOn'] && isNumber(latestEvent['note'])) {
			const l = new Radix.Base12Radix(latestEvent['note'])
			handleClick(l.lastDigit)
		}
	}, [latestEvent])
	return <>
		<div css={PianoKeySelector_css(isFindChordInScale)}>
			<OctavePiano
				config={pianoConfig}
				keyNodeList={isFindChordInScale ? scaleKeyNoteList : keyNoteList}
				onClick={handleClick}/>
			<div className="options">
				{!isFindChordInScale && <div css={isFindChordInScale_css(isFindChordInScale)} onClick={() => {
					if (isFindChordInScale) return;
					setIsNoteStrictIn(!isNoteStrictIn)
					setDetailChordKeyAndLocation(void 0)
					setDetailModeKeyAndLocation(void 0)
				}}>
					<LiaExchangeAltSolid color={isFindChordInScale ? grayButtonBg : googleColors.blue800} size={15}/>
					<div className="text" style={{marginLeft: 5}}>
						{isNoteStrictIn ? "相等" : "包含"}
					</div>
				</div>}
				<div className="reset_key" onClick={() => {
					setIsFindChordInScale(!isFindChordInScale)
					setDetailModeKeyAndLocation(void 0)
					setDetailChordKeyAndLocation(void 0)
				}}>
					<LiaExchangeAltSolid color={googleColors.blue800} size={15}/>
					<div style={{marginLeft: 5}}>
						{isFindChordInScale ? "在调式" : "在和弦"}
					</div>
				</div>
				<div className="reset_key" onClick={() => {
					setPianoKeyList([])
					setDetailModeKeyAndLocation(void 0)
					setDetailChordKeyAndLocation(void 0)
				}}>清空
				</div>
			</div>
		</div>
	</>
}

export default PianoKeySelector

const PianoKeySelector_css = (isFindChordInScale: boolean) => css({
	...cssPresets.transition,
	"& .options": {
		marginTop: 10,
		width: "100%",
		height: 50,
		gap: 10,
		...cssPresets.flexCenter,
	},
	"& .reset_key": {
		...cssPresets.transition,
		width: isFindChordInScale ? 150 : 100,
		height: 40,
		backgroundColor: "white",
		...cssPresets.flexCenter,
		borderRadius: 999,
		color: googleColors.blue800,
		...cssPresets.defaultHoverAndActive as any
	}
})
const isFindChordInScale_css = (isFindChordInScale: boolean) => css({
	width: 100,
	height: 40,
	...cssPresets.flexCenter,
	borderRadius: 999,
	backgroundColor: isFindChordInScale ? googleColors.gray400 : "white",
	"& .text": {
		color: isFindChordInScale ? grayButtonBg : googleColors.blue800,

	},
	...!isFindChordInScale ? cssPresets.defaultHoverAndActive as any : {}
})
