/* eslint-disable no-mixed-spaces-and-tabs */
import {css} from "@emotion/react";
import cssPresets from "@/assets/styles/cssPresets.ts";
import googleColors from "@/assets/colors/googleColors.ts";
import {useNavigate} from "react-router-dom";
import {IoIosWarning} from "react-icons/io";
import resetAllStores from "@/assets/stores/useResetAllStores.tsx";
import ErrorSvg from "./svg/ErrorSvg.tsx"

const ErrorPage = () => {
  const navigate = useNavigate();
  const resetHandle = resetAllStores()
  const doFix = () => {
    resetHandle.resetAll()
    navigate("/interval", {replace: true})
  }
  return <>
    <div css={ErrorPage_css}>
      <div className="img_frame">
        {/*<img src={logo_svg} alt=""/>*/}
        <ErrorSvg color={googleColors.redA100}></ErrorSvg>
        {/*<IoIosWarning size={150} color={googleColors.redA100}/>*/}
      </div>
      <div className="error_message">
        程序出错
      </div>
      <div className="btn" onClick={doFix}>
        重置程序
      </div>
    </div>
  </>
}

export default ErrorPage

const ErrorPage_css = css({
  ...cssPresets.flexCenter,
  width: "100%",
  height: "calc(100vh)",
  backgroundColor: googleColors.deepOrange900,
  flexDirection: "column",
  userSelect: "none",
  "& .img_frame": {
    width: "calc(30vw)",
    maxWidth: 300,
    height: "auto",
    "& img": {
      width: "80%",
      height: "auto"
    }
  },
  "& .error_message": {
    fontSize: 20,
    
    color: googleColors.redA100,
    margin: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  "& .btn": {
    width: 200,
    backgroundColor: googleColors.redA200,
    height: 60,
    ...cssPresets.flexCenter,
    userSelect: "none",
    cursor: "pointer",
    
    color: "white",
    fontSize: 22,
    borderRadius: 15,
    ...cssPresets.transition,
    "&:active": {
      backgroundColor: googleColors.redA400,
    }
  }
})
