/* eslint-disable no-mixed-spaces-and-tabs */
import googleColors from "@/assets/colors/googleColors.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import NoWrapSection from "@/components/common/NoWrapSection.tsx";
import {css} from "@emotion/react";
import {CgKeyboard} from "react-icons/cg";
import {FaQuestion} from "react-icons/fa";
import {FaKeyboard} from "react-icons/fa6";

const PcKeyboardNotShow = () => {
	return <>
		<div css={PcKeyboardNotShow_css}>
			<div className="icon_frame">
				<FaQuestion size={40} color={googleColors.gray400}/>
				<FaKeyboard size={60} color={googleColors.gray500}/>
			</div>
			<div className="tip">
				<NoWrapSection t={"屏幕太小了，"}/>
				<NoWrapSection t={"无法显示键盘。"}/>
				<NoWrapSection t={"这个功能"}/>
				<NoWrapSection t={"独属于大屏设备。"}/>
				<NoWrapSection t={"推荐使用电脑使用。"}/>
			</div>
		</div>
	</>
}

export default PcKeyboardNotShow

const PcKeyboardNotShow_css = css({
	"& .icon_frame": {
		height: 180,
		...cssPresets.flexCenter,
		flexDirection: "column",
	},
	"& .tip": {
		color: googleColors.gray500,
		width: 240,
		...cssPresets.mxAuto
	}
})
