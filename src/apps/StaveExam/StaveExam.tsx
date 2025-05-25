/* eslint-disable no-mixed-spaces-and-tabs */
import TestContent from "@/apps/StaveExam/components/TestContent.tsx";
import useStaveExam from "@/apps/StaveExam/useStaveExam.ts";
import {css} from "@emotion/react";
import WelcomeTest from "@/apps/StaveExam/components/WelcomeTest.tsx";
import useExamConfig from "@/assets/stores/useExamConfig.ts";
import {useMemo} from "react";


const StaveExam = () => {
	const {isWelcome} = useExamConfig()

	return <>
		<div css={StaveExam_css}>
			{isWelcome && <WelcomeTest/>}
			{!isWelcome && <TestContent/>}

		</div>
	</>
}

export default StaveExam

const StaveExam_css = css({})
