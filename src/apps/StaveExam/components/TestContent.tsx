/* eslint-disable no-mixed-spaces-and-tabs */
import useStaveExam from "@/apps/StaveExam/useStaveExam.ts";
import googleColors from "@/assets/colors/googleColors.ts";
import useExamConfig from "@/assets/stores/useExamConfig.ts";
import useGlobalSettings from "@/assets/stores/useGlobalSettings.ts";
import cssFunctions from "@/assets/styles/cssFunctions.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import NoteSymbol from "@/components/reNote/NoteSymbol/NoteSymbol.tsx";
import NoteText from "@/components/reNote/NoteText/NoteText.tsx";
import StaveWithOneNote from "@/components/reStave/StaveWindow/StaveWithOneNote.tsx";
import {css} from "@emotion/react";
import {Button} from "antd-mobile";
import {LeftOutline} from "antd-mobile-icons";
import {min} from "lodash";
import {useState} from "react";
import {GiJumpAcross} from "react-icons/gi";
import {useWindowSize} from "react-use";

const TestContent = () => {
	const {setIsWelcome} = useExamConfig()
	const {width} = useWindowSize()
	const {naviBarHeight} = useGlobalSettings()
	const {genQuestion} = useStaveExam()
	const [examQuestion, setExamQuestion] = useState(genQuestion())
	const [answerAlter, setAnswerAlter] = useState(0)
	const [answerStep, setAnswerStep] = useState("C")
	const [isAnswered, setIsAnswered] = useState(false)
	const [isAnsweredRight, setIsAnsweredRight] = useState(false)

	const handleSubmitQuestion = () => {
		setIsAnswered(true)
		if (examQuestion.step === answerStep && examQuestion.alter === answerAlter) {
			setIsAnsweredRight(true)
			return
		}
		setIsAnsweredRight(false)
	}
	// useEffect(() => {
	// 	genQuestion()
	// }, [])
	const jump_question = () => {
		setIsAnswered(false)
		let newQuestion = genQuestion()
		while (newQuestion.step === examQuestion.step && newQuestion.alter === examQuestion.alter) {
			newQuestion = genQuestion()
		}
		setExamQuestion(newQuestion)
	}
	return <>
		<div css={TestContent_css({naviBarHeight, width})}>
			<div className="top_title">
				<div className="exit_exam" onClick={() => setIsWelcome(true)}>
					<LeftOutline color={googleColors.red50} style={{marginRight: 3}}/>
					<div>
						退出
					</div>
				</div>
				<div className="jump_question" onClick={jump_question}>
					<GiJumpAcross size={25} color={googleColors.blue50} style={{marginRight: 8}}/>
					<div>
						跳过本题
					</div>
				</div>
			</div>
			<StaveWithOneNote w={min([width, 400])} clef={examQuestion.clef}
			                  keys={examQuestion.alterKey}
			                  step={examQuestion.step} alter={examQuestion.alter} octave={examQuestion.octave}/>

			<div className="sbm">
				<div className="alter_opt">
					<div className="each_opt"
					     css={alter_css(answerAlter === 0)}
					     onClick={() => setAnswerAlter(0)}>
						<NoteSymbol color={answerAlter === 0 ? googleColors.blue800 : googleColors.gray400} alter={0}/>
					</div>
					<div className="each_opt"
					     css={alter_css(answerAlter === 1)}
					     onClick={() => setAnswerAlter(1)}>
						<NoteSymbol color={answerAlter === 1 ? googleColors.blue800 : googleColors.gray400} alter={1}/>
					</div>
					<div className="each_opt"
					     css={alter_css(answerAlter === -1)}
					     onClick={() => setAnswerAlter(-1)}>
						<NoteSymbol
							color={answerAlter === -1 ? googleColors.blue800 : googleColors.gray400}
							alter={-1}/>
					</div>
				</div>
				<div className="step_opt">
					{["C", "D", "E", "F", "G", "A", "B"].map((step, i) => <div
						key={i}
						onClick={() => setAnswerStep(step)}
						css={alter_css(answerStep === step)}
						className="each_step">{step}</div>)}
				</div>
			</div>

			{!isAnswered && <div className="submit_btn" onClick={handleSubmitQuestion}>
				查看答案
			</div>}
			{isAnswered && isAnsweredRight && <div className="answer_right">
				<div className={"answer_right_text"}>答对了</div>
				<div className={"more"} onClick={jump_question}>再来一道</div>
			</div>}
			{isAnswered && !isAnsweredRight && <div className="answer_right">
				<div className={"answer_wrong_text"}>答错了</div>
				<div className={"correct_answer"}>
					<div>正确答案是</div>
					<NoteText color={googleColors.blue800} fontSize={20} step={examQuestion.step} alter={examQuestion.alter}/>
				</div>
				<div className={"more"} onClick={jump_question}>再来一道</div>
			</div>}
		</div>
	</>
}

