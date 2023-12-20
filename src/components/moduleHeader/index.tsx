import React from "react";
import { Button, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";

interface Props {
  title: string;
  subtitle?: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
}

export default function ModuleHeader(props: Props) {
  return (
    <div className="flex justify-between">
      <div>
        <Typography variant="h6">{props.title}</Typography>
        {props.subtitle && (
          <Typography variant="body2" sx={{ color: "var(--text-secondary)" }}>
            {props.subtitle}
          </Typography>
        )}
      </div>
      {props.action && (
        <div>
          <Button
            variant="contained"
            color="primary"
            size="small"
            disableElevation
            sx={{ textTransform: "none" }}
            startIcon={<Add />}
            href={props.action.href}
            onClick={props.action.onClick}
          >
            {props.action.label}
          </Button>
        </div>
      )}
    </div>
  );
}
