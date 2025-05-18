/* eslint-disable no-mixed-spaces-and-tabs */
import usePcKeyStroke from "@/apps/PcKeyboardPlay/usePcKeyStroke.ts";
import googleColors from "@/assets/colors/googleColors.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import byDefault from "@/utils/byDefault.ts";
import {css} from "@emotion/react";
import {isEmpty} from "lodash";

const OneKey = (props: {
	w?: number
	h?: number
	bgColor?: string
	children?: React.ReactNode
	k?: string
}) => {
	const bgColor = byDefault(props.bgColor, googleColors.gray400)
	const w = byDefault(props.w, 40)
	const h = byDefault(props.h, 40)
	return <>
		<div css={OneKey_css({
			bgColor: bgColor,
			w,
			h,
		})}>
			{props.children}
		</div>
	</>
}

export default OneKey

const OneKey_css = (info: {
	bgColor: string
	w: number
	h: number
}) => css({
	border: `1px solid ${googleColors.gray500}`,
	backgroundColor: info.bgColor,
	width: info.w,
	height: info.h,
	borderRadius: 8,
	...cssPresets.flexCenter
})
