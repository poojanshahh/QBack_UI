import React from "react";
import { TableCell } from "@mui/material";
import ChevronBottom from "@mui/icons-material/KeyboardArrowDown";
import ChevronRight from "@mui/icons-material/ChevronRight";
import cx from "classnames";
import { Row, Cell } from "@/fwk/types";

interface Props {
  row: Row;
  cell: Cell;
  isDisabled?: boolean;
  className?: string;
  searchKeyword?: string;
}

const OGroupedCell: React.FC<Props> = (props) => {
  const { row, cell } = props;
  return (
    <div className="flex center-y">
      <div {...row.getToggleRowExpandedProps()} className="flex">
        {row.isExpanded ? (
          <ChevronBottom fontSize="small" />
        ) : (
          <ChevronRight fontSize="small" />
        )}
      </div>
      {cell.render("GroupedCell")}
      <span className="text-secondary t-caption ml-5">
        ({row.subRows.length})
      </span>
    </div>
  );
};

const OTableCell: React.FC<Props> = (props) => {
  const { row, cell, className, isDisabled } = props;
  const cellClassName = cx("center-y", className);
  return (
    <TableCell {...cell.getCellProps()} className={cellClassName}>
      {cell.isGrouped ? (
        <OGroupedCell {...props} />
      ) : isDisabled ? (
        cell.render("DisabledCell", {
          rowData: row.original,
          searchKeyword: props.searchKeyword,
        })
      ) : cell.isAggregated ? (
        cell.render("Aggregated")
      ) : (
        cell.render("Cell", {
          rowData: row.original,
          searchKeyword: props.searchKeyword,
        })
      )}
    </TableCell>
  );
};

export default OTableCell;
