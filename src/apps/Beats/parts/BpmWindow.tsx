/* eslint-disable no-mixed-spaces-and-tabs */
import DetectBpmPopover from "@/apps/Beats/components/DetectBpmPopover.tsx";
import SetBpmPopover from "@/apps/Beats/components/SetBpmPopover.tsx";
import googleColors from "@/assets/colors/googleColors.ts";
import useMetronome from "@/assets/instruments/metronome/useMetronome.ts";
import useBeatFunctionsConfig from "@/assets/stores/useBeatFunctionsConfig.ts";
import cssFunctions from "@/assets/styles/cssFunctions.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import useSwipeX from "@/utils/useSwipeX.ts";
import useSwipeY from "@/utils/useSwipeY.ts";
import {css} from "@emotion/react";
import {useEffect, useMemo, useState} from "react";
import {BiPlay, BiStop, BiStopCircle} from "react-icons/bi";
import {BsSpeedometer2} from "react-icons/bs";
import {CgSearchLoading} from "react-icons/cg";
import {GiSpeedBoat, GiSpeedometer} from "react-icons/gi";
import {GrNext} from "react-icons/gr";
import {IoReload, IoReloadCircle, IoSpeedometerOutline} from "react-icons/io5";
import {MdSpeed} from "react-icons/md";
import {RiSpeedLine} from "react-icons/ri";
import {SiSpeedtest} from "react-icons/si";
import {SlSpeedometer} from "react-icons/sl";
import {TbReload} from "react-icons/tb";
import * as music12 from "@/music12"

const BpmWindow = () => {
	const {bpm, setBpm} = useBeatFunctionsConfig()
	const {
		isMetronomePlaying,
		setIsMetronomePlaying,
		beatIndexOfMeasure,
		isSetBpmMaskOpen,
		setIsDetectBpmMaskOpen,
		setIsSetBpmMaskOpen
	} = useBeatFunctionsConfig()
	const {startPlayback, stopPlayback, currentStrongType, measureLength} = useMetronome()
	const swipeTrigger = (i: boolean) => {
		if (i) {
			if (bpm < 240) return setBpm(bpm + 1)
			return setBpm(240)
		}
		if (bpm > 20) {
			return setBpm(bpm - 1)
		}
		setBpm(20)
	}

	const uy = useSwipeY({onSwipeTrigger: swipeTrigger})
	return <>
		<SetBpmPopover/>
		<DetectBpmPopover/>
		<div css={BpmWindow_css}>
			<div className="show" {...uy.handlers}>
				<div className={"title"}>BPM</div>
				<div className="bpm">{bpm}</div>
			</div>
			<div className="controler">
				<div className="f" onClick={() => window.location.reload()}>
					<TbReload size={30} color={googleColors.blue800}/>
				</div>
				<div className="f" onClick={() => setIsDetectBpmMaskOpen(true)}>
					<CgSearchLoading size={30} color={googleColors.blue800}/>
				</div>
				<div className="f" onClick={() => setIsSetBpmMaskOpen(true)}>
					<SiSpeedtest size={26} color={googleColors.blue800}/>
				</div>
				<div className="f" onClick={async () => {
					if (!isMetronomePlaying) {
						setIsMetronomePlaying(!isMetronomePlaying)
						startPlayback()
						return;
					}
					setIsMetronomePlaying(!isMetronomePlaying)
					await stopPlayback()
				}}>
					<div css={play_css(isMetronomePlaying)}>
						{!isMetronomePlaying && <BiPlay size={40} color={googleColors.blue800}/>}
						{isMetronomePlaying && <BiStop size={45} color={googleColors.red300}/>}
					</div>

				</div>
			</div>

		</div>
	</>
}

export default BpmWindow

const BpmWindow_css = css({
	...cssPresets.flexCenter,
	width: "100%",
	maxWidth: 350,
	...cssPresets.mxAuto,
	marginTop: 20,
	marginBottom: 20,
	overflow: "hidden",
	height: 120,
	"& .show": {
		width: "60%",
		height: "100%",
		borderRadius: 18,
		backgroundColor: "white",
		...cssPresets.flexCenter,
		flexDirection: "column",
		"& .title": {
			fontSize: 14,
			color: googleColors.blue300,
		},
		"& .bpm": {
			fontSize: 60,
			color: googleColors.blue800
		}
	},
	"& .controler": {
		width: "40%",
		...cssPresets.flexCenter, flexWrap: "wrap",
		borderRadius: 16,
		overflow: "hidden",
		marginLeft: 10,
		"&>.f": {
			width: "calc(50%)",
			height: 60,
			backgroundColor: "white",
			cursor: "pointer",
			// backgroundColor: googleColors.green200,
			...cssPresets.flexCenter,
			border: "1px solid " + googleColors.gray200,
			...cssPresets.transition,
			"&:active": {
				backgroundColor: googleColors.gray200
			}
		}
	}

})


const play_css = (isPlaying: boolean) => css({
	backgroundColor: isPlaying ? googleColors.red50 : googleColors.blue50,
	width: "100%",
	height: "100%",
	...cssPresets.flexCenter,
	...cssPresets.transition,
})
