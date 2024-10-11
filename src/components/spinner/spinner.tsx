import ClipLoader from "react-spinners/ClipLoader";
import { CSSProperties } from "react";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
};

export default function Spinner({
  size = 14,
  color = "#000",
  speedMultiplier = 1
}:
  {
    size?: number,
    color?: string,
    speedMultiplier?: number
  }) {

  return <ClipLoader
    cssOverride={override}
    loading={true}
    size={size}
    color={color}
    speedMultiplier={speedMultiplier}
  />;
}