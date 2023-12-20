import * as React from "react";
import classNames from "classnames";
import CircularProgress from "@mui/material/CircularProgress";

interface Props {
  size?: number;
  style?: object;
  className?: any;
  message?: React.ReactNode;
}

const Loader: React.FC<Props> = (props) => (
  <div
    className={classNames("center-x-y flex-col", props.className)}
    style={{ minHeight: props.size || 50, ...props.style }}
  >
    <CircularProgress size={props.size} />
    {props.message && <div>{props.message}</div>}
  </div>
);

export default Loader;
