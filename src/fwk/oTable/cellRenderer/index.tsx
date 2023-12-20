"use client";
import * as React from "react";
import { CELL_TYPES } from "@/fwk/types";
//import { Avatar } from "@/fwk/components/common";
//import { getUser } from "@/fwk/utils"; // ToDo
import { Tooltip } from "@mui/material";
//import InlineEditableText from "../../common/inlineEditableText";
import { copyToClipboard, highlight, snakeCaseToWords } from "@/fwk/utils";
import Date from "./dateCell";
//import { NotifySuccess } from "@/fwk/notifications";
import RichTextContent from "@/fwk/components/form/richText/richTextContent";

export const EmptyCellRenderer = () => <span className="text-info">-</span>;

type CellRenderer = {
  [keys in CELL_TYPES]: ({ cell, rowData, searchKeyword }: TSAny) => TSAny;
};
export const CellRenderer: CellRenderer = {
  [CELL_TYPES.DATE]: ({ cell, rowData }: TSAny) => {
    const date = cell.column.accessor(rowData);
    return date ? (
      <Date
        date={date}
        style={cell.column.style}
        className={cell.column.className}
        showTime={false}
      />
    ) : (
      <EmptyCellRenderer />
    );
  },
  [CELL_TYPES.DATE_TIME]: ({ cell, rowData }) => {
    const date = cell.column.accessor(rowData);
    return date ? (
      <Date
        date={date}
        style={cell.column.style}
        className={cell.column.className}
        showTime
      />
    ) : (
      <EmptyCellRenderer />
    );
  },
  [CELL_TYPES.EDIT_TEXT]: ({ cell, rowData }) => null,
  [CELL_TYPES.USER]: ({ cell, rowData }) => null,
  [CELL_TYPES.BOOLEAN]: ({ cell, rowData }) => null,
  [CELL_TYPES.WORKSPACES]: ({ cell, rowData }) => null,

  // [CELL_TYPES.EDIT_TEXT]: ({ cell, rowData }) => (
  //   <InlineEditableText
  //     label={cell.column.name as string}
  //     initialValue={cell.column.accessor(rowData) as string}
  //     onSave={cell.column.getOnSave(rowData)}
  //   />
  // ),
  // [CELL_TYPES.USER]: ({ cell, rowData, searchKeyword }) => {
  //   const userId = cell.column.accessor(rowData);
  //   const user = userId && getUser(userId);
  //   return user ? (
  //     <div className="center-y w-full">
  //       <Avatar name={user.name} src={user.avatar} size={25} shape="round" />
  //       {searchKeyword ? (
  //         <div
  //           className="ml-5 t-body2 truncate content-highlight"
  //           dangerouslySetInnerHTML={{
  //             __html: highlight(
  //               user.name,
  //               [{ text: searchKeyword, ignoreCase: true }],
  //               true
  //             ),
  //           }}
  //         />
  //       ) : (
  //         <div className="ml-5 t-body2 truncate">{user.name}</div>
  //       )}
  //     </div>
  //   ) : (
  //     <EmptyCellRenderer />
  //   );
  // },
  [CELL_TYPES.TEXT]: ({ cell, rowData, searchKeyword }) => {
    const value = cell.column.accessor(rowData);
    if (!value && value !== 0) {
      return <EmptyCellRenderer />;
    }
    return (
      <Tooltip title={value || "-"}>
        {searchKeyword ? (
          <div
            className="truncate content-highlight"
            dangerouslySetInnerHTML={{
              __html: highlight(
                value,
                [{ text: searchKeyword, ignoreCase: true }],
                true
              ),
            }}
          />
        ) : (
          <div className="truncate">{value}</div>
        )}
      </Tooltip>
    );
  },
  [CELL_TYPES.RICH_TEXT]: ({ cell, rowData }) => {
    const value = cell.column.accessor(rowData);
    if (value) {
      return (
        <Tooltip title={<RichTextContent content={value} />}>
          <div className="line-clamp-1">
            <RichTextContent content={value} />
          </div>
        </Tooltip>
      );
    }
    return <EmptyCellRenderer />;
  },
  [CELL_TYPES.EMAIL]: ({ cell, rowData, searchKeyword }) => {
    const value = cell.column.accessor(rowData);
    if (value) {
      return (
        <Tooltip title={value ? `${value} (Click to Copy)` : "-"}>
          {searchKeyword ? (
            <div
              className="truncate content-highlight"
              dangerouslySetInnerHTML={{
                __html: highlight(
                  value,
                  [{ text: searchKeyword, ignoreCase: true }],
                  true
                ),
              }}
              onClick={(event) => {
                //NotifySuccess("Email copied to clipboard");
                event.stopPropagation();
                copyToClipboard(value);
              }}
            />
          ) : (
            <div
              className="truncate"
              onClick={(event) => {
                //NotifySuccess("Email copied to clipboard");
                event.stopPropagation();
                copyToClipboard(value);
              }}
            >
              {value}
            </div>
          )}
        </Tooltip>
      );
    }
    return <EmptyCellRenderer />;
  },
  [CELL_TYPES.ENUM]: ({ cell, rowData, searchKeyword }) => {
    const value = cell.column.accessor(rowData);
    if (value) {
      return (
        <Tooltip title={value || "-"}>
          {searchKeyword ? (
            <div
              className="truncate content-highlight"
              dangerouslySetInnerHTML={{
                __html: highlight(
                  snakeCaseToWords(value)!,
                  [{ text: searchKeyword, ignoreCase: true }],
                  true
                ),
              }}
            />
          ) : (
            <div className="truncate">{snakeCaseToWords(value)}</div>
          )}
        </Tooltip>
      );
    }
    return <EmptyCellRenderer />;
  },
  [CELL_TYPES.DISABLED]: () => {
    return <EmptyCellRenderer />;
  },
};
