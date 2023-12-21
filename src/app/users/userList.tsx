"use client";
import React, { useEffect, useState } from "react";
import { ColumnBuilder, OTable } from "@/fwk/oTable";
import { useRouter } from "next/navigation";

const UserColumns = [
    ColumnBuilder().id("username").name("Username").width(400).build(),
    ColumnBuilder().id("name").name("Name").build(),
    ColumnBuilder().id("role").name("Role").build(),
];

export default function UserList() {
    const [userData, setUserData] = useState([]);
    const router = useRouter();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch("http://localhost:3001/api/users");
            const data = await response.json();
            setUserData(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const openUser = (row) => {
        router.push(`/users/${row._id}`);
    };

    return (
        <OTable
            isFullWidthTable
            stickyHeader
            columns={UserColumns}
            data={userData}
            onRowClick={openUser}
            cellClassName="otable-column"
        />
    );
}
