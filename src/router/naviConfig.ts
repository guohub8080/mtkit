// noinspection ES6PreferShortImport
import about_svg from "@/router/svgComps/about_svg.svg"
import scales_svg from "@/router/svgComps/scale_svg.svg"
import chord_svg from "@/router/svgComps/chord_svg.svg"
import find_notes_svg from "@/router/svgComps/findNotes_svg.svg"
import keys_svg from "@/router/svgComps/keys_svg.svg"
import find_notes_itv_svg from "@/router/svgComps/findNotesWithInterval_svg.svg"
import author_svg from "@/router/svgComps/author_svg.svg"
import series_svg from "@/router/svgComps/series_svg.svg"
import temp251_svg from "@/router/svgComps/temp251_svg.svg"
import midi_svg from "@/router/svgComps/midi_svg.svg"
import clap_svg from "@/router/svgComps/clap_svg.svg"
import kbd_svg from "@/router/svgComps/kbd_svg.svg"
import exam_svg from "@/router/svgComps/exam_svg.svg"
import upgrade_svg from "@/router/svgComps/update_svg.svg"
import sets_svg from "@/router/svgComps/settings_svg.svg"
import score_svg from "@/router/svgComps/score_svg.svg"
import circle_svg from "@/router/svgComps/circle_svg.svg"
import interval_svg from "@/router/svgComps/interval_svg.svg"
import routerPath from "./routerPath.ts";

export default [
	{
		link: `/${routerPath.interval}`,
		title: "音程查询",
		subtitle: "给定音程查音符/查询两音音程",
		imgURL: find_notes_itv_svg,
		type: "all"
	},
	{
		link: `/${routerPath.tablet_scaleQuery}`,
		title: "音阶详情",
		subtitle: "调式音阶信息/通过调号查调式",
		imgURL: scales_svg,
		type: "tablet"
	},
	{
		link: `/${routerPath.mobile_ksQuery}`,
		title: "音阶升降号查询",
		subtitle: "给定升降号数量查询音阶/反查",
		imgURL: keys_svg,
		type: "mobile"
	},

	{
		link: `/${routerPath.mobile_scaleTable}`,
		title: "音阶详情",
		subtitle: "调式音阶信息/通过调号查调式",
		imgURL: scales_svg,
		type: "mobile"
	},
	{
		link: `/${routerPath.chordDisplay}`,
		title: "和弦详情",
		subtitle: "给定和弦类型查看和弦信息",
		type: "all",
		imgURL: chord_svg,
	},
	{
		link: `/${routerPath.mobile_scoreChecker}`,
		title: "识谱辅助",
		subtitle: "识别谱面并与钢琴键盘对应",
		imgURL: score_svg,
		type: "all"
	},

	{
		link: `/${routerPath.findNotes}`,
		title: "音符辞典",
		subtitle: "查找音符所在的和弦或音阶",
		type: "all",
		imgURL: find_notes_svg,
	},
	{
		link: `/${routerPath.findNotesWithInterval}`,
		title: "音程辞典",
		subtitle: "查找音程所在的和弦或音阶",
		imgURL: interval_svg,
		type: "all"
	},

	{
		link: `/${routerPath.circle}`,
		title: "五度圈",
		subtitle: "可带有指针或旋转功能",
		imgURL: circle_svg,
		type: "all"
	},
	{
		link: `/${routerPath.beats}`,
		title: "节拍与速度",
		subtitle: "给定速度打节拍/计算BPM",
		imgURL: clap_svg,
		type: "all"
	},


	{
		link: `/${routerPath.temp251}`,
		title: "251查询",
		subtitle: "给定任意音符给出251进行",
		imgURL: temp251_svg,
		type: "all"
	},
	{
		link: `/${routerPath.harmonicSeries}`,
		title: "泛音列",
		subtitle: "可比较多个音符的泛音列",
		imgURL: series_svg,
		type: "all"
	},

	{
		link: `/${routerPath.spiano}`,
		title: "超级钢琴",
		subtitle: "分析琴键/可搭配MIDI键盘使用",
		imgURL: midi_svg,
		type: "all"
	},

	{
		link: `/${routerPath.keyboard}`,
		title: "键盘演奏",
		subtitle: "通过电脑键盘简单演奏",
		imgURL: kbd_svg,
		type: "tablet"
	},

	{
	  link: `/${routerPath.staveExam}`,
	  title: "识谱小测试",
	  subtitle: "可用来随机出题巩固记忆",
	  imgURL: exam_svg,
	  type: "all"
	},


	{
		link: `/${routerPath.settings}`,
		title: "设置",
		subtitle: "功能支持状态/声音模式",
		imgURL: sets_svg,
		type: "all"
	},
	{
		link: `/${routerPath.upgradeLog}`,
		title: "更新日志",
		subtitle: "每次提交GitHub更新的内容",
		imgURL: upgrade_svg,
		type: "all"
	},

	{
		link: `/${routerPath.author}`,
		title: "关于作者",
		subtitle: "作者介绍/联系开发者/提交Bug",
		imgURL: author_svg,
		type: "all"
	},
	{
		link: `/${routerPath.about}`,
		title: "关于项目",
		subtitle: "备案公示/引用库公示",
		imgURL: about_svg,
		type: "all"
	},
]
