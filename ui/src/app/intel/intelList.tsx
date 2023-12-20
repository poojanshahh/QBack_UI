"use client";
import React from "react";
import { CELL_TYPES, ColumnBuilder } from "@/fwk/oTable";
import { OTable } from "@/fwk/oTable";
import { useRouter } from "next/navigation";

const Columns = [
  //ColumnBuilder().id("_id").name("ID").build(),
  ColumnBuilder().id("title").name("Title").build(),
  ColumnBuilder()
    .id("content")
    .name("Content")
    .cellType(CELL_TYPES.RICH_TEXT)
    .build(),
  ColumnBuilder().id("type").name("Type").build(),
  ColumnBuilder().id("source").name("Source").build(),
  //ColumnBuilder().id("summary").name("Summary").build(),
  ColumnBuilder()
    .id("createdAt")
    .name("Created At")
    .cellType(CELL_TYPES.DATE_TIME)
    .build(),
  ColumnBuilder()
    .id("updateAt")
    .name("Update At")
    .cellType(CELL_TYPES.DATE_TIME)
    .build(),
  ColumnBuilder().id("createdBy").name("Created By").build(),
  ColumnBuilder().id("updatedBy").name("Updated By").build(),
  //ColumnBuilder().id("deleted").name("Deleted").build(),
];

export default function Intel() {
  const [data, setData] = React.useState([]);
  const router = useRouter();

  React.useEffect(() => {
    fetch("/api/intel", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const openIntel = (row: TSAny) => {
    router.push(`/intel/${row._id}`);
  };

  return (
    <OTable stickyHeader columns={Columns} data={data} onRowClick={openIntel} />
  );
}
