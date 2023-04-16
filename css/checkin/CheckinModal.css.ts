import { style } from "@vanilla-extract/css";

export const checkinModalStyle = {
  modal: style({
    margin: "1rem auto 0 auto",
    padding: "1rem",
    background: "whitesmoke",
    width: "80vh",
    height: "50vh",
  }),
  modalContent: style({
    margin: "1rem",
  }),
};
