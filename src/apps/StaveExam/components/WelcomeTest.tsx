/* eslint-disable no-mixed-spaces-and-tabs */
import GetAlterText from "@/apps/MobileKSQuery/useMobileKs/getAlterText.ts";
import googleColors from "@/assets/colors/googleColors.ts";
import cssFunctions from "@/assets/styles/cssFunctions.ts";
import NoteSymbol from "@/components/reNote/NoteSymbol/NoteSymbol.tsx";
import ClefC from "@/components/reStave/clefSvgs/ClefC.tsx";
import ClefF from "@/components/reStave/clefSvgs/ClefF.tsx";
import ClefG from "@/components/reStave/clefSvgs/ClefG.tsx";
import {css} from "@emotion/react";
import {Button} from "antd-mobile";
import cssPresets from "@/assets/styles/cssPresets.ts";
import useGlobalSettings from "@/assets/stores/useGlobalSettings.ts";
import useExamConfig from "@/assets/stores/useExamConfig.ts";
import {range} from "lodash";
import {useEffect} from "react";


const WelcomeTest = () => {
	const {naviBarHeight} = useGlobalSettings()
	const {setIsWelcome, includedClef, setIncludedClef, includedAltersList, setIncludedAltersList} = useExamConfig()
	const handleClickClef = (clef_string: string) => {
		if (!includedClef.includes(clef_string)) {
			return setIncludedClef([...includedClef, clef_string])
		}
		if (includedClef.length > 1) {
			return setIncludedClef(includedClef.filter((i) => i !== clef_string))
		}
	}
	useEffect(() => {
		if (includedAltersList.length === 0) setIncludedAltersList([0])
	}, [includedAltersList])

	const handleClickAlter = (alter: number, isSharp: boolean) => {
		if (alter === 0) {
			if (isSharp) {
				if (includedAltersList.filter(x => x > 0).length === 0) {
					return setIncludedAltersList([...includedAltersList, ...range(1, 8)])
				}
				return setIncludedAltersList([...includedAltersList].filter(x => x <= 0))
			}
			if (!isSharp) {
				if (includedAltersList.filter(x => x < 0).length === 0) {
					return setIncludedAltersList([...includedAltersList, ...range(-7, 0)])
				}
			}
			return setIncludedAltersList([...includedAltersList].filter(x => x >= 0))
		}

		if (includedAltersList.includes(alter)) {
			return setIncludedAltersList([...includedAltersList].filter(x => x !== alter))
		}

		return setIncludedAltersList([...includedAltersList, alter])
	}
	return <>
		<div css={WelcomeTest_css({naviBarHeight, includedClef, includedAltersList})}>
			<div className="opt_title">
				谱号出题范围
			</div>
			<div className="clef">
				<div className="each_clef clef_g" onClick={() => handleClickClef("G")}>
					<ClefG color={includedClef.includes("G") ? googleColors.blue800 : googleColors.gray500}/>
				</div>
				{/*<div className="each_clef clef_c" onClick={() => handleClickClef("C")}>*/}
				{/*	<ClefC color={includedClef.includes("C") ? googleColors.blue800 : googleColors.gray500}/>*/}
				{/*</div>*/}
				<div className="each_clef clef_f" onClick={() => handleClickClef("F")}>
					<ClefF color={includedClef.includes("F") ? googleColors.blue800 : googleColors.gray500}/>
				</div>
			</div>
			<div className="opt_title">
				乐谱升降号出题范围
			</div>
			<div className="alters">
				<div className="line alter0" onClick={() => {
					if (includedAltersList.includes(0)) {
						return setIncludedAltersList([...includedAltersList].filter(x => x !== 0))
					}
					setIncludedAltersList([...includedAltersList, 0])
				}}>
					<NoteSymbol color={includedAltersList.includes(0) ? googleColors.blue800 : googleColors.gray500} alter={0}/>
				</div>
				<div className="line alter_plus">
					<div className="alter1" onClick={() => handleClickAlter(0, true)}>
						<NoteSymbol
							color={includedAltersList.filter(x => x > 0).length > 0 ? googleColors.blue800 : googleColors.gray500}
							alter={1}/>
					</div>
					{range(1, 8).map(i => <div className="alter_plus_item"
					                           onClick={() => handleClickAlter(i, true)}
					                           css={alter_css(includedAltersList.includes(i))}
					                           key={i}>{i}</div>)}
				</div>
				<div className="line alter_minus">
					<div className="alter2" onClick={() => handleClickAlter(0, false)}>
						<NoteSymbol
							color={includedAltersList.filter(x => x < 0).length > 0 ? googleColors.blue800 : googleColors.gray500}
							alter={-1}/>
					</div>
					{range(1, 8).map(i => <div className="alter_plus_item"
					                           onClick={() => handleClickAlter(-i, false)}
					                           css={alter_css(includedAltersList.includes(-i))}
					                           key={i}>{i}</div>)}
				</div>
			</div>

			<div className="go" onClick={() => setIsWelcome(false)}>
				开始测试
			</div>
		</div>
	</>
}

