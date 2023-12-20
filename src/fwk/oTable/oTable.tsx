/* eslint-disable react/jsx-key */
"use client";

import MUITable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React from "react";
import {
  HeaderGroup,
  useTable,
  useResizeColumns,
  useBlockLayout,
  useGroupBy,
  useExpanded,
  useFlexLayout,
  useSortBy,
  Column as BaseColumn,
  actions,
  useRowSelect,
} from "react-table";
import { Theme, Tooltip } from "@mui/material";
import cx from "classnames";
import _filter from "lodash/filter";
import _includes from "lodash/includes";
import _map from "lodash/map";
import _isFunction from "lodash/isFunction";
import { Cell, Row, Column } from "@/fwk/types";
import { Order } from "@/fwk/types/api";
import Image from "next/image";
import OTableCell from "./oTableCell";
import OTableHeaderCell from "./oTableHeaderCell";
import Loader from "@/fwk/components/loader";
import useSticky from "./tableHooks/useSticky";
import getSelectorColumnPlugin from "./tableHooks/useSelectorColumn";
// import OActionBar, {
//   ACTION_BAR_HEIGHT,
// } from "app/components/common/oActionBar";
import { ChevronRightOutlined } from "@mui/icons-material";
import { ChevronLeftOutlined } from "@mui/icons-material";
import { scrollTo } from "@/fwk/utils";
import { CHECKBOX_STATE } from "@/fwk/types/checkbox";
import { classes, Root } from "./style";

const ACTION_BAR_HEIGHT = 80;

export type ColumnAction = {
  type: string;
  payload: any;
};

interface Props {
  columns: Column[];
  data: any[];
  shouldDisableCell?: (row: any, column: Column) => boolean;
  groupBy?: string[];
  enableSortBy?: boolean;
  enableGroupBy?: boolean;
  enableResizingColumns?: boolean;
  enableInfiniteScroll?: boolean;
  onRowClick?: (rowData: any, row?: any) => void;
  onRowSelect?: (row: TSAny, checked: boolean) => void;
  isFullWidthTable?: boolean;
  enableItemsVisibilitySwitch?: boolean;
  enableKeywordSearch?: boolean;
  collapsibleSearchBox?: boolean;
  highlightRowIds?: string[];
  stickyHeader?: boolean;
  showActionBar?: boolean;
  actionBarMidSection?: React.ReactNode;
  fetchAllColumns?(keyword?: string, page?: number): Promise<TSAny[]>;
  updateVisibleColumns?: (v: string[]) => any;
  onSearchChange?: (keyword?: string) => void;
  visibleColumns?: string[];
  isLoading?: boolean;
  isLoadingMore?: boolean;
  onScroll?: (ref: HTMLElement) => void;
  onSort?: (sortField: string, sortOrder: Order) => void;
  sortField?: string;
  sortOrder?: Order;
  // these props will add html attributes to header and each row of table. Used in print export
  headerHTMLAttributes?: any;
  getRowHTMLAttributes?: (rowData: any, row: any) => any;
  updateColumnWidths?: (v: Map<string, number>) => any;
  searchKeyword?: string;
  enableRowSelection?: boolean;
  cellClassName?: string;
  selectAllState?: CHECKBOX_STATE;
  onSelectAll?: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
  tableClassName?: string;
}

const getInitialHiddenColumns = (columns: Column[]) =>
  _map(
    _filter(columns, (column) => column.hidden),
    "id"
  );

