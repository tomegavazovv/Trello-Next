import ClipLoader from "react-spinners/ClipLoader";
import { CSSProperties } from "react";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
};

export default function Spinner({ loading, size, color  }: { loading: boolean, size: number, color: string }) {
  
  return <ClipLoader cssOverride={override} loading={loading} size={size} color={color} />;
}