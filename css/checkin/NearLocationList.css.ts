import { style } from "@vanilla-extract/css";

export const locationListStyle = {
  wrapper: style({
    listStyle: "none",
    backgroundColor: "white",
    border: "1px solid #ccc",
  }),
  contentBody: style({
    margin: "1rem",
  }),
  link: style({
    textDecoration: "none",
    ":hover": {
      opacity: 0.8,
    },
  }),
  description: style({
    fontSize: "0.8rem",
    color: "#666",
  }),
  distance: style({
    fontSize: "0.8rem",
    color: "#666",
  }),
  locationUrl: style({
    fontSize: "0.8rem",
    textDecoration: "none",
    ":hover": {
      opacity: 0.8,
      cursor: "pointer",
    },
  }),
  details: style({
    margin: "1rem 0",
  }),
  metadata: style({
    display: "flex",
    margin: "1rem 0",
    flexDirection: "row",
    flexFlow: "wrap",
    justifyContent: "right",
  }),
};
