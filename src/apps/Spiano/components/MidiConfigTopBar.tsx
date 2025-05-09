/* eslint-disable no-mixed-spaces-and-tabs */
import MidiConfigPopover from "@/apps/Spiano/components/MidiConfigPopover.tsx";
import googleColors from "@/assets/colors/googleColors.ts";
import useInstrument from "@/assets/instruments/useInstrument.ts";
import useMIDIConfig from "@/assets/stores/useMIDIConfig.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import warningToast from "@/utils/warningToast.tsx";
import {css} from "@emotion/react";
import {SpinLoading} from "antd-mobile";
import toast, {Toaster} from "react-hot-toast";
import {AiFillSound} from "react-icons/ai";
import {BiHide} from "react-icons/bi";
import {FaVolumeMute} from "react-icons/fa";
import {IoReloadOutline, IoSettingsOutline} from "react-icons/io5";
import {MdPiano} from "react-icons/md";
import {RiSearchEyeFill} from "react-icons/ri";
import {TbListNumbers} from "react-icons/tb";

const unActiveBgColor = googleColors.gray400
const unActiveMainColor = googleColors.gray500
const activeMainColor = googleColors.blue800
const MidiConfigTopBar = () => {
	const {
		isMidiKeyStrokeSoundOn,
		setIsMidiKeyStrokeSoundOn,
		setIsMidiConfigPopoverOpen,
		isMidiConfigPopoverOpen,
		isMidiEventListShow,
		setIsMidiEventListShow,
		isPianoKeyboardShow,
		setIsPianoKeyboardShow,
		isAnalyzeShow,
		setIsAnalyzeShow,
	} = useMIDIConfig()
	const {isLoaded} = useInstrument()

	const toggleMidiEventListShow = () => {
		if (isMidiEventListShow) {
			toast.success("MIDI事件列表已关闭", {duration: 800})
		} else {
			toast.success("MIDI事件列表已开启", {duration: 800})
		}
		setIsMidiEventListShow(!isMidiEventListShow)
	}

	const toggleStrokeSound = () => {
		if (!isLoaded) {
			warningToast("声音库未加载完成")
			return;
		}
		if (isMidiKeyStrokeSoundOn) {
			toast.success("MIDI按键音效已关闭", {duration: 800})
		} else {
			toast.success("MIDI按键音效已开启", {duration: 800})
		}
		setIsMidiKeyStrokeSoundOn(!isMidiKeyStrokeSoundOn)
	}

	const togglePianoKeyboard = () => {
		if (isPianoKeyboardShow) {
			toast.success("钢琴键盘已关闭", {duration: 800})
		} else {
			toast.success("钢琴键盘已开启", {duration: 800})
		}
		setIsPianoKeyboardShow(!isPianoKeyboardShow)
	}
	const toggleAnalyze = () => {
		if (isAnalyzeShow) {
			toast.success("按键分析已关闭", {duration: 800})
		} else {
			toast.success("按键分析已开启", {duration: 800})
		}
		setIsAnalyzeShow(!isAnalyzeShow)
	}
	return <>
		<Toaster/>
		<MidiConfigPopover/>
		<div
			css={MidiConfigTopBar_css(isMidiKeyStrokeSoundOn, isMidiEventListShow, isLoaded, isPianoKeyboardShow, isAnalyzeShow)}>
			<div className="icon analyse" onClick={toggleAnalyze}>
				{isAnalyzeShow && <RiSearchEyeFill size={25} color={activeMainColor}/>}
				{!isAnalyzeShow && <BiHide size={22} color={unActiveMainColor}/>}
			</div>
			<div className="icon piano_frame" onClick={togglePianoKeyboard}>
				<MdPiano size={22} color={isPianoKeyboardShow ? activeMainColor : unActiveMainColor}/>
			</div>
			<div className="icon event_list" onClick={toggleMidiEventListShow}>
				<TbListNumbers size={22} color={isMidiEventListShow ? activeMainColor : unActiveMainColor}/>
			</div>
			<div className="icon sound" onClick={toggleStrokeSound}>
				{!isLoaded && <SpinLoading style={{width: 20, height: 20}}/>}
				{isLoaded && isMidiKeyStrokeSoundOn && <AiFillSound color={activeMainColor} size={20}/>}
				{isLoaded && !isMidiKeyStrokeSoundOn && <FaVolumeMute size={20} color={unActiveMainColor}/>}
			</div>
			<div className="icon reload" onClick={() => window.location.reload()}>
				<IoReloadOutline size={20} color={googleColors.blue800}/>
			</div>
			<div className="icon settings" onClick={() => setIsMidiConfigPopoverOpen(true)}>
				<IoSettingsOutline size={22} color={googleColors.blue800}/>
			</div>
		</div>
	</>
}

export default MidiConfigTopBar

const MidiConfigTopBar_css = (isMidiKeyStrokeSoundOn: boolean,
                              isMidiEventListShow: boolean,
                              isLoaded: boolean,
                              isPianoKeyboardShow: boolean,
                              isAnalyzeShow: boolean) => css({
	width: "100%",
	height: 60,
	// backgroundColor: googleColors.green100,
	...cssPresets.flexCenter,
	gap: 15,
	"&>div": {
		height: 40
	},
	"& .na": {
		...cssPresets.flexCenter, backgroundColor: "white",
		gap: 5,
		...cssPresets.transition,
		width: 250,
		"&:active": {
			backgroundColor: googleColors.gray200,
		}
	},
	"& .icon": {
		...cssPresets.flexCenter,
		cursor: "pointer",
		width: 40,
		maxWidth: 40,
		borderRadius: 999,
		minWidth: 40,
		border: `1px solid ${activeMainColor}`,
		...cssPresets.transition,
		"&:active": {
			transform: "scale(0.9)"
		},
	},
	"& .sound": {
		fontSize: 20,
		border: `1px solid ${!isLoaded ? unActiveBgColor : isMidiKeyStrokeSoundOn ? activeMainColor : googleColors.gray500}`,
		...cssPresets.flexCenter,
		backgroundColor: !isLoaded ? unActiveBgColor : isMidiKeyStrokeSoundOn ? "white" : unActiveBgColor,
	},
	"& .analyse": {
		fontSize: 20,
		border: `1px solid ${isAnalyzeShow ? activeMainColor : googleColors.gray500}`,
		...cssPresets.flexCenter,
		backgroundColor: isAnalyzeShow ? "white" : unActiveBgColor,
	},
	"& .piano_frame": {
		fontSize: 20,
		border: `1px solid ${isPianoKeyboardShow ? activeMainColor : googleColors.gray500}`,
		...cssPresets.flexCenter,
		backgroundColor: isPianoKeyboardShow ? "white" : unActiveBgColor,
	},
	"& .settings": {
		fontSize: 20,
		border: `1px solid ${isPianoKeyboardShow ? activeMainColor : googleColors.gray500}`,
		...cssPresets.flexCenter,
		backgroundColor: googleColors.blue100,
	},
	"& .event_list": {
		fontSize: 20,
		border: `1px solid ${isMidiEventListShow ? activeMainColor : googleColors.gray500}`,
		...cssPresets.flexCenter,
		backgroundColor: isMidiEventListShow ? "white" : unActiveBgColor,
	},
	"& .reload": {
		backgroundColor: googleColors.blue100
	}
})