export default TestContent

const TestContent_css = (i: {
	naviBarHeight: number,
	width: number
}) => css({
	...cssPresets.flexCenter,
	flexDirection: "column",
	height: `calc(100vh - ${i.naviBarHeight}px)`,
	"& .top_title": {
		width: "100%",
		maxWidth: min([400, i.width]),
		...cssFunctions.px(10),
		...cssPresets.flexCenter,
		justifyContent: "space-between",
		"& .exit_exam": {
			...cssPresets.flexCenter,
			width: 80,
			height: 40,
			cursor: "pointer",
			backgroundColor: googleColors.red500,
			borderRadius: 999,
			color: googleColors.red50
		}, "& .jump_question": {
			...cssPresets.flexCenter,
			width: 140,
			height: 40,
			cursor: "pointer",
			backgroundColor: googleColors.blue800,
			borderRadius: 999,
			color: googleColors.blue50,
			"&:active": {
				backgroundColor: googleColors.blue700,
			}
		},
	},
	"& .sbm": {
		...cssPresets.flexCenter,
		flexDirection: "column",
		"& .alter_opt": {
			...cssPresets.flexCenter,
			width: 150,
			borderRadius: 10,
			overflow: "hidden",
			marginTop: 20,
			"& .each_opt": {
				...cssPresets.flexCenter,
				padding: 10,
				cursor: "pointer",
				width: 50,
				height: 50,
			}, "& .each_opt:not(:first-of-type)": {
				borderLeft: `1px solid ${googleColors.gray300}`
			},
		},
		"& .step_opt": {
			...cssPresets.flexCenter,
			width: 50 * 7,
			borderRadius: 10,
			overflow: "hidden",
			marginTop: 10,
			"& .each_step": {
				...cssPresets.flexCenter,
				cursor: "pointer",
				width: 50,
				height: 50,
				fontSize: 25
			}, "& .each_step:not(:first-of-type)": {
				borderLeft: `1px solid ${googleColors.gray300}`
			},
		}
	},
	"& .submit_btn": {
		...cssPresets.flexCenter,
		width: 150,
		height: 50,
		borderRadius: 10,
		backgroundColor: googleColors.blue800,
		color: googleColors.blue50,
		marginTop: 20,
		cursor: "pointer",
		"&:active": {
			backgroundColor: googleColors.blue700,
		}
	},
	"& .more": {
		cursor: "pointer",
		color: googleColors.blue50,
		marginTop: 10,
		...cssFunctions.px(35),
		...cssFunctions.py(10),
		...cssPresets.flexCenter,
		borderRadius: 999,
		backgroundColor: googleColors.blue800,
	},
	"& .answer_right_text": {
		color: googleColors.blue800,
		marginTop: 15,
		fontSize: 25,
	},
	"& .answer_wrong_text": {
		color: googleColors.red800,
		marginTop: 15,
		fontSize: 25,
	}, "& .correct_answer": {
		...cssPresets.flexCenter,
		marginTop:5,
		color: googleColors.blue800,
		"& div": {
			fontSize: 20,
		}
	},
})

const alter_css = (isSelected: boolean) => css({
	backgroundColor: isSelected ? googleColors.blue50 : "white",
	color: isSelected ? googleColors.blue800 : googleColors.gray400,
})
