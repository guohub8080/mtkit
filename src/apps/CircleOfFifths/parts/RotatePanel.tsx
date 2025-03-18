/* eslint-disable no-mixed-spaces-and-tabs */
import {css} from "@emotion/react";
import cssPresets from "@/assets/styles/cssPresets.ts";
import useCircleOfFifthsConfig from "@/assets/stores/useCircleOfFifthsConfig.ts";
import googleColors from "@/assets/colors/googleColors.ts";
import {IoFootstepsSharp} from "react-icons/io5";
import {TbClockMinus, TbClockPlus} from "react-icons/tb";
import {isMobile} from "react-device-detect";
import CircleConfigPopover from "@/apps/CircleOfFifths/comps/CircleConfigPopover.tsx";
import {FcSettings} from "react-icons/fc";
import {LuSettings2} from "react-icons/lu";
import {GrConfigure} from "react-icons/gr";

const iconColor = googleColors.blue800
const iconSize = 30
const RotatePanel = () => {
  const {
    rotateLength, setRotateLength,
    isCursorShow, isCursorMoveMode,
    setCursorID, cursorID,
    circleID, setCircleID, setRotateLengthConfigOpen
  } = useCircleOfFifthsConfig()
  const switchNum = () => {
    setRotateLengthConfigOpen(true)
  }
  return <>
    <CircleConfigPopover/>
    <div css={RotatePanel_css}>
      <div className="inner_frame">
        {/*做减法的按钮*/}
        <div className="do minus" onClick={() => {
          if (isCursorShow && isCursorMoveMode) {
            return setCursorID(cursorID - rotateLength)
          }
          setCircleID(circleID - rotateLength)
        }}>
          <TbClockMinus size={iconSize} color={iconColor}/>
        </div>
        {/*中间的部分*/}
        <div className="middle_window" onClick={switchNum}>
          <div className="settings">
            <GrConfigure size={25}/>
          </div>
          <div className="step_length">
            <div className="step_icon">
              <IoFootstepsSharp size={20}/>
              <div style={{fontFamily:"misans-m"}}>步长</div>
            </div>

            <div className="n">{rotateLength}</div>
          </div>

        </div>
        {/*做加法的按钮*/}
        <div className="do plus" onClick={() => {
          if (isCursorShow && isCursorMoveMode) {
            return setCursorID(cursorID + rotateLength)
          }
          setCircleID(circleID + rotateLength)
        }}>
          <TbClockPlus size={iconSize} color={iconColor}/>
        </div>
      </div>
    </div>
  </>
}

export default RotatePanel

const RotatePanel_css = css({
  width: "100%",
  paddingLeft: 10,
  paddingRight: 10,
  marginTop: 15,
  userSelect: "none",
  ...cssPresets.flexCenter,
  "& .inner_frame": {
    ...cssPresets.flexCenter,
    "& .do": {
      width: 70,
      height: 70,
      backgroundColor: "#fff",
      marginLeft: 5,
      marginRight: 5,
      borderRadius: 10,
      ...cssPresets.flexCenter,
      ...cssPresets.transition,
      border: `1px solid ${googleColors.gray300}`,
      cursor: "pointer",
      "&:hover": {
        backgroundColor: isMobile ? "transparent" : googleColors.gray200,
      },
      "&:active": {
        backgroundColor: googleColors.gray300,
      }
    },
    "& .middle_window": {
      ...cssPresets.flexCenter,
      height: 80,
      overflow: "hidden",
      color: googleColors.blue800,
      marginLeft: 10,
      marginRight: 10,
      backgroundColor: "white",
      borderRadius: 8,
      ...cssPresets.transition,
      border: `1px solid ${googleColors.gray300}`,
      cursor: "pointer",
      "& .settings": {
        height: "100%",
        width: 60,
        ...cssPresets.flexCenter,
        borderRight: `1px solid ${googleColors.gray300}`,
      },
      "& .step_length": {
        width: 120,
        ...cssPresets.flexCenter,
      },
      "&:hover": isMobile ? "" : {
        backgroundColor: googleColors.gray200,
      },
      "&:active": {
        backgroundColor: googleColors.gray300,
      },
      "& .n": {
        fontSize: 40,
        fontFamily: "misans-m",
        marginLeft: 10,
      }
    }
  }
})
