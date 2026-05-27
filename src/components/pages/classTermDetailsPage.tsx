"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { ClassDetailProps, TermProps } from "@/lib/props";
import { Breadcrumbs } from "@/components/_ui/Breadcrumbs";
import { fetchSingleTermById } from "@/lib/api/term";
import { fetchSingleClassDetailById } from "@/lib/api/classDetails";

export default function AdminClassTermDetails() {
  const searchParams = useSearchParams()
  const pathname = usePathname();

  const [isLoading, setIsLoading] = useState(true);
  const [termData, setTermData] = useState<TermProps | null>(null);
  const [classData, setClassData] = useState<ClassDetailProps | null>(null);

  const classDetailsId = searchParams.get('id');
  const termId = pathname.split("/").filter(part => part)[2];

  console.log("Extracted termId:", termId);
  console.log("Extracted classDetailsId:", classDetailsId);

  useEffect(() => {
    if (isLoading && termId) fetchSingleTermById(termId, setTermData);
    if (isLoading && classDetailsId) fetchSingleClassDetailById(classDetailsId, setClassData);
  }, [classDetailsId, termId, isLoading]);

  console.log("Term Data:", termData);
  console.log("Class Detail Data:", classData);

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
