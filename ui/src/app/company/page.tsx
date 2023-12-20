"use client";

import React from "react";
import ModuleHeader from "@/components/moduleHeader";
import { useRouter } from "next/navigation";
import { Policy } from "@mui/icons-material";
import Image from "next/image";

export default function Companies() {
  const [data, setData] = React.useState<TSAny[]>([]);
  const router = useRouter();

  React.useEffect(() => {
    fetch("/api/company", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const openCompany = (company: TSAny) => {
    router.push(`/company/${company.label}`);
  };

  const renderCompanyCard = (company: TSAny) => {
    return (
      <div
        key={company._id}
        className="flex flex-col items-center justify-center w-full p-4 m-4 text-center bg-white rounded-lg hover:shadow-md cursor-pointer border-2 border-gray-200 hover:border-gray-300"
        onClick={() => openCompany(company)}
      >
        <div className="flex flex-row items-center justify-center w-full">
          {company.domain ? (
            <Image
              src={`https://logo.clearbit.com/${company.domain}`}
              width={64}
              height={64}
              alt={company.label}
              className="rounded-full"
            />
          ) : (
            <Policy width={64} height={64} />
          )}
        </div>
        <div className="text-lg font-bold text-gray-800">{company.label}</div>
        <div className="text-sm text-gray-500">{company.description}</div>

        <div className="flex flex-row items-center justify-center w-full mt-4">
          <div className="flex flex-col items-center justify-center w-1/2">
            <div className="text-sm text-gray-500">Products</div>
            <div className="text-lg font-bold text-gray-800">
              {company.products.length}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center w-full h-32 p-4 m-4 text-center bg-white rounded-lg shadow-md cursor-pointer">
      <div className="text-lg font-bold text-gray-800">No Companies</div>
      <div className="text-sm text-gray-500">Add a company to get started</div>
    </div>
  );

  return (
    <div className="w-full p-8">
      <div className="pb-8">
        <ModuleHeader
          title="Companies"
          action={{
            label: "Add Company",
            href: "/company/add",
          }}
        />
      </div>

      {data.length > 0 ? (
        <>
          <div className="text-lg font-bold text-gray-800">
            Primary Compaines
          </div>
          <div className="grid lg:grid-cols-4 lg:gap-4 md:grid-cols-3 md:gap-3 sm:grid-cols-2 sm:gap-1">
            {data
              .filter((d) => d.priority === "primary")
              .map(renderCompanyCard)}
          </div>

          <div className="my-8 text-lg font-bold text-gray-800 hidden">
            Other Compaines
          </div>
          <div className="grid lg:grid-cols-4 lg:gap-4 md:grid-cols-3 md:gap-3 sm:grid-cols-2 sm:gap-1">
            {data
              .filter((d) => d.priority === "secondary")
              .map(renderCompanyCard)}
          </div>

          <footer className="hidden">
            <a href="https://clearbit.com">Logos provided by Clearbit</a>
          </footer>
        </>
      ) : (
        renderEmptyState()
      )}
    </div>
  );
}
