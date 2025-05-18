/* eslint-disable no-mixed-spaces-and-tabs */
import OneKey from "@/apps/PcKeyboardPlay/components/OneKey.tsx";
import usePcKeyStroke from "@/apps/PcKeyboardPlay/usePcKeyStroke.ts";
import googleColors from "@/assets/colors/googleColors.ts";
import cssFunctions from "@/assets/styles/cssFunctions.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import NoteByLocation from "@/components/reNote/NoteByLocation/NoteByLocation.tsx";
import byDefault from "@/utils/byDefault.ts";
import useMidiEvents from "@/utils/useMIDI/useMidiEvents.ts";
import useMIDIPorts from "@/utils/useMIDI/useMIDIPorts.ts";
import {css} from "@emotion/react";
import {useEffect} from "react";

const MainKeyboardLayout = (props: {
	borderRadius?: string
}) => {
	const {keyMap} = usePcKeyStroke()
	const borderRadius = byDefault(props.borderRadius, 8)
	return <>
		<div css={MainKeyboardLayout_css(borderRadius)}>
			<div className="line line1">
				<OneKey
					bgColor={keyMap["`"].isPressed ? keyMap["`"].PressedBackgroundColor : keyMap["`"].UnPressedBackgroundColor}>
					<div className="k">
						<div className="u">`~</div>
						<div className="d">上3</div>
					</div>
				</OneKey>
				<OneKey
					k={'1'}
					bgColor={keyMap["1"].isPressed ? keyMap["1"].PressedBackgroundColor : keyMap["1"].UnPressedBackgroundColor}>
					<div className="k">
						<div className="u">1</div>
						<div className="d">上4</div>
					</div>
				</OneKey>
				<OneKey k={"2"}
				        bgColor={keyMap["2"].isPressed ? keyMap["2"].PressedBackgroundColor : keyMap["2"].UnPressedBackgroundColor}
				>
					<div className="k">
						<div className="u">2</div>
						<div className="d">上5</div>
					</div>
				</OneKey>
				<OneKey k={"3"}
				        bgColor={keyMap["3"].isPressed ? keyMap["3"].PressedBackgroundColor : keyMap["3"].UnPressedBackgroundColor}

				>
					<div className="k">
						<div className="u">3</div>
						<div className="d">上6</div>
					</div>
				</OneKey>
				<OneKey k={"4"}
				        bgColor={keyMap["4"].isPressed ? keyMap["4"].PressedBackgroundColor : keyMap["4"].UnPressedBackgroundColor}
				>
					<div className="k">
						<div className="u">4</div>
						<div className="d">上7</div>
					</div>
				</OneKey>
				<OneKey k={"5"}
				        bgColor={keyMap["5"].isPressed ? keyMap["5"].PressedBackgroundColor : keyMap["5"].UnPressedBackgroundColor}
				>
					<div className="k">
						<div className="u">5</div>
						<div className="d">上8</div>
					</div>
				</OneKey>
				<OneKey k={"6"}>
					6
				</OneKey>
				<OneKey
					k={"7"}
					bgColor={keyMap["7"].isPressed ? keyMap["7"].PressedBackgroundColor : keyMap["7"].UnPressedBackgroundColor}>
					<div className="k">
						<div className="u">7</div>
						<div className="d">
						</div>
					</div>
				</OneKey>
				<OneKey k={"8"}
				        bgColor={keyMap["8"].isPressed ? keyMap["8"].PressedBackgroundColor : keyMap["8"].UnPressedBackgroundColor}
				>
					<div className="k">
						<div className="u">8</div>
						<div className="d">
						</div>
					</div>
				</OneKey>
				<OneKey k={"9"}

				>
					9
				</OneKey>
				<OneKey k={"0"}
				        bgColor={keyMap["0"].isPressed ? keyMap["0"].PressedBackgroundColor : keyMap["0"].UnPressedBackgroundColor}
				>

					<div className="k">
						<div className="u">0</div>
						<div className="d">
						</div>
					</div>
				</OneKey>
				<OneKey k={"-"}
				        bgColor={keyMap["-"].isPressed ? keyMap["-"].PressedBackgroundColor : keyMap["-"].UnPressedBackgroundColor}
				>
					<div className="k">
						<div className="u">—</div>
						<div className="d">
						</div>
					</div>
				</OneKey>
				<OneKey k={"="}
				        bgColor={keyMap["="].isPressed ? keyMap["="].PressedBackgroundColor : keyMap["="].UnPressedBackgroundColor}
				>
					<div className="k">
						<div className="u">=+</div>
						<div className="d">
						</div>
					</div>
				</OneKey>
				<OneKey w={95}>
					←
				</OneKey>
			</div>
			<div className="line line2">
				<OneKey w={60}>
					Tab
				</OneKey>
				<OneKey k={'q'}
				        bgColor={keyMap["q"].isPressed ? keyMap["q"].PressedBackgroundColor : keyMap["q"].UnPressedBackgroundColor}
				>
					<div className="k">
						<div className="u">Q</div>
						<div className="d">
							下2
						</div>
					</div>
				</OneKey>
				<OneKey
					k={"w"}
					bgColor={keyMap["w"].isPressed ? keyMap["w"].PressedBackgroundColor : keyMap["w"].UnPressedBackgroundColor}>
					<div className="k">
						<div className="u">W</div>
						<div className="d">
							下3
						</div>
					</div>
				</OneKey>
				<OneKey
					k={"e"}
					bgColor={keyMap["e"].isPressed ? keyMap["e"].PressedBackgroundColor : keyMap["e"].UnPressedBackgroundColor}>
					<div className="k">
						<div className="u">E</div>
						<div className="d">
							下4
						</div>
					</div>
				</OneKey>
				<OneKey
					k={"r"}
					bgColor={keyMap["r"].isPressed ? keyMap["r"].PressedBackgroundColor : keyMap["r"].UnPressedBackgroundColor}>
					<div className="k">
						<div className="u">R</div>
						<div className="d">
							下5
						</div>
					</div>
				</OneKey>
				<OneKey k={"t"}>
					T
				</OneKey>
				<OneKey
					k={"y"}
					bgColor={keyMap["y"].isPressed ? keyMap["y"].PressedBackgroundColor : keyMap["y"].UnPressedBackgroundColor}>
					<div className="k">
						<div className="u">Y</div>
						<div className="d">C</div>
					</div>
				</OneKey>
				<OneKey
					k={"u"}
					bgColor={keyMap["u"].isPressed ? keyMap["u"].PressedBackgroundColor : keyMap["u"].UnPressedBackgroundColor}>
					<div className="k">
						<div className="u">U</div>
						<div className="d">D</div>
					</div>
				</OneKey>
				<OneKey
					k={"i"}
					bgColor={keyMap["i"].isPressed ? keyMap["i"].PressedBackgroundColor : keyMap["i"].UnPressedBackgroundColor}>
					<div className="k">
						<div className="u">I</div>
						<div className="d">E</div>
					</div>
				</OneKey>
				<OneKey
					k={"o"}
					bgColor={keyMap["o"].isPressed ? keyMap["o"].PressedBackgroundColor : keyMap["o"].UnPressedBackgroundColor}>
					<div className="k">
						<div className="u">O</div>
						<div className="d">F</div>
					</div>
				</OneKey>
				<OneKey
					k={"p"}
					bgColor={keyMap["p"].isPressed ? keyMap["p"].PressedBackgroundColor : keyMap["p"].UnPressedBackgroundColor}>
					<div className="k">
						<div className="u">P</div>
						<div className="d">G</div>
					</div>
				</OneKey>
				<OneKey
					k={"["}
					bgColor={keyMap["["].isPressed ? keyMap["["].PressedBackgroundColor : keyMap["["].UnPressedBackgroundColor}>
					<div className="k">
						<div className="u">[</div>
						<div className="d">A</div>
					</div>
				</OneKey>
				<OneKey
					k={"]"}
					bgColor={keyMap["]"].isPressed ? keyMap["]"].PressedBackgroundColor : keyMap["]"].UnPressedBackgroundColor}>
					<div className="k">
						<div className="u">]</div>
						<div className="d">B</div>
					</div>
				</OneKey>
				<OneKey w={70}>
					\
				</OneKey>
			</div>
			<div className="line line2">
				<OneKey w={80}>
					CapsLk
				</OneKey>
				<OneKey k={'a'}>
					A
				</OneKey>
				<OneKey
					k={"s"}
					bgColor={keyMap["s"].isPressed ? keyMap["s"].PressedBackgroundColor : keyMap["s"].UnPressedBackgroundColor}>
					<div className="k">
						<div className="u">S</div>
						<div className="d">
						</div>
					</div>
				</OneKey>
				<OneKey
					k={"d"}
					bgColor={keyMap["d"].isPressed ? keyMap["d"].PressedBackgroundColor : keyMap["d"].UnPressedBackgroundColor}>
					<div className="k">
						<div className="u">D</div>
						<div className="d">
						</div>
					</div>
				</OneKey>
				<OneKey>
					F
				</OneKey>
				<OneKey
					k={"g"}
					bgColor={keyMap['g'].isPressed ? keyMap['g'].PressedBackgroundColor : keyMap['g'].UnPressedBackgroundColor}>
					<div className="k">
						<div className="u">G</div>
						<div className="d">
						</div>
					</div>
				</OneKey>
				<OneKey
					k={"h"}
					bgColor={keyMap["h"].isPressed ? keyMap["h"].PressedBackgroundColor : keyMap["h"].UnPressedBackgroundColor}>
					<div className="k">
						<div className="u">H</div>
						<div className="d"></div>
					</div>
				</OneKey>
				<OneKey
					k={"j"}
					bgColor={keyMap["j"].isPressed ? keyMap["j"].PressedBackgroundColor : keyMap["j"].UnPressedBackgroundColor}>
					<div className="k">
						<div className="u">J</div>
						<div className="d"></div>
					</div>
				</OneKey>
				<OneKey>
					K
				</OneKey>
				<OneKey>
					L
				</OneKey>
				<OneKey>
					;:
				</OneKey>
				<OneKey>
					'"
				</OneKey>
				<OneKey w={95}>
					Enter
				</OneKey>
			</div>
			<div className="line line2">
				<OneKey w={100}>
					Shift
				</OneKey>
				<OneKey k={'z'}
				        bgColor={keyMap["z"].isPressed ? keyMap["z"].PressedBackgroundColor : keyMap["z"].UnPressedBackgroundColor}>
					<div className="k">
						<div className="u">Z</div>
						<div className="d">
							C
						</div>
					</div>
				</OneKey>
				<OneKey k={'x'}
				        bgColor={keyMap["x"].isPressed ? keyMap["x"].PressedBackgroundColor : keyMap["x"].UnPressedBackgroundColor}>
					<div className="k">
						<div className="u">X</div>
						<div className="d">
							D
						</div>
					</div>
				</OneKey>
				<OneKey k={'c'}
				        bgColor={keyMap["c"].isPressed ? keyMap["c"].PressedBackgroundColor : keyMap["c"].UnPressedBackgroundColor}>
					<div className="k">
						<div className="u">C</div>
						<div className="d">
							E
						</div>
					</div>
				</OneKey>
				<OneKey k={'v'}
				        bgColor={keyMap["v"].isPressed ? keyMap["v"].PressedBackgroundColor : keyMap["v"].UnPressedBackgroundColor}>
					<div className="k">
						<div className="u">V</div>
						<div className="d">
							F
						</div>
					</div>
				</OneKey>
				<OneKey k={'b'}
				        bgColor={keyMap["b"].isPressed ? keyMap["b"].PressedBackgroundColor : keyMap["b"].UnPressedBackgroundColor}>
					<div className="k">
						<div className="u">B</div>
						<div className="d">
							G
						</div>
					</div>
				</OneKey>
				<OneKey k={'n'}
				        bgColor={keyMap["n"].isPressed ? keyMap["n"].PressedBackgroundColor : keyMap["n"].UnPressedBackgroundColor}>
					<div className="k">
						<div className="u">N</div>
						<div className="d">
							A
						</div>
					</div>
				</OneKey>
				<OneKey k={'m'}
				        bgColor={keyMap["m"].isPressed ? keyMap["m"].PressedBackgroundColor : keyMap["m"].UnPressedBackgroundColor}>
					<div className="k">
						<div className="u">M</div>
						<div className="d">
							B
						</div>
					</div>
				</OneKey>

				<OneKey>
					,
				</OneKey>

				<OneKey>
					.
				</OneKey>
				<OneKey>
					?
				</OneKey>

				<OneKey w={120}>
					Shift
				</OneKey>
			</div>
		</div>
	</>
}

export default MainKeyboardLayout

const MainKeyboardLayout_css = (borderRadius: string | number) => css({
	...cssPresets.mxAuto,
	width: "100%",
	minWidth: 500,
	maxWidth: 690,
	overflowX: "auto",
	backgroundColor: googleColors.gray500,
	...cssFunctions.px(5),
	...cssFunctions.py(5),
	borderRadius: borderRadius,
	"& .line1": {
		...cssPresets.flexCenter,
		gap: 5
	},
	"& .line2": {
		...cssPresets.flexCenter,
		gap: 5,
		marginTop: 5
	},
	"& .line .k": {
		...cssPresets.flexCenter,
		flexDirection: "column",
		width: "100%",
		height: "100%",
		"& .u": {
			fontSize: 10,
			height: "30%",
			width: "100%",
			textAlign: "left",
			paddingLeft: 5,
			color: googleColors.gray400,
		},
		"& .d": {
			height: "70%",
			color: googleColors.blue700,
			fontSize: 14
		}
	}
})
