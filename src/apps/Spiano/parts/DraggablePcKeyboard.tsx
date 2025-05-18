/* eslint-disable no-mixed-spaces-and-tabs */
import MainKeyboardLayout from "@/apps/PcKeyboardPlay/parts/MainKeyboardLayout.tsx";
import googleColors from "@/assets/colors/googleColors.ts";
import useMIDIConfig from "@/assets/stores/useMIDIConfig.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import useMidiEvents from "@/utils/useMIDI/useMidiEvents.ts";
import {css} from "@emotion/react";
import {CloseCircleFill} from "antd-mobile-icons";
import delay from "delay";
import {isNull, isUndefined} from "lodash";
import {useEffect, useMemo, useState} from "react";
import Draggable from "react-draggable";
import {AiFillMinusCircle, AiOutlineClose} from "react-icons/ai";
import {BiLayerMinus, BiMinus, BiWindowClose} from "react-icons/bi";
import {BsArrowsMove} from "react-icons/bs";
import {CgClose} from "react-icons/cg";
import {FaKeyboard} from "react-icons/fa6";
import {GiHidden} from "react-icons/gi";

const DraggablePcKeyboard = () => {
	const {
		isPcKeyboardShow,
		isPcKeyboardShowButMini,
		setIsPcKeyboardShowButMini,
		setIsPcKeyboardShow
	} = useMIDIConfig()
	const {latestEvent} = useMidiEvents()
	const isNoteOn = useMemo(() => {
		if (isNull(latestEvent)) return false
		if (isUndefined(latestEvent)) return false
		return latestEvent['isNoteOn']
	}, [latestEvent])
	const [isDragging, setIsDragging] = useState(false)
	const [isSwitchMiniAllowed, setIsSwitchMiniAllowed] = useState(false)

	if (!isPcKeyboardShow) return;
	return <>
		<div css={DraggablePcKeyboard_css(isNoteOn, isPcKeyboardShowButMini)}>
			<Draggable
				handle=".handle"
				defaultPosition={{x: 0, y: 0}}
				scale={1}
				onDrag={() => {
					setIsDragging(true)
					setIsSwitchMiniAllowed(false)
				}}
				onStop={() => {
					setIsDragging(false)
					delay(10).then(() => setIsSwitchMiniAllowed(true))
				}}>
				<div className="handle">
					{isPcKeyboardShowButMini && <div
						className="mini_f"
						onTouchEnd={() => {
							if (isDragging) return;
							if (!isSwitchMiniAllowed) return;
							setIsPcKeyboardShowButMini(false)
						}}
						onClick={(e) => {
							if (isDragging) return;
							if (!isSwitchMiniAllowed) return;
							setIsPcKeyboardShowButMini(false)
						}}>
						<div className="mini_icon">
							<FaKeyboard color={googleColors.gray400} size={60}/>
							<div className="dot"></div>
						</div>
					</div>}
					{!isPcKeyboardShowButMini && <div className={"fakehandle"}>
						<div className="title_text">虚拟键盘演奏</div>
						<div className="func_btns">
							<div className="btn move_btn">
								<BsArrowsMove color={googleColors.green600} size={20}/>
							</div>
							<div className="btn mini_btn"
							     onTouchEnd={() => setIsPcKeyboardShowButMini(true)}
							     onClick={() => setIsPcKeyboardShowButMini(true)}>
								<BiMinus color={googleColors.amber600} size={20}/>
							</div>
							<div className="btn close_btn"
							     onTouchEnd={() => setIsPcKeyboardShow(false)}
							     onClick={() => setIsPcKeyboardShow(false)}>
								<CgClose color={googleColors.red200} size={20}/>
							</div>

						</div>
					</div>}
					<div className="kf">
						<MainKeyboardLayout borderRadius={"0 0 8px 8px"}/>
					</div>
				</div>
			</Draggable>
		</div>
	</>
}

export default DraggablePcKeyboard

const DraggablePcKeyboard_css = (isNoteOn: boolean, isPcKeyboardShowButMini: boolean) => css({
	height: 0,
	zIndex: 999,
	backgroundColor: "red",
	cursor: "move",
	"& .dot": {
		backgroundColor: isNoteOn ? googleColors.green300 : googleColors.gray500,
		scale: isNoteOn ? 1.1 : 1,
		width: 10,
		height: 10,
		borderRadius: 999,
		...cssPresets.mxAuto
	},
	"& .kf": {
		overflow: "hidden",
		maxWidth: isPcKeyboardShowButMini ? 0 : 999,
		maxHeight: isPcKeyboardShowButMini ? 0 : 999,
		scale: isPcKeyboardShowButMini ? 0 : 1,
	},
	"& .fakehandle": {
		width: "100%",
		backgroundColor: googleColors.gray600,
		...cssPresets.flexCenter,
		height: 40,
		borderRadius: "8px 8px 0 0",
		"& .title_text": {
			color: googleColors.gray50,
			marginLeft: 15
		},
		"& .func_btns": {
			...cssPresets.flexCenter,
			marginLeft: "auto",
			gap: 5,
			marginRight: 4,
			cursor: "pointer",
			"& .btn": {
				width: 80,
				height: 32,
				...cssPresets.flexCenter,
				fontSize: 60,
				borderRadius: 8,
			},
			"& .mini_btn": {
				color: googleColors.gray50,
				backgroundColor: googleColors.amber200
			},
			"& .move_btn": {
				color: googleColors.gray50,
				backgroundColor: googleColors.green300,
				cursor: "move",
			},
			"& .close_btn": {
				backgroundColor: googleColors.red300,
				"&:active": {
					backgroundColor: googleColors.red200,
				}
			}
		},

	},
	"& .mini_f": {
		width: 100,
		height: 100,
		backgroundColor: googleColors.gray600,
		borderRadius: 18,
		...cssPresets.flexCenter,

	}
})