const OTable = (props: Props) => {
  const [isTableOverflowing, setIsTableOverflowing] = React.useState(false);
  const [isTableOnRightMost, setIsTableRightMost] = React.useState(false);
  const [isTableOnLeftMost, setIsTableLeftMost] = React.useState(false);
  const { columns, data, groupBy = [], cellClassName } = props;

  const tableCtnRef = React.useRef<HTMLDivElement>({} as HTMLDivElement);
  const tableRef = React.useRef<HTMLTableElement>({} as HTMLTableElement);

  const checkIfTableRightMost = () =>
    tableCtnRef.current?.scrollWidth - tableCtnRef.current?.scrollLeft ===
    tableCtnRef.current?.clientWidth;

  const checkIfTableLeftMost = () => tableCtnRef.current?.scrollLeft === 0;

  const handleScroll = () => {
    setIsTableRightMost(checkIfTableRightMost());
    setIsTableLeftMost(checkIfTableLeftMost());
    props.enableInfiniteScroll && props?.onScroll?.(tableCtnRef.current);
  };

  const onScrollToRight = () => {
    tableCtnRef.current &&
      scrollTo(tableCtnRef.current, { left: tableCtnRef.current.scrollWidth });
  };
  const onScrollToLeft = () => {
    tableCtnRef.current && scrollTo(tableCtnRef.current, { left: 0 });
  };

  const setOverflowingState = () => {
    if (tableRef?.current?.clientWidth > tableCtnRef?.current?.clientWidth) {
      setIsTableOverflowing(true);
      setIsTableRightMost(checkIfTableRightMost());
      setIsTableLeftMost(checkIfTableLeftMost());
    } else {
      setIsTableOverflowing(true);
      setIsTableRightMost(checkIfTableRightMost());
      setIsTableLeftMost(checkIfTableLeftMost());
    }
  };

  React.useEffect(setOverflowingState, [tableRef?.current?.clientWidth]);

  React.useEffect(setOverflowingState, []);

  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 30,
      width:
        props.isFullWidthTable && !props.enableResizingColumns
          ? undefined
          : 190,
      maxWidth: 700,
      Aggregated: () => null,
    }),
    [props.isFullWidthTable, props.enableResizingColumns]
  );

  const stateReducer = (newState: TSFixMe, action: TSFixMe) => {
    if (action.type === actions.columnDoneResizing) {
      props.updateColumnWidths?.(newState.columnResizing.columnWidths);
    }
    return newState;
  };

  const { getTableProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns: columns as BaseColumn<any>[],
      data,
      defaultColumn,
      manualSortBy: props.enableSortBy,
      disableMultiSort: true,
      disableSortBy: !props.enableSortBy,
      initialState: {
        hiddenColumns: getInitialHiddenColumns(columns),
        groupBy,
      },
      disableGroupBy: !props.enableGroupBy,
      disableResizing: !props.enableResizingColumns,
      disableSticky: !props.isFullWidthTable,
      stateReducer,
      disableRowSelect: true,
    } as TSAny,
    useGroupBy,
    useSortBy,
    useExpanded, // use groupBy would be almost useless without this one
    props.enableRowSelection ? useRowSelect : (hooks) => hooks,
    props.enableRowSelection
      ? getSelectorColumnPlugin(props)
      : (hooks) => hooks,
    props.isFullWidthTable && !props.enableResizingColumns
      ? useFlexLayout
      : useBlockLayout,
    useResizeColumns,
    useSticky
  );
  const shouldShowActionBar =
    props.showActionBar &&
    (props.enableKeywordSearch ||
      props.enableItemsVisibilitySwitch ||
      props.actionBarMidSection);

  // Render the UI for your table
  return (
    <Root className="relative h-full w-full">
      {shouldShowActionBar
        ? null
        : // <OActionBar
          //   fetchAllItems={props.fetchAllColumns}
          //   updateVisibleItems={props.updateVisibleColumns}
          //   visibleItems={props.visibleColumns}
          //   enableItemsVisibilitySwitch={props.enableItemsVisibilitySwitch}
          //   enableKeywordSearch={props.enableKeywordSearch}
          //   collapsibleSearchBox={props.collapsibleSearchBox}
          //   onSearchChange={props.onSearchChange}
          //   searchKeyword={props.searchKeyword}
          //   midSection={props.actionBarMidSection}
          // />
          null}
      <div
        className={cx("overflow-y-auto w-full", classes.tableContainer, {
          [classes.tableContainerWithActions]: shouldShowActionBar,
          "h-full": !shouldShowActionBar,
        })}
        ref={tableCtnRef}
        onScroll={handleScroll}
      >
        <MUITable
          {...getTableProps()}
          className={cx(props.tableClassName, {
            [classes.sticky]: isTableOverflowing,
          })}
          ref={tableRef}
        >
          <TableHead {...props.headerHTMLAttributes} className={classes.header}>
            {headerGroups.map((headerGroup: HeaderGroup) => (
              <TableRow
                {...headerGroup.getHeaderGroupProps()}
                className={cx(classes.row, classes.header, "bg-paper", {
                  "sticky top-0": props.stickyHeader,
                })}
              >
                {headerGroup.headers.map((column: any, index) => (
                  <OTableHeaderCell
                    column={column}
                    className={cx(cellClassName, {
                      [classes.visibleOnHover]:
                        isTableOverflowing &&
                        !isTableOnRightMost &&
                        column?.isActionColumn &&
                        index === headerGroup.headers.length - 1,
                      [classes.cellGrow]:
                        props.isFullWidthTable && !column.width,
                    })}
                    enableResizingColumns={props.enableResizingColumns}
                    enableSortBy={props.enableSortBy}
                    showSortControllersInHeader
                    columnIndex={index}
                    totalColumns={headerGroup.headers.length}
                    sortField={props.sortField}
                    sortOrder={props.sortOrder}
                    onSort={props.onSort}
                  />
                ))}
              </TableRow>
            ))}
          </TableHead>
          {props.isLoading ? (
            <Loader className="h-full" />
          ) : !rows.length ? (
            <div className="center-x-y h-full">
              <div>
                <Image
                  alt="No Data"
                  width="150"
                  height="150"
                  src="/no-data.svg"
                />
                <div className="text-center">No data found</div>
              </div>
            </div>
          ) : (
            <TableBody className={classes.body}>
              {rows.map((row: TSAny, i: number) => {
                prepareRow(row);
                return (
                  <div
                    className={cx("relative", {
                      "pointer-events-none": row?.original?.disabled,
                      cp:
                        !row?.original?.disabled &&
                        _isFunction(props.onRowClick),
                    })}
                    onClick={() => {
                      if (row.original?.disabled) {
                        return null;
                      }
                      props.onRowClick?.(row.original, row);
                    }}
                  >
                    <TableRow
                      {...row.getRowProps()}
                      {...props.getRowHTMLAttributes?.(row.original, row)}
                      className={cx(classes.row, {
                        //[classes.coloredRow]: i % 2 !== 0,
                        [classes.rowHover]:
                          !row?.original?.disabled &&
                          _isFunction(props.onRowClick),
                        cp:
                          !row?.original?.disabled &&
                          _isFunction(props.onRowClick),
                        [classes.disabledRow]: row?.original?.disabled,
                      })}
                    >
                      {row.cells.map((cell: Cell, index: number) => {
                        const column = cell.column as any;
                        return (
                          <OTableCell
                            row={row}
                            cell={cell}
                            className={cx(
                              classes.cell,
                              {
                                [classes.visibleOnHover]:
                                  isTableOverflowing &&
                                  !isTableOnRightMost &&
                                  column?.isActionColumn &&
                                  index === row.cells.length - 1,
                                [classes.cellGrow]:
                                  props.isFullWidthTable && !cell.column.width,
                                "bg-white": !row?.original?.disabled,
                                "bg-lightest": row?.original?.disabled,
                              },
                              column?.className,
                              row.original?.rowCellClass,
                              cellClassName
                            )}
                            isDisabled={props.shouldDisableCell?.(
                              row.original,
                              cell.column as any
                            )}
                            searchKeyword={props.searchKeyword}
                          />
                        );
                      })}
                    </TableRow>
                    <div
                      className={cx(
                        "absolute top-0 left-0 w-full h-full z-3 pointer-events-none",
                        {
                          "fade-highlight": _includes(
                            props.highlightRowIds,
                            row?.original?.id
                          ),
                        }
                      )}
                    ></div>
                  </div>
                );
              })}
              {props.enableInfiniteScroll && props.isLoadingMore ? (
                <TableRow
                  className={cx(classes.row, "pointer-events-none center-x-y")}
                >
                  <Loader />
                </TableRow>
              ) : null}
            </TableBody>
          )}
        </MUITable>
        {isTableOverflowing && !isTableOnRightMost && data.length ? (
          <div
            className={cx(
              "absolute right-0 bottom-0 pointer-events-none",
              classes.overflowingTable
            )}
            style={{ top: shouldShowActionBar ? ACTION_BAR_HEIGHT : 0 }}
          >
            <div
              className="absolute center-x-y cp pointer-events-auto"
              style={{ height: 48, width: 48 }}
              onClick={onScrollToRight}
            >
              <Tooltip title="Scroll right to see more columns">
                <ChevronRightOutlined htmlColor="var(--primary-main)" />
              </Tooltip>
            </div>
          </div>
        ) : null}
        {isTableOverflowing && !isTableOnLeftMost && data.length ? (
          <div
            className={cx(
              "absolute left-0 bottom-0 pointer-events-none",
              classes.leftOverflowingTable
            )}
            style={{ top: shouldShowActionBar ? ACTION_BAR_HEIGHT : 0 }}
          >
            <div
              className="absolute center-x-y cp pointer-events-auto"
              style={{ height: 48, width: 48 }}
              onClick={onScrollToLeft}
            >
              <Tooltip title="Scroll right to see more columns">
                <ChevronLeftOutlined htmlColor="var(--primary-main)" />
              </Tooltip>
            </div>
          </div>
        ) : null}
      </div>
    </Root>
  );
};

export default OTable;
