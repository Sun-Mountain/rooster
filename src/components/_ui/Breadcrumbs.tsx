"use client";

import { Breadcrumbs as BreadcrumbUI } from "@mui/material";
import Link from "next/dist/client/link";
import { KeyboardDoubleArrowLeft as ArrowBack } from "@mui/icons-material";
import { usePathname } from "next/navigation";

interface BreadcrumbsProps {
  currentPageTitle?: string;
}

export const Breadcrumbs = ({ currentPageTitle }: BreadcrumbsProps) => {
  const pathname = usePathname();
  const pathParts = pathname.split("/").filter(part => part);

  return (
    <div className="crumb-container">
      <BreadcrumbUI
        aria-label="breadcrumb"
        separator={<ArrowBack style={{ fontSize: "16px" }} />}
      >
        {pathParts.map((part, index) => {
          const href = "/" + pathParts.slice(0, index + 1).join("/");
          const isLast = index === pathParts.length - 1;
          const displayName = part.charAt(0).toUpperCase() + part.slice(1);

          if (part === "session") {
            return (
              <Link key={href} href="/admin/sessions" className="breadcrumb-item">
                Sessions
              </Link>
            );
          } else if (part === "class") {
            return (
              <Link key={href} href="/admin/classes" className="breadcrumb-item">
                Classes
              </Link>
            );
          }

          return isLast ? (
            <span key={href} className="breadcrumb-item current">
              {currentPageTitle || displayName}
            </span>
          ) : (
            <Link key={href} href={href} className="breadcrumb-item">
              {displayName}
            </Link>
          );
        })}
      </BreadcrumbUI>
    </div>
  )
}