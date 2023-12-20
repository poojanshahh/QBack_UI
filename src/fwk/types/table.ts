"use client";
import {
  UseExpandedRowProps,
  UseGroupByRowProps,
  UseRowStateRowProps,
  UseRowSelectRowProps,
  UseGroupByCellProps,
  UseRowStateCellProps,
  UseTableCellProps,
  UseFiltersColumnProps,
  UseResizeColumnsColumnProps,
  UseGroupByColumnProps,
  UseSortByColumnProps,
  UseTableColumnProps,
  UseTableRowProps,
} from "react-table";

export enum CELL_TYPES {
  DATE = "DATE",
  DATE_TIME = "DATE_TIME",
  EDIT_TEXT = "EDIT_TEXT",
  RICH_TEXT = "RICH_TEXT",
  WORKSPACES = "WORKSPACES",
  USER = "USER",
  BOOLEAN = "BOOLEAN",
  TEXT = "TEXT",
  ENUM = "ENUM",
  EMAIL = "EMAIL",
  DISABLED = "DISABLED",
}

export interface Row<
  D extends Record<string, unknown> = Record<string, unknown>
> extends UseTableRowProps<D>,
    UseExpandedRowProps<D>,
    UseGroupByRowProps<D>,
    UseRowSelectRowProps<D>,
    UseRowStateRowProps<D> {}

export interface Cell<
  D extends Record<string, unknown> = Record<string, unknown>
> extends UseTableCellProps<D>,
    UseGroupByCellProps<D>,
    UseRowStateCellProps<D> {}

export interface Column<
  D extends Record<string, unknown> = Record<string, unknown>
> extends UseTableColumnProps<D>,
    UseFiltersColumnProps<D>,
    UseGroupByColumnProps<D>,
    UseResizeColumnsColumnProps<D>,
    UseSortByColumnProps<D> {
  id: string; // column id
  accessor: string | Function; // For directly getting value from datum using key. If Component is present dataKey will not be used
  Header?: React.ReactNode | ((v?: any) => React.ReactNode) | string;
  description?: string;
  width?: number | string;
  minWidth?: number;
  maxWidth?: number;
  disableSortBy?: boolean;
  disableGroupBy?: boolean;
  Cell?(datum: any, columnProps?: any): React.ReactNode; // will take the row data and return component for column
  GroupedCell?(datum: TSFixMe): React.ReactNode; // will take the row data and return component for column
  DisabledCell?(datum: any, columnProps?: any): React.ReactNode;
  hidden?: boolean;
  cellType?: CELL_TYPES;
  style?: React.CSSProperties;
  className?: string;
  sortFunction?(key: string, order: string): any;
  align?: "left" | "right" | "center";
  wordWrapEnabled?: boolean;
  togglingDisabled?: boolean;
  isActionColumn?: boolean;
  sticky?: "left" | "right";
  aggregateValue?: string;
  disableResizing?: boolean;
}
