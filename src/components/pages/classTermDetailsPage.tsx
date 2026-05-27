"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Breadcrumbs } from "@/components/_ui/Breadcrumbs";

export default function AdminClassTermDetails() {
  const searchParams = useSearchParams()
  const pathname = usePathname();

  const classDetailsId = searchParams.get('id');
  const termId = pathname.split("/").filter(part => part)[2]; 

  return (
    <div className="admin-page-container">
      {/* TODO: Fix Breadcrumbs component */}
      <Breadcrumbs />
      <h1>Class Term Details</h1>
      <div className="content-container">
        <p>Details for a specific class term will be displayed here.</p>
      </div>
    </div>
  )
}
