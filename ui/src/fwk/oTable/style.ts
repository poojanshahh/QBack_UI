"use client";

import { styled } from "@mui/material/styles";
import { Theme } from "@mui/material";

const PREFIX = "OTable";

export const classes = {
  tableContainer: `${PREFIX}-tableContainer`,
  tableContainerWithActions: `${PREFIX}-tableContainerWithActions`,
  cellGrow: `${PREFIX}-cellGrow`,
  cell: `${PREFIX}-cell`,
  body: `${PREFIX}-body`,
  flexImportant: `${PREFIX}-flexImportant`,
  excluded: `${PREFIX}-excluded`,
  header: `${PREFIX}-header`,
  sticky: `${PREFIX}-sticky`,
  rowHover: `${PREFIX}-rowHover`,
  row: `${PREFIX}-row`,
  coloredRow: `${PREFIX}-coloredRow`,
  disabledRow: `${PREFIX}-disabledRow`,
  overflowingTable: `${PREFIX}-overflowingTable`,
  leftOverflowingTable: `${PREFIX}-leftOverflowingTable`,
  visibleOnHover: `${PREFIX}-visibleOnHover`,
};

export const Root = styled("div")(({ theme: Theme }) => ({
  [`& .${classes.tableContainer}`]: {
    scrollBehavior: "smooth",
  },

  [`& .${classes.tableContainerWithActions}`]: {
    height: `calc(100% - 56px)`,
  },

  [`& .${classes.cellGrow}`]: {
    flex: "1 0 0% !important",
  },

  [`& .${classes.cell}`]: {
    paddingTop: "4px !important",
    paddingBottom: "4px !important",
    display: "flex !important",
    minHeight: "48px",
    alignItems: "center",
  },

  [`& .${classes.flexImportant}`]: {
    display: "flex !important",
  },

  [`& .${classes.excluded}`]: {
    background: "rgba(255,0,0,0.1) !important",
    textDecoration: "line-through",
  },

  [`& .${classes.header}`]: {
    zIndex: 4,
  },

  [`& .${classes.sticky}`]: {
    "& > $header": {
      position: "sticky",
      zIndex: 4,
      width: "fit-content",
      top: 0,
    },

    "& [data-sticky-td]": {
      position: "sticky",
    },

    // '& [data-sticky-last-left-td]': {
    //   boxShadow: '2px 0px 3px #ccc',
    // },

    // '& [data-sticky-first-right-td]': {
    //   boxShadow: '-2px 0px 3px #ccc',
    // },
  },

  [`& .${classes.rowHover}`]: {
    [`&:hover > .${classes.cell}`]: {
      backgroundColor: "var(--bg-hover)",
    },
  },

  [`& .${classes.row}`]: {
    "&:hover > $visibleOnHover": {
      opacity: 1,
      "& *": {
        opacity: 1,
      },
    },
  },

  [`& .${classes.coloredRow}`]: {
    [`& > .${classes.cell}`]: {
      backgroundColor: "var(--row-alternate-bg)",
    },
  },

  [`& .${classes.disabledRow}`]: {
    [`& > .${classes.cell}`]: {
      opacity: 0.5,
      cursor: "not-allowed",
    },
  },

  [`& .${classes.overflowingTable}`]: {
    boxShadow: "inset -50px 0 25px -25px rgba(0, 0, 0, 25%)",
    width: "50px",
    zIndex: 10,
    opacity: 0.5,
  },

  [`& .${classes.leftOverflowingTable}`]: {
    boxShadow: "inset 50px 0 25px -25px rgba(0, 0, 0, 25%)",
    width: "50px",
    zIndex: 10,
    opacity: 0.5,
  },

  [`& .${classes.visibleOnHover}`]: {
    opacity: 0.9,
    "& *": {
      opacity: 0,
    },
  },
}));
