import Beat3_4_Svg from "@/apps/Beats/components/Beat3_4_Svg.tsx";
import Beat4_4_Svg from "@/apps/Beats/components/Beat4_4_Svg.tsx";
import BeatsDetectPad from "@/apps/Beats/parts/BeatsDetectPad.tsx";
import BeatSelector from "@/apps/Beats/parts/BeatSelector.tsx";
import BpmWindow from "@/apps/Beats/parts/BpmWindow.tsx";
import PlayBeatWindow from "@/apps/Beats/parts/PlayBeatWindow.tsx";
import MetronomeBase64URLs from "@/assets/instruments/metronome/metronomeBase64URLs.ts";
import useMetronome from "@/assets/instruments/metronome/useMetronome.ts";
import useBeatFunctionsConfig from "@/assets/stores/useBeatFunctionsConfig.ts";
import useGlobalSettings from "@/assets/stores/useGlobalSettings.ts";
import cssFunctions from "@/assets/styles/cssFunctions.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import {css} from "@emotion/react";
import {useAsyncEffect} from "ahooks";
import {useCallback, useEffect} from "react";
import {debounce} from "lodash"; // 确保已安装 lodash

const metronomeSounds = {
	strong: MetronomeBase64URLs.C5,
	medium: MetronomeBase64URLs.G4,
	weak: MetronomeBase64URLs.C3,
};

import {useState} from 'react';


const Beats = () => {
	const {naviBarHeight} = useGlobalSettings()
	const {} = useBeatFunctionsConfig()
	const {loadAudio, stopPlayback} = useMetronome()
	useAsyncEffect(async () => {
		await loadAudio().then()
		await stopPlayback()
	}, [])
	return <div css={beats_css({naviBarHeight})}>
		<div className="inner_frame">
			<BeatSelector/>
			<BpmWindow/>
			<PlayBeatWindow/>
		</div>
	</div>
};

export default Beats;

const beats_css = (info: { naviBarHeight: number }) => css({
	width: "100%",
	...cssPresets.flexCenter,
	height: `calc(100vh - ${info.naviBarHeight}px)`,
	overflowX: "hidden",
	overflowY: "auto",
	"& .inner_frame": {
		...cssPresets.mxAuto,
		...cssFunctions.mx(25),
		width: "100%",
		maxWidth: 500,
	}
})
