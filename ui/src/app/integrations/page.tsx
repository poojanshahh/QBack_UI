import React from "react";
import IntelList from "./integrationList";
import ModuleHeader from "@/components/moduleHeader";

export default async function Intel() {
  return (
    <div className="w-full p-8">
      <div className="pb-8">
        <ModuleHeader
          title="Integrations"
          action={{
            label: "Add Integrations",
            href: "/integration/add",
          }}
        />
      </div>
      <IntelList />
    </div>
  );
}
