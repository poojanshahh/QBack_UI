"use client";
import { styled } from "@mui/material/styles";
import React from "react";
import { Theme, TableCell, TableSortLabel, Tooltip } from "@mui/material";
import { Column } from "@/fwk/types";
import cx from "classnames";
import { withStopPropagation } from "@/fwk/utils";
import { Order } from "@/fwk/types/api";

const PREFIX = "OTableHeaderCell";

const classes = {
  flexImportant: `${PREFIX}-flexImportant`,
  headerCell: `${PREFIX}-headerCell`,
  resizer: `${PREFIX}-resizer`,
  visuallyHidden: `${PREFIX}-visuallyHidden`,
};

const StyledTableCell = styled(TableCell)(({ theme: Theme }) => ({
  [`&.${classes.flexImportant}`]: {
    display: "flex !important",
  },

  [`&.${classes.headerCell}`]: {
    paddingTop: "8px !important",
    paddingBottom: "8px !important",
    minHeight: "48px",
    fontWeight: "bold",
  },

  [`& .${classes.resizer}`]: {
    //background: theme.palette.divider,
    width: "2px",
    height: "20px",
    top: "50%",
    transform: "translate(50%, -50%)",
    zIndex: 4,
    "&.isResizing": {
      background: "var(--primary-main)",
    },
  },

  [`& .${classes.visuallyHidden}`]: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

interface Props {
  column: Column;
  enableResizingColumns?: boolean;
  showSortControllersInHeader?: boolean;
  enableSortBy?: boolean;
  className?: string;
  columnIndex: string | number;
  totalColumns: number;
  onSort?: (sortField: string, sortOrder: Order) => void;
  sortField?: string;
  sortOrder?: Order;
}

const getMaterialSortOrder = (sortOrder?: Order) =>
  sortOrder === Order.DESC ? "desc" : "asc";

const OTableHeaderCell = (props: Props) => {
  const { column, sortOrder, sortField } = props;

  const headerProps = column.getHeaderProps();

  const columnLabel = column.render("Header");

  const Header = column.description ? (
    <Tooltip title={column.description}>
      <span>{columnLabel}</span>
    </Tooltip>
  ) : (
    columnLabel
  );

  return (
    <StyledTableCell
      {...headerProps}
      key={headerProps.key}
      className={cx(
        "flex items-center truncate",
        classes.flexImportant,
        classes.headerCell,
        props.className
      )}
    >
      {props.enableSortBy &&
      props.showSortControllersInHeader &&
      !column.disableSortBy ? (
        <TableSortLabel
          active={sortField === column.id}
          direction={
            sortField === column.id ? getMaterialSortOrder(sortOrder) : "asc"
          }
          onClick={withStopPropagation(
            (e: React.SyntheticEvent<any> | undefined) => {
              const isAsc = sortField === column.id && sortOrder === Order.ASC;
              props.onSort?.(column.id, isAsc ? Order.DESC : Order.ASC);
            }
          )}
        >
          {Header}
          {sortField === column.id ? (
            <span className={classes.visuallyHidden}>
              {sortOrder === Order.DESC
                ? "sorted descending"
                : "sorted ascending"}
            </span>
          ) : null}
        </TableSortLabel>
      ) : (
        Header
      )}
      {props.enableResizingColumns &&
      props.columnIndex !== props.totalColumns - 1 &&
      !column.disableResizing ? (
        <div
          {...column.getResizerProps()}
          className={cx(
            classes.resizer,
            "inline-block absolute right-0 top-0",
            {
              isResizing: column.isResizing,
            }
          )}
        />
      ) : null}
    </StyledTableCell>
  );
};

export default OTableHeaderCell;
