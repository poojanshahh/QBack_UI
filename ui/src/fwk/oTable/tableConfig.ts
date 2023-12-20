"use client";
import _cloneDeep from "lodash/cloneDeep";
import _isNumber from "lodash/isNumber";
import React from "react";
import { Column, CELL_TYPES, Row } from "@/fwk/types";
import { CellRenderer } from "./cellRenderer";

function ColumnBuilder(initialConfig?: Column) {
  const column: Column = initialConfig ? _cloneDeep(initialConfig) : <Column>{};

  return {
    id(v: string) {
      column.id = v;
      return this;
    },

    dataKey(v: string) {
      column.accessor = v;
      return this;
    },

    accessor(v: (row: Row, rowIndex: number) => any) {
      column.accessor = v;
      return this;
    },

    name(v: React.ReactNode) {
      column.Header = v;
      return this;
    },

    description(v: string) {
      column.description = v;
      return this;
    },

    nameComponent(v: React.ReactNode) {
      column.Header = v;
      return this;
    },

    disableResizing() {
      column.disableResizing = true;
      return this;
    },

    width(v?: number) {
      _isNumber(v) && (column.width = v);
      return this;
    },

    minWidth(v: number) {
      column.minWidth = v;
      return this;
    },

    maxWidth(v: number) {
      column.maxWidth = v;
      return this;
    },

    allowSorting() {
      column.disableSortBy = false;
      return this;
    },

    hidden(v: boolean) {
      column.hidden = v;
      return this;
    },

    component(v: (data: any) => React.ReactNode) {
      column.Cell = v;
      return this;
    },

    groupedComponent(v: (data: any) => React.ReactNode) {
      column.GroupedCell = v;
      return this;
    },

    disabledComponent(v: (data: any) => React.ReactNode) {
      column.DisabledCell = v;
      return this;
    },

    aggregateValue(v: string) {
      column.aggregateValue = v;
      return this;
    },

    cellType(v: CELL_TYPES) {
      column.Cell = CellRenderer[v];
      return this;
    },

    className(v: string) {
      column.className = v;
      return this;
    },

    sortFunction(v: (key: string, order: string) => any) {
      column.sortFunction = v;
      return this;
    },

    togglingDisabled() {
      column.togglingDisabled = true;
      return this;
    },

    disableGroupBy() {
      column.disableGroupBy = true;
      return this;
    },

    sticky(v: "left" | "right") {
      column.sticky = v;
      return this;
    },

    // deprecated
    style(v: React.CSSProperties) {
      column.style = v;
      return this;
    },

    align(v: "left" | "right" | "center") {
      column.align = v;
      return this;
    },

    wordWrapEnabled() {
      column.wordWrapEnabled = true;
      return this;
    },

    build() {
      !column.accessor && this.dataKey(column.id);
      !column.align && this.align("left");
      column.disableSortBy !== false && (column.disableSortBy = true);
      !column.Cell && (column.Cell = CellRenderer[CELL_TYPES.TEXT]);
      !column.DisabledCell &&
        (column.DisabledCell = CellRenderer[CELL_TYPES.DISABLED]);
      !column.GroupedCell &&
        column.Cell &&
        this.groupedComponent(({ row }) =>
          column.Cell!({
            row: row.subRows[0],
            rowData: row.subRows[0].original,
          })
        );
      return column;
    },
  };
}

interface TableConfig {
  columns: Column[];
  showColumnToggle?: boolean;
}

function TableConfigBuilder(initialConfig?: TableConfig) {
  const config: TableConfig = initialConfig
    ? _cloneDeep(initialConfig)
    : {
        columns: [],
      };

  return {
    addActionColumn(column: Column, index?: number) {
      this.addColumn(
        {
          ...column,
          DisabledCell: column.Cell,
          isActionColumn: true,
          width: !column.width || column.width === "auto" ? 60 : column.width,
          style: { ...column.style, padding: 0, textAlign: "center" },
          disableResizing: true,
        },
        index
      );
      return this;
    },

    addColumn(column: Column, index?: number) {
      if (!column) return this;
      config.columns.splice(
        _isNumber(index) ? index : config.columns.length,
        0,
        column
      );
      return this;
    },

    showColumnToggle() {
      config.showColumnToggle = true;
      return this;
    },

    build() {
      return config;
    },
  };
}

function buildColumn(
  initialConfig: Column & {
    name: React.ReactNode;
    component: (data: any) => React.ReactNode;
  }
) {
  if (!initialConfig) return null;
  // let Cell = initialConfig.Cell ||
  let Cell = initialConfig.component;
  const Header = initialConfig.Header || initialConfig.name;
  if (!Cell && initialConfig.cellType) {
    Cell = CellRenderer[initialConfig.cellType];
  }
  return ColumnBuilder({
    ...initialConfig,
    ...(Header ? { Header } : {}),
    ...{ Cell },
  }).build();
}

export { CELL_TYPES, TableConfigBuilder, ColumnBuilder, buildColumn };
