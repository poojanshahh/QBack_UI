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
    const [searchQuery, setSearchQuery] = useState(""); 
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

    const filterData = (data) => {
        return data.filter((user) =>
            Object.values(user).some((value) =>
                typeof value === "string" && value.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value); 
    };

    const filteredData = filterData(userData); 

    return (
        <div>
            <input
            className="search-box"
                type="text"
                placeholder="Search Term"
                value={searchQuery}
                onChange={handleSearch}
            />
            <OTable
                isFullWidthTable
                stickyHeader
                columns={UserColumns}
                data={searchQuery ? filteredData : userData} // Render filtered data if search query exists
                onRowClick={openUser}
                cellClassName="otable-column"
            />
        </div>
    );
}
