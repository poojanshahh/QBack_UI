// create a form to add a new intel using material-ui form components and react-hook-form (https://react-hook-form.com/) for validation and state management of these input fields
// title, content, type, and source are all required fields
// type and source are both select fields
// type has 3 options: "text", "audio", and "image"
// source has 2 options: "zoom", "slack", "email", "g2", "CRM", "blog", "website", "other"
// create a button to submit the form
// when the form is submitted, make a POST request to the API to create a new intel
// the API will return the new intel object
// add the new intel to the list of intels
// clear the form
// redirect to the new intel's page

// Path: ui/src/app/intel/page.tsx

"use client";
import React from "react";
import { useFormik } from "formik";
import { Input, Select, MenuItem, Button, TextField } from "@mui/material";
//import { Intel } from "types";

const types = ["text", "audio", "image"];
const sources = [
  "zoom",
  "slack",
  "email",
  "g2",
  "CRM",
  "blog",
  "website",
  "other",
];

export default function IntelForm() {
  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      type: "",
      source: "",
    },
    onSubmit: (values) => {
      createIntel(values);
    },
  });

  const createIntel = (data: TSAny) => {
    fetch("/api/intel", {
      method: "POST",
      body: JSON.stringify(data),
      cache: "no-cache",
      headers: {},
    })
      .then((res) => res.json())
      .then((intel) => {
        console.log(intel);
      });
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Input
        name="title"
        placeholder="Title"
        value={formik.values.title}
        onChange={formik.handleChange}
      />
      <Input
        name="content"
        placeholder="Content"
        value={formik.values.content}
        onChange={formik.handleChange}
      />
      <TextField
        name="type"
        select
        label="Type"
        value={formik.values.type}
        onChange={formik.handleChange}
        margin="normal"
        fullWidth
      >
        {types.map((type) => (
          <MenuItem key={type} value={type}>
            {type}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        name="source"
        select
        label="Source"
        value={formik.values.source}
        onChange={formik.handleChange}
        margin="normal"
        fullWidth
      >
        {sources.map((source) => (
          <MenuItem key={source} value={source}>
            {source}
          </MenuItem>
        ))}
      </TextField>
      <Button type="submit">Submit</Button>
    </form>
  );
}
