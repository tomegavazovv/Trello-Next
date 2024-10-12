import { Theme } from "@mui/material";
import { merge } from "lodash";
import { button } from "./components/button";
import { inputAdornment } from "./components/input-adornment";

export function componentOverrides(theme: Theme) {
  return merge(button(theme), inputAdornment(theme));
}
