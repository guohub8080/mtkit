import MidiConfigTopBar from "@/apps/MidiMessage/components/MidiConfigTopBar.tsx";
import KeyStrokeAnalysis from "@/apps/MidiMessage/parts/KeyStrokeAnalysis.tsx";
import MainNoMIDI from "@/apps/MidiMessage/parts/MainNoMIDI.tsx";
import MidiEventsList from "@/apps/MidiMessage/parts/MidiEventsList.tsx";
import MidiPiano from "@/apps/MidiMessage/parts/MidiPiano.tsx";
import googleColors from "@/assets/colors/googleColors.ts";
import useInstrument from "@/assets/instruments/useInstrument.ts";
import useGlobalSettings from "@/assets/stores/useGlobalSettings.ts";
import useMIDIConfig from "@/assets/stores/useMIDIConfig.ts";
import cssFunctions from "@/assets/styles/cssFunctions.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import useMidiEvents from "@/utils/useMIDI/useMidiEvents.ts";
import useMidiKeyboardPlay from "@/utils/useMIDI/useMidiKeyboardPlay.ts";
import useMIDIPorts from "@/utils/useMIDI/useMIDIPorts.ts";
import useMIDIReady from "@/utils/useMIDI/useMIDIReady.ts";
import {css} from "@emotion/react";
import {keys, random} from "lodash";
import React, {CSSProperties, ReactNode, useEffect, useRef, useState} from 'react';
import {useHotkeys} from 'react-hotkeys-hook';

// const keyMap = {
// 	"a": 60,
// 	"s": 65 - 12,
// 	"d": 67 - 12,
// 	"w": 69,
// 	"j": 50,
// 	"k": 56,
// 	"l": 45,
// 	"z": 48,
// }
// const keyList = keys(keyMap)

const NoMidiSupport = ({isWebMidiSupport, isJzzEngineReady, outputs, inputs}) => {
	const [showNoMidi, setShowNoMidi] = useState(false);
	const hasRendered = useRef(false);

	useEffect(() => {
		if (hasRendered.current) return;
		const timer = setTimeout(() => {
			if (!(isWebMidiSupport && isJzzEngineReady) || (outputs.length === 0 || inputs.length === 0)) {
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
const MidiMessage = () => {
	const {isWebMidiSupport, isJzzEngineReady} = useMIDIReady()
	const {noteOnNumList, latestEvent} = useMidiEvents()
	const {naviBarHeight} = useGlobalSettings()
	const {outputs, inputs} = useMIDIPorts()
	const {isMidiEventListShow, isPianoKeyboardShow, isAnalyzeShow} = useMIDIConfig()
	// const {isLoaded} = useInstrument()
	// //绑定键盘事件
	// useHotkeys(keyList, e => {
	// 	if (e.repeat) return;
	// 	if (e.type === "keydown") {
	// 		currentOutPort.noteOn(0, keyMap[e.key], random(80, 125))
	// 	} else {
	// 		currentOutPort.noteOff(0, keyMap[e.key])
	// 	}
	// }, {
	// 	keyup: true,
	// 	keydown: true,
	// })
	const {player, setMidiLog} = useMidiKeyboardPlay()

	useEffect(() => {
		setMidiLog(false)
	}, [latestEvent])

	return <div css={miditest_css(naviBarHeight)}>
		<MidiConfigTopBar/>
		<div className="main_inner_frame">
			{isPianoKeyboardShow && <MidiPiano/>}
			{isAnalyzeShow && <KeyStrokeAnalysis/>}
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

export default MidiMessage;

const miditest_css = (naviBarHeight: number) => css({
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
