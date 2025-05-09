/* eslint-disable no-mixed-spaces-and-tabs */
import googleColors from "@/assets/colors/googleColors.ts";
import useBeatFunctionsConfig from "@/assets/stores/useBeatFunctionsConfig.ts";
import cssFunctions from "@/assets/styles/cssFunctions.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import {css} from "@emotion/react";
import {Mask, Slider} from "antd-mobile";
import {random} from "lodash";
import {useEffect, useState} from "react";

const SetBpmPopover = () => {
	const {isSetBpmMaskOpen, setIsSetBpmMaskOpen, bpm, setBpm} = useBeatFunctionsConfig()
	const [n1, setN1] = useState(Math.trunc(bpm))
	const [n2, setN2] = useState(bpm - Math.trunc(bpm))
	useEffect(() => {
		setBpm(parseFloat((n1 + n2).toFixed(1)))
	}, [n1, n2])

	useEffect(() => {
		const new_n1 = Math.trunc(bpm)
		const new_n2 = bpm - Math.trunc(bpm)
		setN1(new_n1)
		setN2(new_n2)
	}, [bpm]);
	return <>
		<div css={SetBpmPopover_css}>
			<Mask visible={isSetBpmMaskOpen}
			      style={{...cssPresets.flexCenter, ...cssPresets.defaultBlur}}
			      destroyOnClose={true}
			      onMaskClick={() => setIsSetBpmMaskOpen(false)}>
				<div className="current">
					<div className="title">BPM</div>
					<div className="bpm">{bpm}</div>
				</div>
				<div className="bar">
					<div className="number1">
						<div className={"title"}>整数部分</div>
						<Slider
							max={240}
							min={20}
							step={1}
							ticks={true}
							value={n1}
							style={{"--fill-color": googleColors.blue800}}
							range={false}
							onChange={(value) => setN1(value as any)}
						/>
					</div>
					<div className="number2">
						<Slider
							max={0.9}
							min={0}
							step={0.1}
							ticks={true}
							value={n2}
							style={{"--fill-color": googleColors.blue800}}
							range={false}
							onChange={(value) => setN2(value as any)}
						/>
						<div className={"title"}>小数微调</div>
					</div>
				</div>
				<div className="preset">
					<div style={{width: "100%", height: 60, ...cssPresets.flexCenter, color: googleColors.gray400}}>预设</div>
					<div className="inner_frame1">
						<div className="item1" style={{fontSize:28}} onClick={() => setN1(random(70, 120))}>随机</div>
						<div className="item1" onClick={() => setBpm(80)}>80</div>
						<div className="item1" onClick={() => setBpm(90)}>90</div>
						<div className="item1" onClick={() => setBpm(100)}>100</div>
						<div className="item1" onClick={() => setBpm(110)}>110</div>
						<div className="item1" onClick={() => setBpm(120)}>120</div>
					</div>
				</div>
			</Mask>
		</div>
	</>
}

export default SetBpmPopover

const SetBpmPopover_css = css({
	...cssPresets.flexCenter,
	flexDirection: "column",
	"& .current": {
		...cssPresets.flexCenter,
		flexDirection: "column",
		...cssPresets.mxAuto,
		...cssPresets.defaultBlur,
		width: 240,
		height: 110,
		backgroundColor: "white",
		borderRadius: 999,
		"& .title": {
			color: googleColors.blue400,
		},
		"& .bpm": {
			color: googleColors.blue800,
			fontSize: 45,
		}
	},
	"& .bar": {
		borderRadius: 18,
		marginTop: 25,
		...cssPresets.mxAuto,
		...cssFunctions.py(10),
		width: "calc(80vw)",
		maxWidth: 450,
		...cssPresets.flexCenter,
		flexDirection: "column",
		backgroundColor: "white",
		"& .title": {
			color: googleColors.gray700,
			fontSize: 16,
		},
		"& .number1": {
			width: "100%",
			...cssFunctions.px(25),
			...cssFunctions.py(10),
		},
		"& .number2": {
			width: "100%",
			...cssFunctions.px(25),
			...cssFunctions.py(10),
		}

	},
	"& .preset": {
		width: "calc(80vw)",
		marginTop: 25,
		borderRadius: 8,
		backgroundColor: "white",
		maxWidth: 450,
		paddingBottom: 25,
		"&>.inner_frame1": {
			width: "100%",
			...cssPresets.flex,
			flexWrap: "wrap",
			justifyContent: "center",
			gap: 10,
			"&>.item1": {
				width: 120,
				height: 60,
				color: googleColors.gray400,
				fontSize: 35,
				borderRadius: 8,
				backgroundColor: googleColors.gray200,
				...cssPresets.flexCenter,
				...cssPresets.transition,
				"&:active": {
					backgroundColor: googleColors.gray300,
					color: googleColors.gray500,
				}
			}
		}
	},
	"& .random_frame": {
		width: "100%",
		backgroundColor: "white",
		height: 40,
	}

})
