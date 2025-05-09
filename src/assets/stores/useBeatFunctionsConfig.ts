import {create} from 'zustand'
import {immer} from 'zustand/middleware/immer'
import {createJSONStorage, persist} from 'zustand/middleware'

type examType = {
	bpm: number,
	setBpm: (i: number) => void,
	isMetronomePlaying: boolean,//节拍器是否播放
	setIsMetronomePlaying: (i: boolean) => void,
	swingRate: number,
	setSwingRate: (i: number) => void,
	beatType: string,//节奏型
	setBeatType: (i: string) => void,
	isMetronomeReady: boolean,
	setIsMetronomeReady: (i: boolean) => void,
	beatIndexOfMeasure: number,
	setBeatIndexOfMeasure: (i: number) => void,
	isSetBpmMaskOpen: boolean,
	setIsSetBpmMaskOpen: (i: boolean) => void,
	isDetectBpmMaskOpen: boolean,
	setIsDetectBpmMaskOpen: (i: boolean) => void,
	resetStore: () => void,
}
const storeKey = "beatFunctionsConfig"
const defaultStore = {
	bpm: 100,
	isMetronomePlaying: false,//节拍器是否播放
	swingRate: 0,
	// 节奏型
	beatType: "4/4",
	isMetronomeReady: false, // 节拍器是否加载完成
	beatIndexOfMeasure: 0,
	isSetBpmMaskOpen: false,
	isDetectBpmMaskOpen: false,

}

const useBeatFunctionsConfig = create<examType>()(immer(persist(
	(set) => ({
		...defaultStore,
		setBpm: (i: number) => {
			set((state) => {
				state.bpm = i
			})
		},
		setIsDetectBpmMaskOpen: (i: boolean) => {
			set((state) => {
				state.isDetectBpmMaskOpen = i
			})
		},
		setIsSetBpmMaskOpen: (i: boolean) => {
			set((state) => {
				state.isSetBpmMaskOpen = i
			})
		},
		setBeatIndexOfMeasure: (i: number) => {
			set((state) => {
				state.beatIndexOfMeasure = i
			})
		},
		setIsMetronomeReady: (i: boolean) => {
			set((state) => {
				state.isMetronomeReady = i
			})
		},
		setBeatType: (i: string) => {
			set((state) => {
				state.beatType = i
			})
		},
		setSwingRate: (i: number) => {
			set((state) => {
				state.swingRate = i
			})
		},
		setIsMetronomePlaying: (i: boolean) => {
			set((state) => {
				state.isMetronomePlaying = i
			})
		},
		resetStore: () => {
			set(defaultStore)
			localStorage.removeItem(storeKey)
		}

	}),
	{
		name: storeKey, // name of the item in the storage (must be unique)
		storage:
			createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
	}
	,
),))

export default useBeatFunctionsConfig
