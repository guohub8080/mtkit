import About from "@/apps/Aboout/About.tsx";
import Beats from "@/apps/Beats/Beats.tsx";
import Interval from "@/apps/Interval/Interval.tsx";
import TabletScaleQuery from "@/apps/TabletScaleQuery/TabletScaleQuery.tsx";
import UpgradeLog from "@/apps/UpgradeLog/UpgradeLog.tsx";
import MainLayout from "@/components/reFrame/MainLayout.tsx";
import {createHashRouter, Navigate} from 'react-router-dom'
import CircleOfFifths from "@/apps/CircleOfFifths/CircleOfFifths.tsx";
import ErrorPage from "@/apps/ErrorPage/ErrorPage.tsx";
import routerPath from "./routerPath.ts";
import Mobile_KS_Query from "@/apps/MobileKSQuery/Mobile_KS_Query.tsx";
import MobileScaleOverview from "@/apps/MobileScaleOverview/MobileScaleOverview.tsx";
import MobileScoreChecker from "@/apps/MobileScoreChecker/MobileScoreChecker.tsx";
import Settings from "@/apps/Settings/Settings.tsx";
import Temp251 from "@/apps/Temp251/Temp251.tsx";
import ChordDisplay from "@/apps/ChordDisplay/ChordDisplay.tsx";
// import FindInScale from "@/apps/FindInScale/FindInScale.tsx";
import FindNotesInChordOrScale from "@/apps/FindNotesInChordOrScale/FindNotesInChordOrScale.tsx";
import FindNotesWithInterval from "@/apps/FindNotesWithInterval/FindNotesWithInterval.tsx";
import HarmonicSeries from "@/apps/HarmonicSeries/HarmonicSeries.tsx";
import Author from "@/apps/Author/Author.tsx";
import Spiano from "@/apps/Spiano/Spiano.tsx";
import StaveExam from "@/apps/StaveExam/StaveExam.tsx";
import AutoRedirect from "@/apps/AutoRedirect/AutoRedirect.tsx";

const r = createHashRouter([
	{
		path: "",
		element: <AutoRedirect/>
	},
	{
		path: "/",
		element: <MainLayout/>,
		caseSensitive: false,
		children: [
			{
				path: routerPath.about,
				element: <About/>,
			},
			{
				path: routerPath.interval,
				element: <Interval/>
			}, {
				path: routerPath.findNotesWithInterval,
				element: <FindNotesWithInterval/>
			},
			{
				path: routerPath.findNotes,
				element: <FindNotesInChordOrScale/>
			},
			{
				path: routerPath.mobile_ksQuery,
				element: <Mobile_KS_Query/>,
				caseSensitive: false
			}, {
				path: routerPath.upgradeLog,
				element: <UpgradeLog/>,
				caseSensitive: false
			},
			{
				path: routerPath.tablet_scaleQuery,
				element: <TabletScaleQuery/>
			},
			{
				path: routerPath.chordDisplay,
				element: <ChordDisplay/>
			},
			{
				path: routerPath.settings,
				element: <Settings/>
			},
			{
				path: routerPath.author,
				element: <Author/>
			},
			{
				path: routerPath.mobile_scaleTable,
				element: <MobileScaleOverview/>
			},
			{
				path: routerPath.harmonicSeries,
				element: <HarmonicSeries/>
			},
			{
				path: routerPath.circle,
				element: <CircleOfFifths/>
			},
			{
				path: routerPath.beats,
				element: <Beats/>
			},
			{
				path: routerPath.mobile_scoreChecker,
				element: <MobileScoreChecker/>
			},
			// {
			//   path: routerPath.staveExam,
			//   element: <StaveExam/>
			// },
			{
				path: routerPath.spiano,
				element: <Spiano/>
			},
			{
				path: routerPath.temp251,
				element: <Temp251/>
			},
		],
	},
	{
		path: "/error",
		element: <ErrorPage/>
	},
	{
		path: "*",
		element: <Navigate to="/error"/>
	}
])

export default r
