/* eslint-disable no-mixed-spaces-and-tabs */
import {css} from "@emotion/react";
import cssPresets from "@/assets/styles/cssPresets.ts";
import NoteSymbol from "@/components/reNote/NoteSymbol/NoteSymbol.tsx";
import byDefault from "@/utils/byDefault.ts";

const romeNum = "0ⅠⅡⅢⅣⅤⅥⅦ".split("")
const NumberNote = (props: {
	num: number,
	alter: number
	fontSize: number,
	color: string,
	align?: "start" | "center" | "end"
	isRomeStyle?: boolean
}) => {
	const align = byDefault(props.align, "center")
	const isRomeStyle = byDefault(props.isRomeStyle, false)
	if (props.alter === 0) {
		return <div css={NumberNote_css(props.fontSize, props.color, props.alter, align, isRomeStyle)}>
			<div className="num"
			     style={isRomeStyle ? {fontFamily: "tnr"} : void 0}>{isRomeStyle ? romeNum[props.num] : props.num}</div>
		</div>
	}
	return <div css={NumberNote_css(props.fontSize, props.color, props.alter, align, isRomeStyle)}>
		<div className="num">{isRomeStyle ? romeNum[props.num] : props.num}</div>
		<div className="number_alter">
			<NoteSymbol alter={props.alter} color={props.color}/>
		</div>
	</div>
}

export default NumberNote

const NumberNote_css = (fontSize: number,
                        color: string,
                        alter: number, align: string, isRomeStyle: boolean) => {
	let numberMR = 1
	if (fontSize <= 16 && isRomeStyle) numberMR = 0
	if (fontSize > 16 && isRomeStyle) numberMR = 2
	return css({
		...cssPresets.flexCenter,
		justifyContent: align,
		"& .num": {
			fontSize: fontSize,
			color: color,
			marginRight: numberMR,
		},
		"& .number_alter": {
			height: alter === -2 ? fontSize * 0.7 : fontSize * 0.8,
			width: "auto",
			...cssPresets.flexCenter,
			justifyContent: isRomeStyle ? "start" : "center",
			marginTop: isRomeStyle ? 2 : 0,
		}
	})
}
