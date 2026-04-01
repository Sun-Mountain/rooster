import { Breadcrumbs as BreadcrumbUI } from "@mui/material";
import Link from "next/dist/client/link";
import { KeyboardDoubleArrowLeft as ArrowBack } from "@mui/icons-material";

interface BreadcrumbsProps {
  dashboard: "admin";
  page: "sessions" | "terms" | "users";
}

export const Breadcrumbs = ({ dashboard, page }: BreadcrumbsProps) => {
  return (
    <div className="crumb-container">
      <BreadcrumbUI
        aria-label="breadcrumb"
        separator={<ArrowBack style={{ fontSize: "16px" }} />}
      >
        <Link href={`/${dashboard}`}>
          {dashboard.charAt(0).toUpperCase() + dashboard.slice(1)} Dashboard
        </Link>
        <Link href={`/${dashboard}/${page}`}>
          {page.charAt(0).toUpperCase() + page.slice(1)}
        </Link>
      </BreadcrumbUI>
    </div>
  )
}