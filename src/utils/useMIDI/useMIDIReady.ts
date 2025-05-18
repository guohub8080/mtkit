import useMidiPortsStore from "@/assets/stores/useMidiPortsStore.ts";
import useMIDIPortsStore from "@/assets/stores/useMidiPortsStore.ts";
import {useEffect} from "react";
import JZZ from "jzz";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// import Kdb from "jzz-input-kbd";
import "jzz-synth-tiny";
// @ts-nocheck
import {Tiny} from 'jzz-synth-tiny'
// @ts-nocheck
import {Gear} from 'jzz-midi-gear';
import useMIDIConfig from "../../assets/stores/useMIDIConfig";

Tiny(JZZ)
Gear(JZZ)

export default () => {
	const {
		setIsWebMidiSupport,
		setIsJzzEngineReady,
		isWebMidiSupport,
		isJzzEngineReady,
	} = useMIDIConfig();

	const {initJzz} = useMidiPortsStore(); // 获取initJZZ方法

	useEffect(() => {

		// 检测WebMIDI支持
		navigator.requestMIDIAccess()
			.then(() => setIsWebMidiSupport(true))
			.catch(() => setIsWebMidiSupport(false));

		// 初始化JZZ引擎
		const jzz = JZZ({sysex: true});
		jzz.and(() => {
			setIsJzzEngineReady(true);
			initJzz(); // 调用initJZZ初始化并存储JZZ实例
			midiOutReg();
			midiInReg();
		}).or(() => setIsJzzEngineReady(false));

		// return () => {
		// 	jzz?.close(); // 清理JZZ实例
		// 	useMIDIPortsStore.getState().cleanup();
		// };
	}, [setIsWebMidiSupport, setIsJzzEngineReady, initJzz]);

	return {
		isWebMidiSupport,
		isJzzEngineReady,
	};
};

const midiOutReg = () => {
	JZZ.lib.registerMidiOut("乐理计算器vOut", {
		_info: () => ({
			name: "乐理计算器vOut",
			id: "乐理计算器vOut",
			manufacturer:
				"guohub.top",
			version:
				"1.2.1",
		}),
		_openOut: (port: any, name: any) => {
			port._receive = (data: any) => {
				console.log(data)
			}
		}
	})
}
const midiInReg = () => {
	JZZ.lib.registerMidiIn("WebInput", {
		_info: () => ({
			name: "WebInput",
			id: "WebInput",
			manufacturer:
				"s1",
			version:
				"0.5",
		}),
		_openIn: (port: any, name: any) => {
			port._receive = (data: any) => {
				console.log(data)
			}
		}
	})
}
