/* eslint-disable no-mixed-spaces-and-tabs */
import KeyStrokeFindChord1Result from "@/apps/Spiano/components/KeyStrokeFindChord1Result.tsx";
import googleColors from "@/assets/colors/googleColors.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import * as music12 from "@/music12";
import {css} from "@emotion/react";

const KeyStrokeFindChordMoreResult = (props: {
	chordInfos: any[]
	rootNotePitch: number
}) => {
	const realRootNoteRadix = new music12.Radix.Base12Radix(props.rootNotePitch)
	//含有根音，只可能有一个和弦
	const includeRootChordList = props.chordInfos.filter(x => x.rootNoteLocation === realRootNoteRadix.lastDigit)

	//不含根音，可能有多个和弦
	const notIncludeRootChordList = props.chordInfos.filter(x => x.rootNoteLocation !== realRootNoteRadix.lastDigit)

	const sideFontSize = includeRootChordList.length === 0 ? 40 : 30
	return <div css={KeyStrokeMore_css}>
		<div className="fd">和弦</div>
		{includeRootChordList.length > 0 &&
			<div className="chord_ir">
				{includeRootChordList.map((x, y) => {
					return <KeyStrokeFindChord1Result  key={y} hideTitle={true} chordInfo={x}
					                                  rootNotePitch={props.rootNotePitch}/>
				})}
			</div>}
		{notIncludeRootChordList.length > 0 && <div className="chord_nir">
			{notIncludeRootChordList.map((x, y) => {
				return <KeyStrokeFindChord1Result fontSize={sideFontSize} key={y} hideTitle={true}
				                                  chordInfo={x}
				                                  rootNotePitch={props.rootNotePitch}/>
			})}
		</div>}

	</div>

}

export default KeyStrokeFindChordMoreResult

const KeyStrokeMore_css = css({
	width: "100%",
	"&>.fd": {
		fontSize: 25,
		color: googleColors.blue300,
		marginBottom: 2,
	},
	"& .chord_ir": {
		...cssPresets.flexCenter,
		flexWrap: "wrap",
	},
	"& .chord_nir": {
		...cssPresets.flexCenter,
		flexWrap: "wrap",
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
