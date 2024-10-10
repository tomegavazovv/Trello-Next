import ClipLoader from "react-spinners/ClipLoader";
import { CSSProperties } from "react";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
};

export default function Spinner({
  loading,
  size = 14,
  color = "#000",
  speedMultiplier = 1
}:
  {
    loading: boolean,
    size?: number,
    color?: string,
    speedMultiplier?: number
  }) {

  return <ClipLoader
    cssOverride={override}
    loading={loading}
    size={size}
    color={color}
    speedMultiplier={speedMultiplier}
  />;
}