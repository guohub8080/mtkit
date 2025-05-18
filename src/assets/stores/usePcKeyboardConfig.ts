import googleColors from "@/assets/colors/googleColors.ts";
import {create} from 'zustand'
import {immer} from 'zustand/middleware/immer'
import {createJSONStorage, persist} from 'zustand/middleware'

const functionalKeyUnselectedBgColor = googleColors.blueGray50
const functionalKeySelectedBgColor = googleColors.blue100

const blackPianoKeyBgColor = googleColors.gray800
const blackPianoKeySelectColor = googleColors.amber200

const whitePianoKeyBgColor = "#FFFFFF"
const whitePianoKeySelectColor = googleColors.amber200
export const defaultKeyMap = {
	"`": {
		isPressed: false,
		PressedBackgroundColor: functionalKeySelectedBgColor,
		UnPressedBackgroundColor: functionalKeyUnselectedBgColor
	},
	"1": {
		isPressed: false,
		PressedBackgroundColor: functionalKeySelectedBgColor,
		UnPressedBackgroundColor: functionalKeyUnselectedBgColor
	},

	"2": {
		isPressed: false,
		PressedBackgroundColor: functionalKeySelectedBgColor,
		UnPressedBackgroundColor: functionalKeyUnselectedBgColor
	},
	"3": {
		isPressed: false,
		PressedBackgroundColor: functionalKeySelectedBgColor,
		UnPressedBackgroundColor: functionalKeyUnselectedBgColor
	},
	"4": {
		isPressed: false,
		PressedBackgroundColor: functionalKeySelectedBgColor,
		UnPressedBackgroundColor: functionalKeyUnselectedBgColor
	},
	"5": {
		isPressed: false,
		PressedBackgroundColor: functionalKeySelectedBgColor,
		UnPressedBackgroundColor: functionalKeyUnselectedBgColor
	},
	"6": {
		isPressed: false,
		PressedBackgroundColor: functionalKeySelectedBgColor,
		UnPressedBackgroundColor: functionalKeyUnselectedBgColor
	},
	"7": {
		isPressed: false,
		PressedBackgroundColor: blackPianoKeySelectColor,
		UnPressedBackgroundColor: blackPianoKeyBgColor,
		midiValue: 1
	},
	"8": {
		isPressed: false,
		PressedBackgroundColor: blackPianoKeySelectColor,
		UnPressedBackgroundColor: blackPianoKeyBgColor,
		midiValue: 3
	},
	"0": {
		isPressed: false,
		PressedBackgroundColor: blackPianoKeySelectColor,
		UnPressedBackgroundColor: blackPianoKeyBgColor,
		midiValue: 6
	},
	"-": {
		isPressed: false,
		PressedBackgroundColor: blackPianoKeySelectColor,
		UnPressedBackgroundColor: blackPianoKeyBgColor,
		midiValue: 8
	}, "=": {
		isPressed: false,
		PressedBackgroundColor: blackPianoKeySelectColor,
		UnPressedBackgroundColor: blackPianoKeyBgColor,
		midiValue: 10
	},
	"y": {
		isPressed: false,
		PressedBackgroundColor: whitePianoKeySelectColor,
		UnPressedBackgroundColor: whitePianoKeyBgColor,
		midiValue: 0
	},
	"u": {
		isPressed: false,
		PressedBackgroundColor: whitePianoKeySelectColor,
		UnPressedBackgroundColor: whitePianoKeyBgColor,
		midiValue: 2
	},
	"i": {
		isPressed: false,
		PressedBackgroundColor: whitePianoKeySelectColor,
		UnPressedBackgroundColor: whitePianoKeyBgColor,
		midiValue: 4
	},
	"o": {
		isPressed: false,
		PressedBackgroundColor: whitePianoKeySelectColor,
		UnPressedBackgroundColor: whitePianoKeyBgColor,
		midiValue: 5
	},
	"p": {
		isPressed: false,
		PressedBackgroundColor: whitePianoKeySelectColor,
		UnPressedBackgroundColor: whitePianoKeyBgColor,
		midiValue: 7
	},
	"[": {
		isPressed: false,
		PressedBackgroundColor: whitePianoKeySelectColor,
		UnPressedBackgroundColor: whitePianoKeyBgColor,
		midiValue: 9
	},
	"]": {
		isPressed: false,
		PressedBackgroundColor: whitePianoKeySelectColor,
		UnPressedBackgroundColor: whitePianoKeyBgColor,
		midiValue: 11
	},

	"q": {
		isPressed: false,
		PressedBackgroundColor: functionalKeySelectedBgColor,
		UnPressedBackgroundColor: functionalKeyUnselectedBgColor
	},
	"w": {
		isPressed: false,
		PressedBackgroundColor: functionalKeySelectedBgColor,
		UnPressedBackgroundColor: functionalKeyUnselectedBgColor
	},
	"e": {
		isPressed: false,
		PressedBackgroundColor: functionalKeySelectedBgColor,
		UnPressedBackgroundColor: functionalKeyUnselectedBgColor,
	},
	"r": {
		isPressed: false,
		PressedBackgroundColor: functionalKeySelectedBgColor,
		UnPressedBackgroundColor: functionalKeyUnselectedBgColor
	},
	"s": {
		isPressed: false,
		PressedBackgroundColor: blackPianoKeySelectColor,
		UnPressedBackgroundColor: blackPianoKeyBgColor,
		midiValue: 1
	},
	"d": {
		isPressed: false,
		PressedBackgroundColor: blackPianoKeySelectColor,
		UnPressedBackgroundColor: blackPianoKeyBgColor,
		midiValue: 3
	}, "j": {
		isPressed: false,
		PressedBackgroundColor: blackPianoKeySelectColor,
		UnPressedBackgroundColor: blackPianoKeyBgColor,
		midiValue: 10
	}, "g": {
		isPressed: false,
		PressedBackgroundColor: blackPianoKeySelectColor,
		UnPressedBackgroundColor: blackPianoKeyBgColor,
		midiValue: 6
	}, "h": {
		isPressed: false,
		PressedBackgroundColor: blackPianoKeySelectColor,
		UnPressedBackgroundColor: blackPianoKeyBgColor,
		midiValue: 8
	},
	"z": {
		isPressed: false,
		PressedBackgroundColor: whitePianoKeySelectColor,
		UnPressedBackgroundColor: whitePianoKeyBgColor,
		midiValue: 0
	}, "x": {
		isPressed: false,
		PressedBackgroundColor: whitePianoKeySelectColor,
		UnPressedBackgroundColor: whitePianoKeyBgColor,
		midiValue: 2
	}, "c": {
		isPressed: false,
		PressedBackgroundColor: whitePianoKeySelectColor,
		UnPressedBackgroundColor: whitePianoKeyBgColor,
		midiValue: 4
	}, "v": {
		isPressed: false,
		PressedBackgroundColor: whitePianoKeySelectColor,
		UnPressedBackgroundColor: whitePianoKeyBgColor,
		midiValue: 5
	}, "b": {
		isPressed: false,
		PressedBackgroundColor: whitePianoKeySelectColor,
		UnPressedBackgroundColor: whitePianoKeyBgColor,
		midiValue: 7
	}, "n": {
		isPressed: false,
		PressedBackgroundColor: whitePianoKeySelectColor,
		UnPressedBackgroundColor: whitePianoKeyBgColor,
		midiValue: 9
	}, "m": {
		isPressed: false,
		PressedBackgroundColor: whitePianoKeySelectColor,
		UnPressedBackgroundColor: whitePianoKeyBgColor,
		midiValue: 11
	},
}
type pcKeyboardType = {
	keyMap: Record<string, {
		isPressed: boolean,
		PressedBackgroundColor: string,
		UnPressedBackgroundColor: string,
	}>
	setKeyMap: (key: string, isPressed: boolean) => void,
	rightHandOctave: number,
	leftHandOctave: number,
	setRightHandOctave: (octave: number) => void,
	setLeftHandOctave: (octave: number) => void,
	resetStore: () => void,
}
const storeKey = "pcKeyboardConfig"
const defaultStore = {
	keyMap: defaultKeyMap,
	rightHandOctave: 5,// 右手八度右手默认octave
	leftHandOctave: 4,// 左手八度左手默认octave
}
const usePcKeyboardConfig = create<pcKeyboardType>()(immer(persist(
	(set) => ({
		...defaultStore,
		setKeyMap: (key, isPressed: boolean) => {
			set(state => {
				state.keyMap[key].isPressed = isPressed
			})
		},
		setRightHandOctave: (octave: number) => {
			set(state => {
				state.rightHandOctave = octave
			})
		},
		setLeftHandOctave: (octave: number) => {
			set(state => {
				state.leftHandOctave = octave
			})
		},
		resetStore: () => {
			set(defaultStore)
			localStorage.removeItem(storeKey)
		}

	}),
	{
		name: storeKey, // name of the item in the storage (must be unique)
		storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
	},
),))

export default usePcKeyboardConfig
