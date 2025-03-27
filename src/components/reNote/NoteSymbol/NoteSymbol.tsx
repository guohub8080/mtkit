/* eslint-disable no-mixed-spaces-and-tabs */

import useGlobalSettings from "@/assets/stores/useGlobalSettings.ts";
import byDefault from "@/utils/byDefault.ts";

const NoteSymbol = (props: {
  color?: string;
  alter?: number;
}) => {
  const {defaultNoteColor} = useGlobalSettings();
  const alter = byDefault(props.alter, 0);
  let path = naturalPath
  if (alter === 1) path = sharpPath
  else if (alter === -1) path = flatPath
  else if (alter === -2) path = doubleFlatPath
  else if (alter === 2) path = doubleSharpPath
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      viewBox={alter === -2 ? "0 0 429.99 748" : "0 0 270 748"}
      preserveAspectRatio={"xMidYMid meet"}
      height={"100%"}>
      <path style={{fill: byDefault(props.color, defaultNoteColor)}} d={path}/>
    </svg>
  )
}

export default NoteSymbol


const flatPath = `M25.1 5.16h34.24v430.77c27.25-27.25 58.18-40.86 92.79-40.86 23.56 0 44.92 7.92 64.07 23.73 19.14 15.83 28.71 38.85 28.71 69.03 0 23.58-6.99 45.3-20.99 65.17-14 19.89-32.77 39.76-56.33 59.65l-76.22 65.17c-14 11.78-26.51 23.39-37.56 34.8-11.05 11.41-20.62 22.26-28.71 32.58V5.16zM59.33 671.2c19.16-20.62 35.36-39.59 48.6-56.89 13.25-17.3 23.56-32.6 30.94-45.84 8.09-14 14.17-26.88 18.21-38.66 4.06-11.78 6.08-22.82 6.08-33.14 0-20.62-4.79-35.53-14.37-44.74-9.56-9.19-19.87-13.81-30.91-13.81-11.78 0-23.39 4.25-34.8 12.71-11.41 8.48-19.33 20.06-23.75 34.8V671.2z`

const sharpPath = "M71.25 456.71V317.56l-45.73 11.67v-97.31l45.73-12.66V28.53h30.18v182.95l65.19-15.57V6.16h30.16v181.97l47.69-10.7v96.34l-47.69 13.61v139.16l47.69-11.67v100.22l-47.69 11.69v182.94h-30.16V534.56l-65.19 17.52v189.76H71.25V558.88l-45.73 11.69V470.33l45.73-13.62zm95.38-23.36V293.23l-65.19 16.54v139.16l65.19-15.58z"


const naturalPath = "M226.28 183.64v557.07h-32.15V520.78L43.72 559.17V7.29h34.24v214.74l148.32-38.39zM196.2 424.32V291.53L75.87 321.62v131.73l120.33-29.03z"

const doubleSharpPath = "M262.91 502.89v-84.61h-50.17c-10.49 0-18.87-4.59-25.1-13.78s-9.34-19.35-9.34-30.5c0-9.19 3.61-18.85 10.82-29.02 7.21-10.17 15.09-15.26 23.62-15.26h50.17v-84.61H178.3v54.11c0 8.53-4.59 15.74-13.78 21.64s-18.7 8.86-28.54 8.86c-12.45 0-22.94-3.11-31.48-9.34-8.53-6.25-12.8-13.95-12.8-23.14V245.1H7.09v84.61H67.1c3.94 0 9.03 4.75 15.26 14.26S91.7 363.51 91.7 374c0 11.15-2.79 21.31-8.36 30.5-5.57 9.19-12.95 13.78-22.14 13.78H7.09v84.61H91.7v-46.24c0-11.15 4.27-20.33 12.8-27.56 8.53-7.21 19.02-10.82 31.48-10.82 11.82 0 21.81 3.61 30.02 10.82 8.19 7.23 12.3 17.06 12.3 29.52v44.28h84.61z"

const doubleFlatPath = "M197.84 567.1c-5.91 8.85-15.34 19.56-28.26 32.11-12.92 12.57-29.73 26.96-50.41 43.21-40.61 31.76-76.42 66.47-107.45 104.14V4.34h32.13v432.03c33.97-27.33 65-40.98 93.06-40.98 23.63 0 43.94 7.38 60.93 22.16V4.34h34.34v432.03c27.33-27.33 58.33-40.98 93.06-40.98 23.63 0 45.05 7.94 64.24 23.8 19.21 15.88 28.8 38.97 28.8 69.24 0 23.65-7.01 45.44-21.03 65.36-14.04 19.95-32.87 39.88-56.51 59.82l-76.42 65.36c-28.82 25.1-50.98 47.62-66.47 67.57V567.1zm34.33 105.24c29.53-31.03 54.29-61.86 74.21-92.52 19.95-30.64 29.92-58.16 29.92-82.52 0-20.68-4.8-35.63-14.41-44.87-9.61-9.22-19.95-13.85-31.03-13.85-11.81 0-23.43 4.26-34.88 12.74-11.45 8.5-19.39 20.12-23.82 34.9v186.12zm-188.32 0 45.41-52.08c21.42-24.36 36.57-45.78 45.41-64.24 8.87-18.48 13.31-38.04 13.31-58.72 0-37.67-15.15-56.49-45.44-56.49-11.81 0-23.43 4.24-34.88 12.74-11.45 8.48-19.39 19.39-23.82 32.67v186.12z"
