"use client";

import React from "react";
import { useFormik } from "formik";
import {
  OutlinedInput,
  Button,
  TextField,
  MenuItem,
  InputLabel,
  Select,
  Chip,
  Box,
  FormControl,
} from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const sources = ["Competitor", "Insight"];

const Insightcolumns = [
  "Title",
  "Source",
  "Type",
  "Content",
  "Created At",
  "Updated At",
];

const Competitorcolumns = [
  "Name",
  "Website",
  "Location",
  "Industry",
  "Founded",
  "Revenue",
  "Employees",
  "Description",
  "Products",
  "Positioning",
  "Pricing",
  "Customers",
  "Compliance",
  "Contact Channels",
];

export default function AddView() {
  const formik = useFormik({
    initialValues: {
      title: "",
      source: "",
      columns: [],
    },
    onSubmit: (values) => {
      createView(values);
    },
  });

  const createView = (data: TSAny) => {
    fetch("/api/view", {
      method: "POST",
      body: JSON.stringify(data),
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((intel) => {
        console.log(intel);
      });
  };

  const renderColumns = (columns: string[]) => {
    return (
      <>
        <InputLabel id="column-multiple-chip-label">Columns</InputLabel>
        <Select
          labelId="column-multiple-chip-label"
          id="demo-simple-select"
          multiple
          name="columns"
          label="Columns"
          value={formik.values.columns}
          onChange={formik.handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {columns.map((column) => (
            <MenuItem key={column} value={column}>
              {column}
            </MenuItem>
          ))}
        </Select>
      </>
    );
  };

  return (
    <FormControl
      component={"form"}
      onSubmit={formik.handleSubmit}
      className="w-1/2 m-auto grid grid-cols-1 gap-8 mt-8"
    >
      <div className="text-lg font-bold text-gray-800">Add View</div>
      <OutlinedInput
        name="title"
        placeholder="Title"
        value={formik.values.title}
        onChange={formik.handleChange}
      />
      <TextField
        name="source"
        select
        label="Source"
        value={formik.values.source}
        onChange={formik.handleChange}
      >
        {sources.map((source) => (
          <MenuItem key={source} value={source}>
            {source}
          </MenuItem>
        ))}
      </TextField>
      {formik.values.source === "Competitor"
        ? renderColumns(Competitorcolumns)
        : renderColumns(Insightcolumns)}
      <Button type="submit">Submit</Button>
    </FormControl>
  );
}
