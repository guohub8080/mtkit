// noinspection ES6PreferShortImport

import useExamConfig from "@/assets/stores/useExamConfig.ts";
import collect from "collect.js";

const useStaveExam = () => {
	const {includedClef, includedAltersList} = useExamConfig()
	const genQuestion = () => {
		const clef = collect(includedClef).random().toString()
		const alterKey = Number(collect(includedAltersList).random())
		const step = collect(["C", "D", "E", "F", "G", "A", "B"]).random().toString()
		let octave: number
		let alter: number
		if (['B', "E"].includes(step)) {
			alter = Number(collect([-1, 0]).random())
		} else if (['C', "F"].includes(step)) {
			alter = Number(collect([0, 1]).random())
		} else {
			alter = Number(collect([-1, 0, 1]).random())
		}

		if (["G", "H"].includes(clef)) {
			if (["C", "D", "E"].includes(step)) {
				octave = Number(collect([4, 5, 6]).random())
			} else if (["F"].includes(step)) {
				octave = Number(collect([3, 4, 5, 6]).random())
			} else if (["G", "A", "B"].includes(step)) {
				octave = Number(collect([3, 4, 5]).random())
			}
		} else if (["L", "F"].includes(clef)) {
			if (["C", "D", "E", "F", "G"].includes(step)) {
				octave = Number(collect([2, 3]).random())
			} else if (["A"].includes(step)) {
				octave = Number(collect([1, 2, 3, 4]).random())
			} else if (["B"].includes(step)) {
				octave = Number(collect([1, 2, 3]).random())
			}
		}
		return {
			clef,
			step,
			alter,
			alterKey,
			octave
		}
	}
	return {genQuestion}
}

export default useStaveExam
