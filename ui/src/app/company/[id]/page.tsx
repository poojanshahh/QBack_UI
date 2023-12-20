"use client";

import { useEffect, useState } from "react";
//import IntelList from "@/app/intel/intelList";
import Image from "next/image";

const DATAMINR = {
  label: "Dataminr",
  domain: "dataminr.com",
  products: [
    {
      label: "Dataminr for Corporate Security",
      description:
        "Dataminr's platform provides real-time information discovery and security solutions for corporate and public sector clients. It offers critical event detection, early threat warning, and situational awareness.",
    },
    {
      label: "Public Alerts",
      description:
        "Dataminr's platform can provide customized public alerts based on specific keywords, locations, or topics of interest, delivering real-time information on critical events.",
    },
    {
      label: "Situational Awareness",
      description:
        "Dataminr's platform offers real-time situational awareness by consolidating relevant information from various sources, including social media and publicly available data.",
    },
    {
      label: "Geospatial Analysis",
      description:
        "The platform includes geospatial analysis capabilities, allowing organizations to visualize data and events on a map, which is valuable for monitoring global operations and assessing threats across different locations.",
    },
    {
      label: "Alerts and Notifications",
      description:
        "Dataminr users can receive alerts and notifications through various channels, including email, SMS, mobile apps, and integration with other communication and incident management systems.",
    },
  ],
};

export default function CompanyDetails() {
  const [company, setCompany] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState("products");

  useEffect(() => {
    async function fetchCompany() {
      //const response = await fetch(`/api/company/${companyId}`);
      //const data = await response.json();
      setCompany(DATAMINR);
    }

    fetchCompany();
  }, []);

  if (!company) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white min-h-screen p-8">
      <div className="">
        <div className="container mx-auto flex items-center">
          {company.domain && (
            <Image
              src={`https://logo.clearbit.com/${company.domain}`}
              alt={`${company.label} logo`}
              height={12}
              width={12}
              className="mr-4"
            />
          )}
          <h1 className="text-2xl font-bold text-gray-800">{company.label}</h1>
        </div>
        <nav className="my-6">
          <ul className="flex">
            <li className="mr-6">
              <button
                className={`${
                  activeTab === "products" ? "font-semibold" : ""
                } hover:bg-gray-100 text-gray-700  py-2 px-4 border border-gray-400 rounded shadow`}
                onClick={() => setActiveTab("products")}
              >
                Products
              </button>
            </li>
            <li className="mr-6">
              <button
                className={`${
                  activeTab === "battlecard" ? "font-semibold" : ""
                } hover:bg-gray-100 text-gray-700 py-2 px-4 border border-gray-400 rounded shadow`}
                onClick={() => setActiveTab("battlecard")}
              >
                Battlecard
              </button>
            </li>
            <li className="mr-6">
              <button
                className={`${
                  activeTab === "intel" ? "font-semibold" : ""
                } hover:bg-gray-100 text-gray-700 py-2 px-4 border border-gray-400 rounded shadow`}
                onClick={() => setActiveTab("intel")}
              >
                Intel
              </button>
            </li>
            <li className="mr-6">
              <button
                className={`${
                  activeTab === "pricing" ? "font-semibold" : ""
                } hover:bg-gray-100 text-gray-700 py-2 px-4 border border-gray-400 rounded shadow`}
                onClick={() => setActiveTab("pricing")}
              >
                Pricing
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <div className="container mx-auto py-8 px-4">
        {activeTab === "pricing" && (
          <p className="text-gray-800 text-lg">{company.label}</p>
        )}
        {activeTab === "products" && (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {company.products.map((product: any, index: number) => (
              <li
                key={index}
                className="bg-white rounded-lg shadow p-4 hover:shadow-lg"
              >
                <h3 className="text-gray-800 font-semibold text-lg mb-2">
                  {product.label}
                </h3>
                <p className="text-gray-600">{product.description}</p>
              </li>
            ))}
          </ul>
        )}
        {/* {activeTab === "intel" && <IntelList />} */}
        {activeTab === "battlecard" && (
          <Image
            alt="Dataminr"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            src="/dataminr.png"
          />
        )}
      </div>
    </div>
  );
}
