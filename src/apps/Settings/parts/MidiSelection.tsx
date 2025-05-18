/* eslint-disable no-mixed-spaces-and-tabs */
import NotSupportMidi from "@/apps/Settings/components/NotSupportMidi.tsx";
import googleColors from "@/assets/colors/googleColors.ts";
import cssFunctions from "@/assets/styles/cssFunctions.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import useMIDIPorts from "@/utils/useMIDI/useMIDIPorts.ts";
import useMIDIReady from "@/utils/useMIDI/useMIDIReady.ts";
import {css} from "@emotion/react";
import {isEmpty} from "lodash";
import {useEffect} from "react";
import {BiSolidRightArrow} from "react-icons/bi";

const MidiSelection = () => {
	const {isJzzEngineReady, isWebMidiSupport} = useMIDIReady()
	const midiPorts = useMIDIPorts()
	// const selectMidiOut = (out: string) => {
	// 	midiPorts.setCurrentOutPort(out)
	// }
	// useEffect(() => {
	// 	if (isEmpty(midiPorts.currentOutPort) && midiPorts.outputs.length > 0) {
	// 		midiPorts.setCurrentOutPort(midiPorts.outputs[0]["name"])
	// 	}
	// }, [midiPorts])
	if (!isJzzEngineReady || !isWebMidiSupport) return <NotSupportMidi/>
	return <>
		<div css={MidiSelection_css}>
			<div style={{marginBottom: 10, color: googleColors.blue800}}>当前设备支持的MIDI设备</div>
			<div className="ports_list">
				{midiPorts.inputs.map((x, y) => <div className="port" key={`i${y}`}>
					<div className="port_type in">IN</div>
					<div className="port_name">{x.name}</div>
				</div>)}
				{midiPorts.outputs.map((x, y) => <div
					className="port" key={`o${y}`}>
					<div className="port_type out">OUT</div>
					<div className="port_name">{x.name}</div>
				</div>)}
			</div>
		</div>
	</>
}

export default MidiSelection

const MidiSelection_css = css({
	width: "100%",
	borderRadius: 8,
	backgroundColor: "white",
	marginTop: 15,
	...cssFunctions.py(25),
	"& .port": {
		...cssPresets.flexCenter,
		height: 35,
		...cssPresets.defaultHoverAndActive as any,
		"&>.is_selected": {
			width: 25,
			height: 45,
			...cssPresets.flexCenter,
		},
		"&>.port_type": {
			fontSize: 12,
			...cssFunctions.px(10),
			...cssFunctions.py(5),
			width: 50,
			borderRadius: 3,
			marginRight: 10,
		},
		"&>.out": {
			backgroundColor: googleColors.blue500,
			color: "white"
		},
		"&>.in": {
			backgroundColor: googleColors.orange500,
			color: "white"
		},
		"& .port_name": {
			width: "100%",
			lineHeight: "35px",
			height: 35,
			whiteSpace: "nowrap",
			overflow: "hidden",
			maxWidth: 180,
			textOverflow: "ellipsis",
			textAlign: "left",
		}
	}
})
