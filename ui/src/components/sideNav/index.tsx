"use client";

import React from "react";
import { Button } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import type { SvgIconComponent } from "@mui/icons-material";
import {
  Share,
  PeopleAlt,
  Cable,
  Policy,
  Category,
  Memory,
  Dataset,
} from "@mui/icons-material";

type Link = {
  href: string;
  label: string;
  icon: SvgIconComponent;
};

const navLinks: Link[] = [
  { href: "/intel", label: "Intels", icon: Memory },
  { href: "/company", label: "Competitors", icon: Policy },
  { href: "/view", label: "Views", icon: Dataset },
  { href: "/workflow", label: "Workflows", icon: Category },
];

const settingLinks = [
  { href: "/mappings", label: "Mappings", icon: Cable },
  { href: "/integrations", label: "Integrations", icon: Share },
  { href: "/users", label: "Users", icon: PeopleAlt },
];

export default function SideNav() {
  const pathname = usePathname();

  const renderLink = (link: Link) => {
    const Icon = link.icon;
    const isActive = pathname === link.href;
    return (
      <Button
        key={link.label}
        href={link.href}
        component={Link}
        variant="text"
        color="primary"
        size="small"
        fullWidth
        sx={{
          justifyContent: "initial",
          margin: "8px 0",
          padding: "8px",
          color: isActive ? "var(--primary-main)" : "var(--text-primary)",
          "&:hover": {
            color: "var(--primary-main)",
          },
        }}
        startIcon={<Icon />}
      >
        {link.label}
      </Button>
    );
  };

  // render search for all pages
  const renderSearch = () => {
    return (
      <div className="mt-4">
        <input
          className="border-2 border-stone-200 rounded-lg p-1 px-2"
          placeholder="Search..."
        />
      </div>
    );
  };
  return (
    <div className="flex flex-col h-screen border-r-1 w-56 p-4 bg-stone-100">
      <Image
        alt="QBack"
        width="120"
        height="50"
        className="pl-2"
        src="/qback.png"
      />

      <div className="flex flex-col">{renderSearch()}</div>
      <nav className="flex flex-col mt-4">{navLinks.map(renderLink)}</nav>
      <div className="text-sm text-stone-400 mt-4 pl-2">SETTINGS</div>
      <div className="flex flex-col mt-4">{settingLinks.map(renderLink)}</div>
    </div>
  );
}
