// noinspection ES6PreferShortImport

import useInstrument from "@/assets/instruments/useInstrument.ts";
import useMIDIConfig from "@/assets/stores/useMIDIConfig.ts";
import {isEmpty, isNull, isUndefined} from "lodash";
import {useEffect, useState} from "react";
import * as Tone from "tone";

const useMidiKeyboardPlay = () => {
	const {player, isLoaded} = useInstrument();
	const {isMidiKeyStrokeSoundOn, latestEvent} = useMIDIConfig()
	const [isPlayerActive, setIsPlayerActive] = useState(true)

	useEffect(() => {
		// console.log(isLoaded, isMidiKeyStrokeSoundOn, latestEvent, player)
		if (!isPlayerActive) return;
		if (!isLoaded) return;
		if (!isMidiKeyStrokeSoundOn) return;
		if (isEmpty(latestEvent)) return;
		if (isUndefined(latestEvent) || isNull(latestEvent)) return;
		if (isEmpty(player)) return;
		if (latestEvent.isNoteOn) {
			player?.triggerAttack(Tone.Frequency(latestEvent.note, "midi").toNote())
		}
		if (latestEvent.isNoteOff) {
			player?.triggerRelease(Tone.Frequency(latestEvent.note, "midi").toNote())
		}
	}, [latestEvent, isLoaded, isMidiKeyStrokeSoundOn]);
	return {
		isPlayerActive, setIsPlayerActive
	}
}

export default useMidiKeyboardPlay
