"use client";
import React from "react";
import { CELL_TYPES, ColumnBuilder } from "@/fwk/oTable";
import { OTable } from "@/fwk/oTable";
import { useRouter } from "next/navigation";

const Columns = [
  ColumnBuilder().id("label").name("Integration").width(400).build(),
  ColumnBuilder().id("status").name("Status").build(),
  ColumnBuilder()
    .id("lastSyncAt")
    .name("Last Successful update")
    .cellType(CELL_TYPES.DATE_TIME)
    .build(),
];

export default function Integration() {
  const [data, setData] = React.useState([]);
  const router = useRouter();

  React.useEffect(() => {
    fetch("/api/integration", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const openIntegration = (row: TSAny) => {
    router.push(`/integration/${row._id}`);
  };

  return (
    <OTable
      isFullWidthTable
      stickyHeader
      columns={Columns}
      data={data}
      onRowClick={openIntegration}
    />
  );
}
