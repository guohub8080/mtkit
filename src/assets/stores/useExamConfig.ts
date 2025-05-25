import {create} from 'zustand'
import {immer} from 'zustand/middleware/immer'
import {createJSONStorage, persist} from 'zustand/middleware'

type examType = {
	examQuestionsNum: number,
	setExamQuestionsNum: (i: number) => void,
	includedClef: string[],
	setIncludedClef: (i: string[]) => void,
	eachQuestionSeconds: number,
	setEachQuestionSeconds: (i: number) => void,
	isNaturalOnly: boolean,
	setIsNaturalOnly: (i: boolean) => void,
	isWelcome: boolean,
	setIsWelcome: (i: boolean) => void,
	resetStore: () => void,
	includedAltersList: number[],
	setIncludedAltersList: (i: number[]) => void,
}
const storeKey = "examConfig"
const defaultStore = {
	isWelcome: true, // 是否显示欢迎页
	examQuestionsNum: 10, //默认10道题
	examMode: "note", //模式，默认按音符出题
	includedClef: ["G", "F"], //出题的谱表号
	eachQuestionSeconds: 10, //每道题的时间
	isNaturalOnly: false, //是否只出自然音
	includedAltersList: [0],//出题有几个升号
}
const useExamConfig = create<examType>()(immer(persist(
	(set) => ({
		...defaultStore,
		setExamQuestionsNum: (i: number) => {
			set((state) => {
				state.examQuestionsNum = i
			})
		},
		setIncludedAltersList: (i: number[]) => {
			set((state) => {
				state.includedAltersList = i
			})
		},
		setEachQuestionSeconds: (i: number) => {
			set((state) => {
				state.eachQuestionSeconds = i
			})
		},
		setIsWelcome: (i: boolean) => {
			set((state) => {
				state.isWelcome = i
			})
		},
		setIsNaturalOnly: (i: boolean) => {
			set((state) => {
				state.isNaturalOnly = i
			})
		},
		setIncludedClef: (i: string[]) => {
			set((state) => {
				state.includedClef = i
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

export default useExamConfig
