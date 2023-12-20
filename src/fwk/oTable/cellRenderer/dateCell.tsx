import * as React from "react";
import { formatDate } from "@/fwk/utils/formatDate";

interface Props {
  date: string;
  showTime?: boolean;
  className?: string;
  style?: object;
}

const DateCell: React.FC<Props> = ({ date, showTime, style, className }) => (
  <div style={style} className={className} title={formatDate(date, !showTime)}>
    {formatDate(date, !showTime)}
  </div>
);

export default DateCell;
