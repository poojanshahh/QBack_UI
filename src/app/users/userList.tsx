"use client";
import React from "react";
import { CELL_TYPES, ColumnBuilder } from "@/fwk/oTable";
import { OTable } from "@/fwk/oTable";
import { useRouter } from "next/navigation";

const UserColumns = [
    ColumnBuilder().id("username").name("Username").width(200).build(),
    ColumnBuilder().id("name").name("Name").build(),
    ColumnBuilder().id("role").name("Role").build(),
];

export default function UserList() {
    const [userData, setUserData] = React.useState([]);
    const router = useRouter();

    React.useEffect(() => {
        fetch("/api/users", {
        method: "GET",
        })
        .then((res) => res.json())
        .then((data) => setUserData(data));
    }, []);

    const openUser = (row: TSAny) => {
        router.push(`/users/${row._id}`);
    };

    return (
        <OTable
        isFullWidthTable
        stickyHeader
        columns={UserColumns}
        data={userData}
        onRowClick={openUser}
        />
    );
}