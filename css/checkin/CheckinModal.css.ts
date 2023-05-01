import { style } from "@vanilla-extract/css";

export const checkinModalStyle = {
  modal: style({
    margin: "1rem auto 0 auto",
    padding: "1rem",
    background: "whitesmoke",
    width: "90vw",
    height: "50vh",
  }),
  modalContent: style({
    margin: "1rem",
  }),
  textareaWrapper: style({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "1rem",
  }),
  textarea: style({
    width: "100%",
    padding: "0.5rem",
  }),
  buttonContainer: style({
    display: "flex",
    justifyContent: "flex-end",
  }),
  button: style({
    margin: "1rem 0.5rem 0 0.5rem",
  }),
};
