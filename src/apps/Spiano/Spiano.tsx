import MidiConfigTopBar from "@/apps/Spiano/components/MidiConfigTopBar.tsx";
import DraggablePcKeyboard from "@/apps/Spiano/parts/DraggablePcKeyboard.tsx";
import KeyStrokeAnalysis from "@/apps/Spiano/parts/KeyStrokeAnalysis.tsx";
import MainNoMIDI from "@/apps/Spiano/parts/MainNoMIDI.tsx";
import MidiEventsList from "@/apps/Spiano/parts/MidiEventsList.tsx";
import MidiPiano from "@/apps/Spiano/parts/MidiPiano.tsx";
import googleColors from "@/assets/colors/googleColors.ts";
import useGlobalSettings from "@/assets/stores/useGlobalSettings.ts";
import useMIDIConfig from "@/assets/stores/useMIDIConfig.ts";
import useMIDIPortsStore from "@/assets/stores/useMidiPortsStore.ts";
import cssFunctions from "@/assets/styles/cssFunctions.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import useMidiEvents from "@/utils/useMIDI/useMidiEvents.ts";
import useMidiKeyboardPlay from "@/utils/useMIDI/useMidiKeyboardPlay.ts";
import useMIDIPorts from "@/utils/useMIDI/useMIDIPorts.ts";
import useMIDIReady from "@/utils/useMIDI/useMIDIReady.ts";
import {css} from "@emotion/react";
import React, {CSSProperties, ReactNode, useEffect, useLayoutEffect, useRef, useState} from 'react';
import Draggable from 'react-draggable';


const NoMidiSupport = ({isWebMidiSupport, isJzzEngineReady, outputs, inputs}) => {
	const [showNoMidi, setShowNoMidi] = useState(false);
	const hasRendered = useRef(false);

	useEffect(() => {
		if (hasRendered.current) return;
		const timer = setTimeout(() => {
			if (!(isWebMidiSupport && isJzzEngineReady)) {
				setShowNoMidi(true);
				hasRendered.current = true;
			}
		}, 3000);
		return () => clearTimeout(timer);
	}, [isWebMidiSupport, isJzzEngineReady, outputs.length, inputs.length]);

	return <div style={{
		maxHeight: showNoMidi ? 999 : 0,
		opacity: showNoMidi ? 1 : 0,
		transition: "all 1s"
	}}>
		{showNoMidi && <FullFrame><MainNoMIDI/></FullFrame>}
	</div>;
};
const FullFrame = (props: {
	children?: ReactNode
}) => {
	return <div style={{width: "100%", ...cssFunctions.px(15), ...cssPresets.flexCenter}}>{props.children}</div>
}
const Spiano = () => {
	const {outputs, inputs} = useMIDIPorts()
	const {isWebMidiSupport, isJzzEngineReady} = useMIDIReady()
	const {noteOnNumList, latestEvent} = useMidiEvents()
	const {isPlayerActive, setIsPlayerActive} = useMidiKeyboardPlay()
	const {naviBarHeight} = useGlobalSettings()
	const {isMidiEventListShow, isPianoKeyboardShow, isAnalyzeShow, setIsPcKeyboardShow} = useMIDIConfig()
	if (import.meta.env.DEV) {
		console.log(latestEvent)
	}

	const {initJzz} = useMIDIPortsStore()

	useLayoutEffect(() => {
		initJzz()
	}, [isWebMidiSupport, isJzzEngineReady])

	useEffect(() => {
		setIsPlayerActive(true)
		setIsPcKeyboardShow(false)
	}, [])


	return <div css={MidiTest_css(naviBarHeight)}>
		<MidiConfigTopBar/>


		<div className="main_inner_frame">
			{isPianoKeyboardShow && <MidiPiano/>}
			{isAnalyzeShow && <KeyStrokeAnalysis/>}
			<DraggablePcKeyboard/>
			{isMidiEventListShow && <MidiEventsList/>}
			<NoMidiSupport
				isWebMidiSupport={isWebMidiSupport}
				isJzzEngineReady={isJzzEngineReady}
				outputs={outputs}
				inputs={inputs}
			/>
		</div>

	</div>
};

export default Spiano;

const MidiTest_css = (naviBarHeight: number) => css({
	...cssPresets.flexCenter,
	flexDirection: "column",
	fontSize: 20,
	color: googleColors.gray600,
	"& .main_inner_frame": {
		...cssPresets.flexCenter,
		flexDirection: "column",
		justifyContent: "start",
		width: "100%",
		height: `calc(100vh - ${naviBarHeight + 60}px)`,
		minHeight: `calc(100vh - ${naviBarHeight + 60}px)`,
		maxHeight: `calc(100vh - ${naviBarHeight + 60}px)`,
		overflowY: "auto",
		overflowX: "hidden",
		paddingBottom: 50
	}
})

const not_support_frame_style: CSSProperties = {}
