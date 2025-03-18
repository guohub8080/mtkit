import * as React from "react"

const SvgComponent = (props: {
  color?: string
}) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 100 60"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    xmlSpace="preserve"
    style={{
      fillRule: "evenodd",
      clipRule: "evenodd",
      strokeLinejoin: "round",
      strokeMiterlimit: 2,
    }}
  >
    <g transform="matrix(0.283762,0,0,0.283762,22.0611,1.15724)">
      <path
        d="M98.459,3.214C44.097,3.214 0.028,47.282 0.028,101.644C0.028,156.006 44.097,200.075 98.459,200.075C152.821,200.075 196.89,156.006 196.89,101.644C196.89,47.282 152.821,3.214 98.459,3.214ZM47.404,110.675L47.413,92.183L150.036,92.183L150.033,110.675L47.404,110.675Z"
        style={{
          fill: props.color,
          fillRule: "nonzero",
        }}
      />
    </g>
  </svg>
)
export default SvgComponent
