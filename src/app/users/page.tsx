import React from "react";
import UserList from "./userList";
import ModuleHeader from "@/components/moduleHeader";

export default async function UserPage() {
  return (
    <div className="w-full p-8">
      <div className="pb-8">
        <ModuleHeader
          title="Users"
          action={{
            label: "Add User",
            href: "/users/add",
          }}
        />
      </div>
      <UserList />
    </div>
  );
}
