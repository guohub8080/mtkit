/* eslint-disable no-mixed-spaces-and-tabs */
import googleColors from "@/assets/colors/googleColors.ts";
import useMIDIConfig from "@/assets/stores/useMIDIConfig.ts";
import cssFunctions from "@/assets/styles/cssFunctions.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import NoteText from "@/components/reNote/NoteText/NoteText.tsx";
import useMidiEvents from "@/utils/useMIDI/useMidiEvents.ts";
import {css} from "@emotion/react";
import {isNull, isUndefined} from "lodash";
import {useEffect, useState} from "react";
import * as music12 from "@/music12";

const MidiEventsList = () => {
	const {eventList, latestEvent, clearNoteOnList, clearEventList} = useMidiEvents()
	const {eventListLength} = useMIDIConfig()
	const [eventCount, setEventCount] = useState(0)
	useEffect(() => {
		if (!isNull(latestEvent)) setEventCount(pre => pre + 1)
	}, [latestEvent])

	useEffect(() => {
		clearEventList()
		clearNoteOnList()
		setEventCount(0)
	}, [eventListLength])
	const getOctave = (note: number) => {
		const radix = new music12.Radix.Base12Radix(note)
		return radix.firstDigit
	}
	return <>
		<div css={MidiEventListShow_css}>
			{eventCount === 0 && <div className="zero">
				当前暂未收到MIDI信号
			</div>}
			{eventCount > 0 && <div className="latest">
				<div className="texta">
					<div className="count">MIDI信号数量</div>
					<div className="countnum">{eventCount <= 999 ? eventCount : "999+"}</div>
				</div>
				<div className="clear" onClick={() => {
					clearEventList()
					clearNoteOnList()
					setEventCount(0)
				}}>
					清空
				</div>
			</div>}
			{eventCount > 0 && <div className="list_frame">
				<div style={{border: `1px solid ${googleColors.gray400}`, borderRadius: 8, overflow: "hidden", width: "100%"}}>
					<table>
						<tbody>
						<tr className="title">
							<td className={"in"}>设备名</td>
							<td className="nt">音符</td>
							<td>八度</td>
							<td>音名</td>
							<td>力度</td>
						</tr>
						{eventList.map((event, index) => {
							return <tr key={index} className={`item ${event.isNoteOn ? "tr_on" : "tr_off"}`}>
								<td className="in">{event.name}</td>
								<td>
									<div className="nt">
										{event.isNoteOn && <div className="on">ON</div>}
										{event.isNoteOff && <div className="off">OFF</div>}
										<div className={`num ${event.isNoteOn ? "on_num" : "off_num"}`}>{event.note}</div>
									</div>
								</td>
								<td>{getOctave(event.note)}</td>
								<td>
									<NoteName note={event.note}/>
								</td>
								<td>
									{event.isNoteOn ? event.velocity : "—"}
								</td>
							</tr>
						})}
						</tbody>
					</table>
				</div>
			</div>}
		</div>
	</>
}

export default MidiEventsList

const MidiEventListShow_css = css({
	width: "100%",
	"&>.latest": {
		...cssPresets.flexCenter,
		width: "100%",
		maxWidth: 350,
		marginBottom: 5,
		...cssPresets.mxAuto,
		"&>.texta": {
			...cssPresets.flexCenter,
			width: 200,
			...cssFunctions.px(20),
			backgroundColor: "white",
			height: 25,
			borderRadius: 8,
			justifyContent: "space-between",
			"&>.count": {
				fontSize: 14,
				...cssPresets.transition,
			},
			"&>.countnum": {
				fontSize: 14,
				color: googleColors.blue800,
				...cssPresets.transition,
				width: 50,
			},
		},

		"&>.clear": {
			...cssPresets.flexCenter,
			marginLeft: "auto",
			width: 80,
			fontSize: 14,
			color: googleColors.red50,
			backgroundColor: googleColors.redA100,
			...cssFunctions.px(20),
			...cssFunctions.py(5),
			borderRadius: 999,
			...cssPresets.transition,
			cursor: "pointer",
			border: `1px solid ${googleColors.red800}`,
			"&:active": {
				backgroundColor: googleColors.redA200,
			}
		}
	},
	"& table": {
		borderCollapse: "collapse",
		borderSpacing: 0,
		...cssPresets.mxAuto,
		color: googleColors.gray800,
		width: "100%",
		"& tr:not(:first-of-type)": {
			borderTop: `1px solid ${googleColors.gray400}`,
			"& td": {
				...cssFunctions.py(1)
			}
		},
		"& td.in": {
			maxWidth: 105,
			width: 105,
			whiteSpace: "nowrap",
			overflow: "hidden",
			textOverflow: "ellipsis",
			textAlign: "center",
		},
		"& td.nt": {
			width: 80
		},
		"& div.nt": {
			width: 80,
			...cssPresets.flexCenter,
			"&>.on": {
				backgroundColor: googleColors.blue800,
				width: 35,
				borderRadius: 6,
				fontSize: 10,
				height: 17,
				...cssPresets.flexCenter,
				color: googleColors.blue100,
			},
			"&>.off": {
				backgroundColor: googleColors.red800,
				width: 35,
				borderRadius: 6,
				fontSize: 10,
				height: 17,
				...cssPresets.flexCenter,
				color: googleColors.red100,
			},
			"&>.num": {
				width: 40
			},
			"&>.on_num": {
				color: googleColors.blue800
			}
			, "&>.off_num": {
				color: googleColors.red800
			}
		},
		"& tr.title": {
			backgroundColor: googleColors.blueGray100,
			borderRadius: "8px 8px 0 0",
			overflow: "hidden",
			height: 28,
			color: googleColors.blueGray700,
		},
		"& .tr_on": {
			backgroundColor: "white",
		},
		"& .tr_off": {
			backgroundColor: googleColors.gray200,
		},

	},
	"& .list_frame": {
		...cssPresets.flexCenter,
		flexDirection: "column",
		...cssPresets.mxAuto,
		width: "100%",
		maxWidth: 450,
		...cssFunctions.px(10)
	}
})

const NoteName = (props: { note: number }) => {
	const radix = new music12.Radix.Base12Radix(props.note)
	const notes = music12.note.getNoteByLocation(radix.lastDigit)
	if (notes.length === 1) return <div><NoteText step={notes[0].step} fontSize={16} alter={notes[0].alter}/></div>
	return <div style={{...cssPresets.flexCenter}}>
		<div><NoteText step={notes[0].step} fontSize={16} alter={notes[0].alter}/></div>
		<div style={{fontSize: 10, marginLeft: 5, marginRight: 2}}></div>
		<div><NoteText step={notes[1].step} fontSize={16} alter={notes[1].alter}/></div>
	</div>

}
