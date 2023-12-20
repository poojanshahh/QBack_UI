import Tooltip, { TooltipProps } from "@mui/material/Tooltip";
import * as React from "react";

const FixedPositionTooltip: React.FC<TooltipProps> = (props) => {
  const { children } = props;
  return <Tooltip {...props}>{children || <div />}</Tooltip>;
};

export default FixedPositionTooltip;
