/* eslint-disable no-mixed-spaces-and-tabs */
import FindOnlyChordInComplex from "@/apps/FindNotesInChordOrScale/components/FindOnlyChordInComplex.tsx";
import {css} from "@emotion/react";
import useFindChord from "@/apps/FindNotesInChordOrScale/useFindChord.tsx";
import cssPresets from "@/assets/styles/cssPresets.ts";
import * as music12 from "@/music12"
import googleColors from "@/assets/colors/googleColors.ts";
import useFindChordConfig from "@/assets/stores/useFindChordConfig.ts";
import NoResult from "@/apps/FindNotesInChordOrScale/components/NoResult.tsx";
import FindOnlyChord from "@/apps/FindNotesInChordOrScale/components/FindOnlyChord.tsx";
import FindChordInScale from "@/apps/FindNotesInChordOrScale/components/FindChordInScale.tsx";


const FindResult = () => {
	//常规查找，为了避免狮山代码产生，原本部分不予改动。
	const {findResult, findInScaleResult} = useFindChord()
	const {isFindChordInScale, pianoKeyList, isNoteStrictIn} = useFindChordConfig()
	// 在音阶中查找音符
	if (isFindChordInScale) {
		if (findInScaleResult.length === 0) return <NoResult/>
		return <FindChordInScale/>
	}

	//因为「超级钢琴」模块的写作，新增了超级查找，所以这里要判断一下。
	let findComplexChord = []
	try {
		findComplexChord = music12.find.findComplexChordByMidi(pianoKeyList)
	} catch (e) {
		if (import.meta.env.DEV) {
			console.log(e)
		}
	}
	if (findResult.length + findComplexChord.length === 0) return <NoResult/>
	return <div style={{paddingBottom: 50}}>
		<FindOnlyChord/>
		{isNoteStrictIn && <FindOnlyChordInComplex chords={findComplexChord}/>}
	</div>
}

export default FindResult


