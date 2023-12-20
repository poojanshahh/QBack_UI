"use client";

import React from "react";
import ModuleHeader from "@/components/moduleHeader";
import Link from "next/link";
import { Policy } from "@mui/icons-material";
import Image from "next/image";

const ONTIC_PRODUCTS = [
  { label: "Social Media Listening", features: [] },
  { label: "Breaking News", features: [] },
  { label: "Investigations & Case Management", features: [] },
  { label: "Public Records Research & Publicly available OSINT", features: [] },
  { label: "Investigative Data Research", features: [] },
  { label: "Threat Assessment Module", features: [] },
  { label: "Threat Intelligence / Situational Awareness", features: [] },
  { label: "DarkWeb", features: [] },
  { label: "Weather", features: [] },
  { label: "Federal & State Court Records", features: [] },
  { label: "Adverse Media", features: [] },
  { label: "Mass Notifications", features: [] },
  { label: "Digitize Operating Procedures, Playbooks", features: [] },
  { label: "Critical Event Management", features: [] },
  { label: "IT Outages", features: [] },
  { label: "Travel Security", features: [] },
  { label: "Operational Control", features: [] },
  { label: "Cyber", features: [] },
];

export default function Mappings() {
  const [competitors, setCompetitors] = React.useState<TSAny[]>([]);

  React.useEffect(() => {
    fetch("/api/company", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setCompetitors(data));
  }, []);

  const renderProducts = (company: any) => {
    const imageSize = 32;
    return (
      <div>
        <div className="flex w-full justify-center items-center">
          {company.domain ? (
            <Image
              src={`https://logo.clearbit.com/${company.domain}`}
              width={imageSize}
              height={imageSize}
              alt={company.label}
              className="rounded-full"
            />
          ) : (
            <Policy width={imageSize} height={imageSize} />
          )}
          <div className="text-lg ml-2 font-bold">{company.label}</div>
        </div>

        {company.products.map((product: any) => {
          return (
            <div
              key={product.label}
              className="flex w-full my-4 p-2 rounded border border-stone-400"
            >
              <div className="text-base">{product.label}</div>
              {/* <div className="text-sm">{product.description}</div> */}
            </div>
          );
        })}
      </div>
    );
  };

  const renderProductMappings = () => {
    return (
      <div className="flex">
        <div style={{ minWidth: 400 }} className="m-2 sticky">
          {renderProducts({
            label: "Ontic",
            products: ONTIC_PRODUCTS,
            domain: "ontic.co",
          })}
        </div>
        <div className="flex overflow-auto">
          {competitors.map((competitor) => {
            return (
              <div
                key={competitor._id}
                style={{ minWidth: 400 }}
                className="m-2"
              >
                {renderProducts(competitor)}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full p-8">
      <div className="pb-8">
        <ModuleHeader
          title="Mappings"
          subtitle="Create mappings between your and Competitors product "
        />
      </div>
      {renderProductMappings()}
    </div>
  );
}
