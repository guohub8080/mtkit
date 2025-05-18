/* eslint-disable no-mixed-spaces-and-tabs */
import MainKeyboardLayout from "@/apps/PcKeyboardPlay/parts/MainKeyboardLayout.tsx";
import PcKeyboardConfig from "@/apps/PcKeyboardPlay/parts/PcKeyboardConfig.tsx";
import PcKeyboardNotShow from "@/apps/PcKeyboardPlay/parts/PcKeyboardNotShow.tsx";
import useGlobalSettings from "@/assets/stores/useGlobalSettings.ts";
import useMIDIConfig from "@/assets/stores/useMIDIConfig.ts";
import useMIDIPortsStore from "@/assets/stores/useMidiPortsStore.ts";
import usePcKeyboardConfig from "@/assets/stores/usePcKeyboardConfig.ts";
import useMIDIPorts from "@/utils/useMIDI/useMIDIPorts.ts";
import useMIDIReady from "@/utils/useMIDI/useMIDIReady.ts";
import {css} from "@emotion/react";
import {Button} from "antd-mobile";
import delay from "delay";
import JZZ from "jzz";
import {isEmpty} from "lodash";
import {useEffect, useLayoutEffect, useMemo} from "react";
import {useWindowSize} from "react-use";

const PcKeyboardPlay = () => {
	const {width} = useWindowSize()
	const {isJzzEngineReady, isWebMidiSupport} = useMIDIReady()
	const {latestEvent, isBroadcastMidi} = useMIDIConfig()
	const {initJzz} = useMIDIPortsStore()
	const {outputs, setSelectedOutPortIndex, selectedOutPortIndex, refreshPorts} = useMIDIPorts()

	useLayoutEffect(() => {
		initJzz()
		refreshPorts()

	}, [isWebMidiSupport, isJzzEngineReady])


	const sendToAllOutPorts = (note: number, velocity: number, isNoteOn: boolean) => {
		for (let index = 0; index < outputs.length; index++) {
			if (index === selectedOutPortIndex) {
				JZZ().openMidiOut(index).then((out) => {
					// console.log("我要发送的是：", out.info().name)
					if (isNoteOn) {
						out.noteOn(0, note, velocity);
					} else {
						out.noteOff(0, note);
					}
				})
			}
		}
	};

	useEffect(() => {
		if (!isBroadcastMidi) return;
		if (isEmpty(latestEvent)) return;
		sendToAllOutPorts(latestEvent.note, latestEvent.velocity, latestEvent.isNoteOn)
	}, [latestEvent, isBroadcastMidi])
	if (width <= 500) return <PcKeyboardNotShow/>
	return <>
		<div css={PcKeyboardPlay_css}>
			<PcKeyboardConfig/>
			<MainKeyboardLayout/>
		</div>
	</>
}

export default PcKeyboardPlay

const PcKeyboardPlay_css = css({})


