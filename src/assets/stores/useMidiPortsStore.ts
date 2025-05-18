import {create} from 'zustand'
import {immer} from 'zustand/middleware/immer'
import {createJSONStorage, persist} from 'zustand/middleware'
import JZZ from 'jzz'
import {isEmpty} from 'lodash'

type Port = {
	engine: string
	id: string
	manufacturer: string
	name: string
	version: string
}

// 增强类型定义
type JZZMidiPort = ReturnType<typeof JZZ>

type MIDIPortState = {
	inputs: Port[]
	outputs: Port[]
	currentInPort: JZZMidiPort | null
	currentOutPort: JZZMidiPort | null
	selectedInPortIndex: number
	selectedOutPortIndex: number
	portNameIn: string
	portNameOut: string
	loading: boolean
	error: string | null
	jzzInstance: ReturnType<typeof JZZ> | null
	initialized: boolean

	// Actions
	setInputs: (ports: Port[]) => void
	setOutputs: (ports: Port[]) => void
	setCurrentInPort: (port: JZZMidiPort | null) => void
	setCurrentOutPort: (port: JZZMidiPort | null) => void
	setSelectedInPortIndex: (index: number) => void
	setSelectedOutPortIndex: (index: number) => void
	setLoading: (loading: boolean) => void
	setError: (error: string | null) => void
	setJzzInstance: (instance: ReturnType<typeof JZZ> | null) => void
	setInitialized: (initialized: boolean) => void
	resetStore: () => void
	initJzz: () => void
	cleanup: () => void
}

const defaultStore = {
	inputs: [] as Port[],
	outputs: [] as Port[],
	currentInPort: null,
	currentOutPort: null,
	selectedInPortIndex: 0,
	selectedOutPortIndex: 0,
	portNameIn: '',
	portNameOut: '',
	loading: true,
	error: null,
	jzzInstance: null,
	initialized: false,
}

const storeKey = 'midiPortStore'

const useMIDIPortsStore = create<MIDIPortState>()(
	immer(
		(set, get) => ({
			...defaultStore,

			// Actions
			setInputs: (ports) =>
				set((state) => {
					state.inputs = ports
				}),

			setOutputs: (ports) =>
				set((state) => {
					state.outputs = ports
				}),

			setCurrentInPort: (port) =>
				set((state) => {
					state.currentInPort = port
				}),

			setCurrentOutPort: (port) =>
				set((state) => {
					state.currentOutPort = port
				}),

			setSelectedInPortIndex: (index) =>
				set((state) => {
					state.selectedInPortIndex = index
				}),

			setSelectedOutPortIndex: (index) =>
				set((state) => {
					state.selectedOutPortIndex = index
				}),

			setLoading: (loading) =>
				set((state) => {
					state.loading = loading
				}),

			setError: (error) =>
				set((state) => {
					state.error = error
				}),

			setJzzInstance: (instance) =>
				set((state) => {
					state.jzzInstance = instance
				}),

			setInitialized: (initialized) =>
				set((state) => {
					state.initialized = initialized
				}),

			resetStore: () => {
				set(defaultStore)
				localStorage.removeItem(storeKey)
			},

			initJzz: () => {
				if (get().jzzInstance) return

				set((state) => {
					state.loading = true
				})

				try {
					const jzz = JZZ({sysex: true})
					set((state) => {
						state.jzzInstance = jzz
					})

					jzz.and(() => {
						set((state) => {
							state.initialized = true
							state.loading = false
						})
					}).or((error) => {
						set((state) => {
							state.error = error.toString()
							state.loading = false
						})
					})
				} catch (error) {
					set((state) => {
						state.error = error.toString()
						state.loading = false
					})
				}
			},

			cleanup: () => {
				get().jzzInstance?.close();
				set({
					jzzInstance: null,
					inputs: [],
					outputs: [],
					selectedInPortIndex: -1,
					selectedOutPortIndex: -1,
					loading: false,
					error: null,
				});
			},
		})
	)
)

export default useMIDIPortsStore
