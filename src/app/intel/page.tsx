import React from "react";
import IntelList from "./intelList";
import ModuleHeader from "@/components/moduleHeader";

export default async function Intel() {
  return (
    <div className="w-full p-8">
      <div className="pb-8">
        <ModuleHeader
          title="Intel"
          action={{
            label: "New Intel",
            href: "/intel/add",
          }}
        />
      </div>
      <IntelList />
    </div>
  );
}
