import { Checkbox } from "@mui/material";
import { CHECKBOX_STATE } from "@/fwk/types/checkbox";
import React from "react";
import { Column } from "react-table";
import FixedPositionTooltip from "@/fwk/components/tooltip/fixedPositionTooltip";

interface Props {
  onRowSelect?: (row: TSAny, checked: boolean) => void;
  selectAllState?: CHECKBOX_STATE;
  onSelectAll?: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
}

const CheckboxRenderer = React.forwardRef(
  (
    props: {
      row: TSAny;
      disabled?: boolean;
      onChange: (row: TSAny, checked: boolean) => void;
    },
    ref
  ) => {
    const onChange = (e: React.ChangeEvent<any>) => {
      e.stopPropagation();
      props.onChange(props.row.original, e.target.checked);
    };

    const onClick = (e: React.ChangeEvent<any>) => {
      e.stopPropagation();
    };

    return (
      <Checkbox
        color="primary"
        disabled={props.disabled}
        checked={props.row.original.isSelected}
        onChange={onChange}
        onClick={onClick}
        style={{ padding: 0 }}
      />
    );
  }
);

CheckboxRenderer.displayName = "CheckboxRenderer";

const getSelectorColumnPlugin = (props: Props) => (hooks: TSFixMe) => {
  const onChange = (e: React.ChangeEvent<any>) => {
    e.stopPropagation();
    props.onSelectAll?.(e, e.target.checked);
  };

  const onClick = (e: React.ChangeEvent<any>) => {
    e.stopPropagation();
  };

  hooks.visibleColumns.push((columns: Column<any>[]) => [
    {
      id: "row-selection",
      Header: () => (
        <FixedPositionTooltip title="Select">
          <Checkbox
            color="primary"
            checked={
              props.selectAllState === CHECKBOX_STATE.SELECTED ||
              props.selectAllState === CHECKBOX_STATE.INDETERMINATE
            }
            indeterminate={
              props.selectAllState === CHECKBOX_STATE.INDETERMINATE
            }
            onChange={onChange}
            onClick={onClick}
            style={{ padding: 0 }}
          />
        </FixedPositionTooltip>
      ),
      Cell: ({ row }: { row: TSAny }) => (
        <FixedPositionTooltip title="Select">
          <div>
            <CheckboxRenderer
              {...row.getToggleRowSelectedProps()}
              onChange={props.onRowSelect}
              row={row}
            />
          </div>
        </FixedPositionTooltip>
      ),
      DisabledCell: ({ row }: { row: TSAny }) => (
        <FixedPositionTooltip title={row?.original?.disableReason}>
          <div>
            <CheckboxRenderer
              disabled
              {...row.getToggleRowSelectedProps()}
              row={row}
            />
          </div>
        </FixedPositionTooltip>
      ),
      width: 75,
      sticky: "left",
      disableSortBy: true,
    },
    ...columns,
  ]);
};

export default getSelectorColumnPlugin;
