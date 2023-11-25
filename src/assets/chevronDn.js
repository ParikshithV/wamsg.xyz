import React from "react";
import Svg, { Path } from "react-native-svg";

function ChevronDnSvg(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={14}
      height={14}
      fill="#000"
      className="bi bi-chevron-down"
      viewBox="0 0 16 16"
      style={{paddingTop: 3}}
      {...props}
    >
      <Path
      scale={0.8}
        fillRule="evenodd"
        d="M1.646 4.646a.5.5 0 01.708 0L8 10.293l5.646-5.647a.5.5 0 01.708.708l-6 6a.5.5 0 01-.708 0l-6-6a.5.5 0 010-.708z"
      />
    </Svg>
  );
}

export default ChevronDnSvg;