export default WelcomeTest

const WelcomeTest_css = (i: { naviBarHeight: number, includedClef: string[], includedAltersList: number[] }) => css({
	...cssPresets.flexCenter,
	flexDirection: "column",
	width: "100%",
	height: `calc(100vh - ${i.naviBarHeight}px)`,
	"& .opt_title": {
		marginTop: 25, marginBottom: 5,
		backgroundColor: "white",
		...cssFunctions.px(15),
		...cssFunctions.py(5),
		borderRadius: 999
	},
	"& .go": {
		backgroundColor: googleColors.blue800,
		marginTop: 40,
		...cssFunctions.px(25),
		...cssFunctions.py(10),
		borderRadius: 999,
		cursor: "pointer",
		fontSize: 20,
		color: googleColors.blue50,
		"&:active": {
			backgroundColor: googleColors.blue600,
			color: googleColors.blue200
		}
	},
	"& .clef": {
		...cssPresets.flexCenter, borderRadius: 8,
		border: `1px solid ${googleColors.gray300}`,
		overflow: "hidden",
		"& .each_clef": {
			width: 80, height: 80,
			cursor: "pointer",
		},
		"& .each_clef:not(:first-of-type)": {
			borderLeft: `1px solid ${googleColors.gray300}`
		},
		"& .clef_g": {
			padding: 15,
			backgroundColor: i.includedClef.includes("G") ? googleColors.blue50 : googleColors.gray300,
		},
		"& .clef_c": {
			padding: 20,
			backgroundColor: i.includedClef.includes("C") ? googleColors.blue50 : googleColors.gray300,
		},
		"& .clef_f": {
			padding: 20,
			backgroundColor: i.includedClef.includes("F") ? googleColors.blue50 : googleColors.gray300,
		}
	},
	"& .alters": {
		...cssPresets.flexCenter,
		flexDirection: "column",
		borderRadius: 10,
		overflow: "hidden",
		border: `1px solid ${googleColors.gray300}`,
		width: 350,
		"& .line": {
			...cssPresets.flexCenter,
			minWidth: 350,
			height: 50,
			"& .alter1": {
				maxWidth: 50,
				minWidth: 50,
				height: 50,
				...cssPresets.flexCenter,
				padding: 10,
				backgroundColor: i.includedAltersList.filter(x => x > 0).length > 0 ? googleColors.blue50 : googleColors.gray300,
			}, "& .alter2": {
				maxWidth: 50,
				minWidth: 50,
				height: 50,
				...cssPresets.flexCenter,
				padding: 10,
				backgroundColor: i.includedAltersList.filter(x => x < 0).length > 0 ? googleColors.blue50 : googleColors.gray300,

			},
		},
		"& .alter_plus_item": {
			...cssPresets.flexCenter,
			minWidth: 300 / 7,
			maxWidth: 300 / 7,
			height: 50,
		},
		"& .alter_plus_item:not(:first-of-type)": {
			borderLeft: `1px solid ${googleColors.gray300}`,
		},
		"& .alter0": {
			width: 350,
			height: 50,
			padding: 12,
			cursor: "pointer",
			backgroundColor: i.includedAltersList.includes(0) ? googleColors.blue50 : googleColors.gray300,
			borderBottom: `1px solid ${googleColors.gray300}`,
		},
		"& .alter_plus": {
			padding: 10,
			borderBottom: `1px solid ${googleColors.gray300}`,
		}
	}
})


const alter_css = (isSelected: boolean) => css({
	backgroundColor: isSelected ? googleColors.blue50 : googleColors.gray300,
	color: isSelected ? googleColors.blue800 : googleColors.gray400,
	cursor: "pointer",
	fontSize: isSelected ? 25 : 22,
})
