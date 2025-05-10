/* eslint-disable no-mixed-spaces-and-tabs */
import googleColors from "@/assets/colors/googleColors.ts";
import useFindChordConfig from "@/assets/stores/useFindChordConfig.ts";
import cssFunctions from "@/assets/styles/cssFunctions.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import NoteByLocation from "@/components/reNote/NoteByLocation/NoteByLocation.tsx";
import getChordTransform from "@/utils/getChordTransform.ts";
import {css} from "@emotion/react";
import {isArray, isEmpty} from "lodash";
import {useMemo} from "react";

const FindOnlyChordInComplex = (props: {
	chords: any[]
}) => {
	if (isEmpty(props.chords)) return;
	if (isArray(props.chords) && props.chords.length === 0) return;
	const {pianoKeyList} = useFindChordConfig()
	const transformObj = useMemo(() => {
		return props.chords.map((item, index) => {
			return getChordTransform({
				rootNoteLocation: item.rootNoteLocation,
				n3L: item.n3L,
				n5L: item.n5L,
				n7L: item.n7L,
				n9L: item.n9L,
				n11L: item.n11L,
				n13L: item.n13L,
			}, item.chordKey, pianoKeyList, item.rootNoteLocation)
		}).filter(x => x.transformString.length > 0)
	}, [props])
	if (isEmpty(transformObj)) return;
	if (transformObj.length === 0) return;
	return <>
		<div css={FindOnlyChordInComplex_css}>
			{transformObj.map((item, index) => <div className="complex_item" key={index}>
				<div className="head" style={{fontSize: index <= 99 ? 16 : 12}}>
					{index + 1}
				</div>
				<div className="c">
					<div style={{
						backgroundColor: googleColors.blue50, ...cssFunctions.px(12), ...cssFunctions.py(3),
						borderRadius: 4
					}}>
						<NoteByLocation fontSize={18} color={googleColors.gray800} location={item.rootNoteLocationOfChord}/>
					</div>
					<div className="symbol">{item.scoreSymbol}</div>
					<div className="alter">({item.transformString})</div>
				</div>
			</div>)}
		</div>
	</>
}

export default FindOnlyChordInComplex

const FindOnlyChordInComplex_css = css({

	"& .complex_item": {
		borderTop: `1px solid ${googleColors.gray200}`,
		backgroundColor: "white",
		marginRight: "auto",
		marginLeft: "auto",
		width: "100%",
		maxWidth: 450,
		...cssPresets.flexCenter,
		...cssFunctions.py(10),
		justifyContent: "stretch",
		"& .head": {
			width: 30,
			backgroundColor: googleColors.orange300,
			height: 30,
			borderRadius: 999,
			...cssPresets.flexCenter,
			marginLeft: 10,
			color: googleColors.orange50,
			marginRight: 10,
			"& .count": {
				width: "30%",
				textAlign: "left",
				color: googleColors.blue600
			},
			"& .rn": {
				width: "70%",
				...cssPresets.flexCenter,
				...cssPresets.flexCenter,
				backgroundColor: googleColors.blue50,
				borderRadius: 999,
				height: 30,
			}
		},
		"& .c": {
			...cssPresets.flexCenter,
			"& .symbol": {
				color: googleColors.gray800,
				marginLeft: 2,
			},
			"& .alter": {
				marginLeft: 2,
				color: googleColors.blue600
			}
		}
	}
})
