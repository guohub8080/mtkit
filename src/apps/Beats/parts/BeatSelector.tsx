/* eslint-disable no-mixed-spaces-and-tabs */
import Beat2_4_Svg from "@/apps/Beats/components/beatIcon/Beat2_4_Svg.tsx";
import Beat3_4_Svg from "@/apps/Beats/components/beatIcon/Beat3_4_Svg.tsx";
import Beat4_4_Svg from "@/apps/Beats/components/beatIcon/Beat4_4_Svg.tsx";
import Beat6_8_Svg from "@/apps/Beats/components/beatIcon/Beat6_8_Svg.tsx";
import googleColors from "@/assets/colors/googleColors.ts";
import useMetronome from "@/assets/instruments/metronome/useMetronome.ts";
import useBeatFunctionsConfig from "@/assets/stores/useBeatFunctionsConfig.ts";
import cssFunctions from "@/assets/styles/cssFunctions.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import {css} from "@emotion/react";
import {useEffect} from "react";

const selectedMainColor = googleColors.blue800
const selectedBgColor = googleColors.blue50
const unSelectedMainColor = googleColors.gray400
const unSelectedBgColor = googleColors.gray50
const BeatSelector = () => {
	const {beatType, setBeatType} = useBeatFunctionsConfig()
	const {stopPlayback} = useMetronome()
	useEffect(() => {
		if (!["2/4", "3/4", "4/4", "6/8"].includes(beatType)) {
			setBeatType("4/4")
		}
	}, [beatType])

	return <>
		<div css={BeatSelector_css}>
			<div className="beat_frame" css={cell(beatType === "2/4")} onClick={async () => {
				await stopPlayback()
				setBeatType("2/4")
			}}>
				<Beat2_4_Svg color={beatType === "2/4" ? selectedMainColor : unSelectedMainColor}/>
			</div>
			<div className="beat_frame" css={cell(beatType === "3/4")} onClick={async () => {
				await stopPlayback()
				setBeatType("3/4")
			}}>
				<Beat3_4_Svg color={beatType === "3/4" ? selectedMainColor : unSelectedMainColor}/>
			</div>
			<div className="beat_frame" css={cell(beatType === "4/4")} onClick={async () => {
				await stopPlayback()
				setBeatType("4/4")
			}}>
				<Beat4_4_Svg color={beatType === "4/4" ? selectedMainColor : unSelectedMainColor}/>
			</div>
			<div className="beat_frame" css={cell(beatType === "6/8")} onClick={async () => {
				await stopPlayback()
				setBeatType("6/8")
			}}>
				<Beat6_8_Svg color={beatType === "6/8" ? selectedMainColor : unSelectedMainColor}/>
			</div>

		</div>
	</>
}

export default BeatSelector

const BeatSelector_css = css({
	...cssPresets.flexCenter,
	...cssPresets.mxAuto,
	borderRadius: 8,
	overflow: "hidden",
	width: 80 * 4,
	"& .beat_frame": {
		...cssPresets.flexCenter,
		width: 80,
		height: 85,
		cursor: "pointer",
	},

	"& .beat_frame:not(:first-of-type)": {
		borderLeft: `1px solid ${googleColors.gray200}`,
	}
})

const cell = (isSelected: boolean) => css({
	transition: "all ease 0.1s",
	backgroundColor: isSelected ? selectedBgColor : unSelectedBgColor,
	...cssFunctions.py(isSelected ? 13 : 15),
})
