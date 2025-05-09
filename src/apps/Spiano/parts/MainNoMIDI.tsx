/* eslint-disable no-mixed-spaces-and-tabs */
import NotSupportMidi from "@/apps/Settings/components/NotSupportMidi.tsx";
import googleColors from "@/assets/colors/googleColors.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import naviConfig from "@/router/naviConfig.ts";
import routerPath from "@/router/routerPath.ts";
import {css} from "@emotion/react";
import React from "react";
import {useNavigate} from "react-router-dom";

const MainNoMIDI = () => {
	const navigate = useNavigate()

	const naviToSettings = () => {
		navigate(`/${routerPath.settings}`, {replace: true})
	}
	return <>
		<div css={MainNoMIDI_css}>
			<NotSupportMidi/>
			<div className="back" onClick={naviToSettings}>
				跳转至设置功能
			</div>
			<div className="back" onClick={() => navigate(0)}>
				刷新重试
			</div>
		</div>
	</>
}

export default MainNoMIDI

const MainNoMIDI_css = css({
	width: "100%",
	maxWidth: 450,
	marginLeft: "auto",
	marginRight: "auto",
	fontSize: 20,
	"& .back": {
		cursor: "pointer",
		fontSize: 16,
		height: 50,
		marginTop: 15,
		width: 220,
		backgroundColor: googleColors.blue50,
		marginLeft: "auto",
		marginRight: "auto",
		border: "1px solid #0070c9",
		borderRadius: 999,
		...cssPresets.flexCenter,
		color: "#0070c9",
		marginBottom: 15,
		...cssPresets.transition,
		"&:active": {
			backgroundColor: googleColors.blue100
		}
	},
})
