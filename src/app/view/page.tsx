"use client";

import React from "react";
import ModuleHeader from "@/components/moduleHeader";
import { useRouter } from "next/navigation";

export default function Views() {
  const [data, setData] = React.useState<TSAny[]>([]);
  const router = useRouter();

  React.useEffect(() => {
    fetch("/api/view", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const openView = (row: TSAny) => {
    router.push(`/view/${row._id}`);
  };

  const renderViewCard = (view: TSAny) => {
    return (
      <div
        key={view._id}
        className="flex flex-col items-center justify-center w-full p-4 m-4 text-center bg-white rounded-lg hover:shadow-md cursor-pointer border-2 border-gray-200 hover:border-gray-300"
        onClick={() => openView(view)}
      >
        <div className="text-lg font-bold text-gray-800">{view.label}</div>
        <div className="text-sm text-gray-500">{view.description}</div>
      </div>
    );
  };

  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center w-full h-32 p-4 m-4 text-center bg-white rounded-lg shadow-md cursor-pointer">
      <div className="text-lg font-bold text-gray-800">No Views</div>
      <div className="text-sm text-gray-500">Add a view to get started</div>
    </div>
  );

  return (
    <div className="w-full p-8">
      <div className="pb-8">
        <ModuleHeader
          title="Views"
          action={{
            label: "Add view",
            href: "/view/add",
          }}
        />
      </div>

      {data.length > 0 ? (
        <>
          <div className="text-lg font-bold text-gray-800">All Views</div>
          <div className="grid lg:grid-cols-4 lg:gap-4 md:grid-cols-3 md:gap-3 sm:grid-cols-2 sm:gap-1">
            {data.map(renderViewCard)}
          </div>
        </>
      ) : (
        renderEmptyState()
      )}
    </div>
  );
}
