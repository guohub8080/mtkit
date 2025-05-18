import {Dayjs} from "dayjs";
import JZZ from "jzz";
import {create} from 'zustand'
import {immer} from 'zustand/middleware/immer'
import {createJSONStorage, persist} from 'zustand/middleware'

type intervalConfigType = {
	isWebMidiSupport: boolean,
	setIsWebMidiSupport: (isWebMidiSupport: boolean) => void,
	isJzzEngineReady: boolean,
	setIsJzzEngineReady: (isJzzEngineReady: boolean) => void,
	isJzzKbdReady: boolean,
	setIsJzzKbdReady: (isJzzKbdReady: boolean) => void,
	selectedInputPortIndex: number,
	selectedOutputPortIndex: number,
	setSelectedInputPortIndex: (i: number) => void,
	setSelectedOutputPortIndex: (i: number) => void,
	resetStore: () => void,
	eventListLength: number,
	setEventListLength: (i: number) => void,
	eventList: {
		name: string,
		note: number,
		isNoteOn: boolean,
		isNoteOff: boolean,
		velocity: number,
		time: Dayjs
	}[]
	setEventList: (i: {
		name: string,
		note: number,
		isNoteOn: boolean,
		isNoteOff: boolean,
		velocity: number,
		time: Dayjs
	}[] | []) => void
	latestEvent: {
		name: string,
		note: number,
		isNoteOn: boolean,
		isNoteOff: boolean,
		velocity: number,
		time: Dayjs
	} | null
	setLatestEvent: (i: {
		name: string,
		note: number,
		isNoteOn: boolean,
		isNoteOff: boolean,
		velocity: number,
		time: Dayjs
	} | null) => void
	isMidiKeyStrokeSoundOn: boolean,
	setIsMidiKeyStrokeSoundOn: (i: boolean) => void,
	isMidiConfigPopoverOpen: boolean,
	setIsMidiConfigPopoverOpen: (i: boolean) => void,
	isMidiEventListShow: boolean,
	setIsMidiEventListShow: (i: boolean) => void,
	isPianoKeyboardShow: boolean,
	setIsPianoKeyboardShow: (i: boolean) => void,
	pianoOctaveGapList: [number, number] | number[]
	setPianoOctaveGapList: (i: [number, number]) => void,
	whiteKeyWidth: number
	setWhiteKeyWidth: (i: number) => void
	isAnalyzeShow: boolean,
	setIsAnalyzeShow: (i: boolean) => void
	noteOnNumList: number[]
	setNoteOnNumList: (i: number[]) => void
	isBroadcastMidi: boolean
	setIsBroadcastMidi: (i: boolean) => void
	isPcKeyboardShow: boolean
	setIsPcKeyboardShow: (i: boolean) => void
	isPcKeyboardShowButMini: boolean
	setIsPcKeyboardShowButMini: (i: boolean) => void
}
const defaultStore = {
	isWebMidiSupport: false,
	isJzzEngineReady: false,
	isJzzKbdReady: false,
	selectedInputPortIndex: 0,
	selectedOutputPortIndex: 0,
	eventListLength: 10, //MIDI Event 消息长度
	isMidiKeyStrokeSoundOn: true,//键盘按键音效开关
	isMidiConfigPopoverOpen: false,//MIDI配置弹窗开关
	isMidiEventListShow: true,//MIDI Event 消息列表显示开关
	isPianoKeyboardShow: true,//钢琴键盘显示开关
	pianoOctaveGapList: [3, 7],//钢琴键盘八度间距
	whiteKeyWidth: 30,//钢琴键盘白键宽度
	isAnalyzeShow: true,//分析显示开关
	eventList: [],
	latestEvent: null,
	noteOnNumList: [],
	isBroadcastMidi: true, //是否广播MIDI消息
	isPcKeyboardShow: false, //是否显示键盘
	isPcKeyboardShowButMini: false, //是否显示键盘但是是小屏幕

}
const storeKey = "midiConfig"
const useMIDIConfig = create<intervalConfigType>()(immer(persist(
	(set) => ({
		...defaultStore,
		setIsBroadcastMidi: (i: boolean) => {
			set((state) => {
				state.isBroadcastMidi = i
			})
		},
		setIsPcKeyboardShowButMini: (i: boolean) => {
			set((state) => {
				state.isPcKeyboardShowButMini = i
			})
		},
		setIsPcKeyboardShow: (i: boolean) => {
			set((state) => {
				state.isPcKeyboardShow = i
			})
		},
		setIsWebMidiSupport: (i: boolean) => {
			set((state) => {
				state.isWebMidiSupport = i
			})
		},
		setNoteOnNumList: (i: number[]) => {
			set((state) => {
				state.noteOnNumList = i
			})
		},
		setLatestEvent: (i: {
			name: string,
			note: number,
			isNoteOn: boolean,
			isNoteOff: boolean,
			velocity: number,
			time: Dayjs
		} | null) => {
			set((state) => {
				state.latestEvent = i
			})
		},
		setEventList: (i: {
			name: string,
			note: number,
			isNoteOn: boolean,
			isNoteOff: boolean,
			velocity: number,
			time: Dayjs
		}[] | []) => {
			set((state) => {
				state.eventList = i
			})
		},
		setIsAnalyzeShow: (i: boolean) => {
			set((state) => {
				state.isAnalyzeShow = i
			})
		},
		setWhiteKeyWidth: (i: number) => {
			set((state) => {
				state.whiteKeyWidth = i
			})
		},
		setPianoOctaveGapList: (i: [number, number]) => {
			set((state) => {
				state.pianoOctaveGapList = i
			})
		},
		setIsPianoKeyboardShow: (i: boolean) => {
			set((state) => {
				state.isPianoKeyboardShow = i
			})
		},
		setIsMidiEventListShow: (i: boolean) => {
			set((state) => {
				state.isMidiEventListShow = i
			})
		},
		setIsMidiConfigPopoverOpen: (i: boolean) => {
			set((state) => {
				state.isMidiConfigPopoverOpen = i
			})
		},
		setIsMidiKeyStrokeSoundOn: (i: boolean) => {
			set((state) => {
				state.isMidiKeyStrokeSoundOn = i
			})
		},

		setEventListLength: (i: number) => {
			set((state) => {
				state.eventListLength = i
			})
		},
		setSelectedInputPortIndex: (i: number) => {
			set((state) => {
				state.selectedInputPortIndex = i
			})
		},
		setSelectedOutputPortIndex: (i: number) => {
			set((state) => {
				state.selectedOutputPortIndex = i
			})
		},
		setIsJzzKbdReady: (i: boolean) => {
			set((state) => {
				state.isJzzKbdReady = i
			})
		},
		setIsJzzEngineReady: (i: boolean) => {
			set((state) => {
				state.isJzzEngineReady = i
			})
		},
		resetStore: () => {
			set(defaultStore)
			localStorage.removeItem(storeKey); // 替换为你定义的 storage key
		},
	}),
	{
		name: storeKey, // name of the item in the storage (must be unique)
		storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
		partialize: (state) => {
			const {eventList, latestEvent, noteOnNumList, ...rest} = state
			return rest
		},
	},
),))

export default useMIDIConfig
