import * as React from "react";
import { resetSnackbar } from "../state/reducers.ts/appReducer";
import { useAppDispatch } from "../state/store";

interface ISnackbarProps {
  visible: boolean;
  message: string;
  action: "error" | "info" | "sucsess";
}

const Snackbar = ({ action, message, visible }: ISnackbarProps) => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        dispatch(resetSnackbar());
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [dispatch, visible]);

  let backgroundColor;
  switch (action) {
    case "error":
      backgroundColor = "red";
      break;
    case "info":
      backgroundColor = "blue";
      break;
    case "sucsess":
      backgroundColor = "green";
      break;
    default:
      backgroundColor = "gray";
      break;
  }

  return (
    <div
      className={`snackbar ${visible && visible ? "show" : ""}`}
      style={{ backgroundColor }}
    >
      <h4 style={{ textTransform: "uppercase" }}>{message}</h4>
    </div>
  );
};

export default Snackbar;
