"use client";

import React from "react";
import ModuleHeader from "@/components/moduleHeader";
import { useRouter } from "next/navigation";
import { Policy } from "@mui/icons-material";
import Image from "next/image";

export default function Workflows() {
  const [data, setData] = React.useState<TSAny[]>([]);
  const router = useRouter();

  React.useEffect(() => {
    fetch("/api/workflow", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const openWorkflow = (row: TSAny) => {
    router.push(`/workflow/${row._id}`);
  };

  const renderWorkflowCard = (workflow: TSAny) => {
    return (
      <div
        key={workflow._id}
        className="flex flex-col items-center justify-center w-full p-4 m-4 text-center bg-white rounded-lg hover:shadow-md cursor-pointer border-2 border-gray-200 hover:border-gray-300"
        onClick={() => openWorkflow(workflow)}
      >
        <div className="text-lg font-bold text-gray-800">{workflow.label}</div>
        <div className="text-sm text-gray-500">{workflow.description}</div>
      </div>
    );
  };

  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center w-full h-32 p-4 m-4 text-center bg-white rounded-lg shadow-md cursor-pointer">
      <div className="text-lg font-bold text-gray-800">No Workflows</div>
      <div className="text-sm text-gray-500">Add a workflow to get started</div>
    </div>
  );

  return (
    <div className="w-full p-8">
      <div className="pb-8">
        <ModuleHeader
          title="Workflows"
          action={{
            label: "Add workflow",
            href: "/workflow/add",
          }}
        />
      </div>

      {data.length > 0 ? (
        <>
          <div className="text-lg font-bold text-gray-800">All Workflows</div>
          <div className="grid lg:grid-cols-4 lg:gap-4 md:grid-cols-3 md:gap-3 sm:grid-cols-2 sm:gap-1">
            {data.map(renderWorkflowCard)}
          </div>
        </>
      ) : (
        renderEmptyState()
      )}
    </div>
  );
}
