/* eslint-disable no-mixed-spaces-and-tabs */

import {css} from "@emotion/react";
import {useNavigate} from "react-router-dom";
import cssPresets from "@/assets/styles/cssPresets.ts";
import useGlobalSettings from "@/assets/stores/useGlobalSettings.ts";
import googleColors from "@/assets/colors/googleColors.ts";
import byDefault from "@/utils/byDefault.ts";

const NaviItem = (props: {
  title: string,
  link: string,
  url: string,
  itemH: number,
  itemW?: number
  subtitle?: string
  iconH?: number
}) => {
  const globalSettings = useGlobalSettings()
  const itemW = byDefault(props.itemW, "100%")
  const iconH = byDefault(props.iconH, props.itemH * 0.5)
  const handleClick = () => {
    navigate(props.link, {replace: true})
    globalSettings.setNaviWindowOpen(false)
  }
  const navigate = useNavigate();
  return <div css={navi_item_css(props.itemH, itemW, iconH)} onClick={handleClick}>
    <div className="icon">
      <img src={props.url} alt=""/>
    </div>
    <div className="title_frame">
      <div className="title">
        {props.title}
      </div>
      <div className="subtitle">
        {props.subtitle}
      </div>
    </div>

  </div>
}

export default NaviItem

const navi_item_css = (itemH: number, itemW: number, iconH: number) => css({
  width: itemW,
  height: itemH,
  userSelect: "none",
  ...cssPresets.flexCenter,
  // paddingLeft: 40,
  // paddingRight: 40,
  cursor: "pointer",
  "&:active": {
    backgroundColor: "#e5e5e5",
    transition: "background-color 0.1s",
  }, "&:hover": {
    backgroundColor: "#e5e5e5",
    transition: "background-color 0.1s",
  },
  "& .icon": {
    width: iconH,
    height: iconH,
    marginRight: 15,
    userSelect: "none",
    "& img": {
      width: "100%",
      height: "100%",
      userSelect: "none",
    }
  },
  "& .title_frame": {
    height: "100%",
    ...cssPresets.flexCenter,
    alignItems:"start",
    flexDirection: "column",
    "& .title": {
      // width: 80,
      fontSize:18,
      marginBottom:5,
      textAlign: "center",
      userSelect: "none",
    },
    "& .subtitle": {

      fontSize: 12,
      color: googleColors.blue300,
    }
  },

})
