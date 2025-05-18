/* eslint-disable no-mixed-spaces-and-tabs */
import googleColors from "@/assets/colors/googleColors.ts";
import useMIDIConfig from "@/assets/stores/useMIDIConfig.ts";
import cssFunctions from "@/assets/styles/cssFunctions.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import useMIDIPorts from "@/utils/useMIDI/useMIDIPorts.ts";
import {css} from "@emotion/react";
import {Button, Switch} from "antd-mobile";
import {useMemo} from "react";
import Select from 'react-select'


const PcKeyboardConfig = () => {
	const {outputs, setSelectedOutPortIndex, selectedOutPortIndex} = useMIDIPorts()
	const {isBroadcastMidi, setIsBroadcastMidi, isMidiKeyStrokeSoundOn, setIsMidiKeyStrokeSoundOn} = useMIDIConfig()
	const options = useMemo(() => {
		return outputs.map((item, index) => {
			return {
				value: index,
				label: item.name
			}
		})
	}, [outputs])
	return <>
		<div css={PcKeyboardConfig_css}>
			<div className="inner_f">
				<div className="l1">
					<Switch style={{"--checked-color": googleColors.blue800}} checked={isMidiKeyStrokeSoundOn}
					        onChange={(e) => setIsMidiKeyStrokeSoundOn(e)}/>
					<div className="sytext">
						{isMidiKeyStrokeSoundOn ? "按键声音" : "按键静音"}
					</div>
					<div className="refresh">
						<Button
							color={"warning"}
							shape={"rounded"}
							style={{width: 200, marginLeft: 15, "--background-color": googleColors.red300}}
							onClick={() => {
								window.location.reload()
							}}>刷新页面
						</Button>
					</div>
				</div>

				<div className="l1">
					<Switch style={{"--checked-color": googleColors.blue800}} checked={isBroadcastMidi}
					        onChange={(e) => setIsBroadcastMidi(e)}/>
					<div className="gbmiditext">
						{isBroadcastMidi ? "MIDI信号传给" : "MIDI不广播"}
					</div>
					<Select
						isDisabled={!isBroadcastMidi}
						onChange={(e) => {
							setSelectedOutPortIndex(e?.value)
						}}
						value={options[selectedOutPortIndex]}
						styles={{
							control: (baseStyles, state) => ({
								...baseStyles,
								width: 200,
								cursor: 'pointer',
								borderColor: state.isFocused ? 'grey' : 'gray',
							}),
						}} options={options}/>
				</div>

			</div>
		</div>
	</>
}

export default PcKeyboardConfig

const PcKeyboardConfig_css = css({
	width: "100%",
	...cssPresets.flexCenter,
	"& .inner_f": {
		width: "100%",
		height: "100%",
		maxWidth: 450,
		marginBottom: 45,
		backgroundColor: "#FFF",
		marginTop: 15,
		borderRadius: 18,
		...cssFunctions.py(15),
		"& .l1": {
			width: "100%",
			marginTop: 15,
			marginBottom: 15,
			...cssPresets.flexCenter,
			"& .gbmiditext": {
				marginRight: 10,
				marginLeft: 5,
				width: 100
			},
			"& .sytext": {
				width: 100
			}
		}
	}
})
