/* eslint-disable no-mixed-spaces-and-tabs */
import BeatsDetectPad from "@/apps/Beats/parts/BeatsDetectPad.tsx";
import googleColors from "@/assets/colors/googleColors.ts";
import useBeatFunctionsConfig from "@/assets/stores/useBeatFunctionsConfig.ts";
import cssFunctions from "@/assets/styles/cssFunctions.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import {css} from "@emotion/react";
import {Mask, Slider} from "antd-mobile";
import {random} from "lodash";
import {useEffect, useState} from "react";

const DetectBpmPopover = () => {
	const {
		isSetBpmMaskOpen,
		setIsSetBpmMaskOpen,
		bpm,
		setBpm,
		isDetectBpmMaskOpen,
		setIsDetectBpmMaskOpen
	} = useBeatFunctionsConfig()


	return <>
		<div css={SetBpmPopover_css}>
			<Mask visible={isDetectBpmMaskOpen}
			      style={{...cssPresets.flexCenter, ...cssPresets.defaultBlur}}
			      destroyOnClose={true}
			      onMaskClick={() => setIsDetectBpmMaskOpen(false)}>
				<div className="ii">
					<BeatsDetectPad/>
				</div>
			</Mask>
		</div>
	</>
}

export default DetectBpmPopover

const SetBpmPopover_css = css({
	...cssPresets.flexCenter,
	flexDirection: "column",
	"& .ii": {
		width: "calc(80vw)",
		maxWidth: 450,
		height:300
	}

})
