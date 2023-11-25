import * as React from "react";
import Svg, { Path } from "react-native-svg";

function ArrowRight(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={32}
      height={32}
      viewBox="0 0 32 32"
      style={{ paddingTop: 2 }}
      {...props}
    >
      <Path
        scale={1}
        fill={"#3ac96c"}
        d="M4 15a1 1 0 001 1h19.586l-4.292 4.292a1 1 0 001.414 1.414l6-6a.99.99 0 00.292-.702V15c0-.13-.026-.26-.078-.382a.99.99 0 00-.216-.324l-6-6a1 1 0 00-1.414 1.414L24.586 14H5a1 1 0 00-1 1z"
      />
    </Svg>
  );
}

export default ArrowRight;
