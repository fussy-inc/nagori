import { style } from "@vanilla-extract/css";

export const indexStyle = {
  mainStyle: style({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  }),
  sectionStyle: style({
    display: "flex",
    flexDirection: "column",
  }),
};
