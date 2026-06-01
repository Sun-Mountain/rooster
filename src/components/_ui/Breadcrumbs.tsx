"use client";

import { Breadcrumbs as BreadcrumbUI } from "@mui/material";
import Link from "next/dist/client/link";
import { KeyboardDoubleArrowLeft as ArrowBack } from "@mui/icons-material";
import { usePathname } from "next/navigation";

interface BreadcrumbsProps {
  links?: { name: string; href?: string }[];
  currentPageTitle?: string;
}

export const Breadcrumbs = ({ links, currentPageTitle }: BreadcrumbsProps) => {

  return (
    <div className="crumb-container">
      <BreadcrumbUI
        aria-label="breadcrumb"
        separator={<ArrowBack style={{ fontSize: "16px" }} />}
      >
        {links && links.map((link, index) => {
          if (link.href) {
            return (
              <Link key={index} href={link.href} className="crumb-link">
                {link.name}
              </Link>
            )
          } else {
            return (
              <span key={index} className="crumb-link">
                {link.name}
              </span>
            )
          }
        })}
        {currentPageTitle && (
          <span className="crumb-current">{currentPageTitle}</span>
        )}
      </BreadcrumbUI>
     </div>
  )
}
