// noinspection ES6PreferShortImport

import useInstrument from "@/assets/instruments/useInstrument.ts";
import useGlobalSettings from "@/assets/stores/useGlobalSettings.ts";
import useMIDIConfig from "@/assets/stores/useMIDIConfig.ts";
import useMIDIPortsStore from "@/assets/stores/useMidiPortsStore.ts";
import usePcKeyboardConfig, {defaultKeyMap} from "@/assets/stores/usePcKeyboardConfig.ts";
import guoDT from "@/utils/guoDT.ts";
import useMidiEvents from "@/utils/useMIDI/useMidiEvents.ts";
import useMidiKeyboardPlay from "@/utils/useMIDI/useMidiKeyboardPlay.ts";
import useMIDIPorts from "@/utils/useMIDI/useMIDIPorts.ts";
import {keys, random, set} from "lodash";
import {useEffect, useState} from "react";
import {useHotkeys} from "react-hotkeys-hook";


const usePcKeyStroke = () => {
	const {
		keyMap,
		setKeyMap,
		leftHandOctave,
		rightHandOctave,
		setLeftHandOctave,
		setRightHandOctave,
	} = usePcKeyboardConfig()
	const {setLatestEvent} = useMidiEvents()
	const {isBroadcastMidi} = useMIDIConfig()
	const {isPlayerActive} = useMidiKeyboardPlay()
	const {inputs} = useMIDIPortsStore()
	const {isLoaded} = useInstrument()

	const [isActive, setIsActive] = useState(true)

	useEffect(() => {
		if (rightHandOctave === 3) {
			setKeyMap("`", true)
			setKeyMap("1", false)
			setKeyMap("2", false)
			setKeyMap("3", false)
			setKeyMap("4", false)
			setKeyMap("5", false)
		}
		if (rightHandOctave === 4) {
			setKeyMap("`", false)
			setKeyMap("1", true)
			setKeyMap("2", false)
			setKeyMap("3", false)
			setKeyMap("4", false)
			setKeyMap("5", false)
		}
		if (rightHandOctave === 5) {
			setKeyMap("`", false)
			setKeyMap("1", false)
			setKeyMap("2", true)
			setKeyMap("3", false)
			setKeyMap("4", false)
			setKeyMap("5", false)
		}
		if (rightHandOctave === 6) {
			setKeyMap("`", false)
			setKeyMap("1", false)
			setKeyMap("2", false)
			setKeyMap("3", true)
			setKeyMap("4", false)
			setKeyMap("5", false)
		}
		if (rightHandOctave === 7) {
			setKeyMap("`", false)
			setKeyMap("1", false)
			setKeyMap("2", false)
			setKeyMap("3", false)
			setKeyMap("4", true)
			setKeyMap("5", false)
		}
		if (rightHandOctave === 8) {
			setKeyMap("`", false)
			setKeyMap("1", false)
			setKeyMap("2", false)
			setKeyMap("3", false)
			setKeyMap("4", false)
			setKeyMap("5", true)
		}
		if (leftHandOctave === 2) {
			setKeyMap("q", true)
			setKeyMap("w", false)
			setKeyMap("e", false)
			setKeyMap("r", false)
		}
		if (leftHandOctave === 3) {
			setKeyMap("q", false)
			setKeyMap("w", true)
			setKeyMap("e", false)
			setKeyMap("r", false)
		}
		if (leftHandOctave === 4) {
			setKeyMap("q", false)
			setKeyMap("w", false)
			setKeyMap("e", true)
			setKeyMap("r", false)
		}
		if (leftHandOctave === 5) {
			setKeyMap("q", false)
			setKeyMap("w", false)
			setKeyMap("e", false)
			setKeyMap("r", true)
		}
	}, [leftHandOctave, rightHandOctave])


	//绑定键盘事件
	useHotkeys("*", e => {
			if (e.repeat) return;
			if (!isActive) return;
			if (e.type === "keydown") {
				if (e.key === "`") {
					return setRightHandOctave(3)
				}
				if (e.key === "1") {
					return setRightHandOctave(4)
				}
				if (e.key === "2") {
					return setRightHandOctave(5)
				}
				if (e.key === "3") {
					return setRightHandOctave(6)
				}
				if (e.key === "4") {
					return setRightHandOctave(7)
				}
				if (e.key === "5") {
					return setRightHandOctave(8)
				}
				if (e.key === "q") {
					return setLeftHandOctave(2)
				}
				if (e.key === "w") {
					return setLeftHandOctave(3)
				}
				if (e.key === "e") {
					return setLeftHandOctave(4)
				}
				if (e.key === "r") {
					return setLeftHandOctave(5)
				}
				if (keys(defaultKeyMap).includes(e.key)) {
					setKeyMap(e.key, true)
					if (isPlayerActive && isLoaded) {
						if ("yuiop[]780-=".includes(e.key)) {
							return setLatestEvent({
								name: "乐理计算器",
								note: defaultKeyMap[e.key].midiValue + rightHandOctave * 12,
								velocity: random(70, 120),
								isNoteOn: true,
								isNoteOff: false,
								time: guoDT.getDayjs()
							})
						}
						if ("zxcvbnmsdghj".includes(e.key)) {
							return setLatestEvent({
								name: "乐理计算器",
								note: defaultKeyMap[e.key].midiValue + leftHandOctave * 12,
								velocity: random(70, 120),
								isNoteOn: true,
								isNoteOff: false,
								time: guoDT.getDayjs()
							})
						}
					}
				}
			}
			if (e.type === "keyup") {
				if ("`123456qwert".includes(e.key)) {
					return
				}
				if (keys(defaultKeyMap).includes(e.key)) {
					setKeyMap(e.key, false)
					if ("yuiop[]780-=".includes(e.key)) {
						return setLatestEvent({
							name: "乐理计算器",
							note: defaultKeyMap[e.key].midiValue + rightHandOctave * 12,
							velocity: random(70, 120),
							isNoteOn: false,
							isNoteOff: true,
							time: guoDT.getDayjs()
						})
					}
					if ("zxcvbnmsdghj".includes(e.key)) {
						return setLatestEvent({
							name: "乐理计算器",
							note: defaultKeyMap[e.key].midiValue + leftHandOctave * 12,
							velocity: random(70, 120),
							isNoteOn: false,
							isNoteOff: true,
							time: guoDT.getDayjs()
						})
					}
				}
			}
		},
		{
			keyup: true,
			keydown: true,
		})
	return {keyMap, isActive, setIsActive}
}

export default usePcKeyStroke
