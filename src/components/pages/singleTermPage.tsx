
"use client";
import { useEffect, useState } from "react";
import { TermProps } from "@/lib/props";
import { usePathname } from "next/navigation";
import { Breadcrumbs } from "@/components/_ui/Breadcrumbs";
import { fetchSingleTermById, updateTermStatusById } from "@/lib/api/term";
import { dateFormat } from "@/helpers/dateFormatting";
import { getStatusIcon } from "@/components/_ui/TermStatusIcon";
import { Button } from "../_ui/Button";

export default function SingleTermPageContent() {
  const pathname = usePathname();
  const pathParts = pathname.split("/").filter(part => part);
  const termId = pathParts[pathParts.length - 1];

  const [isLoading, setIsLoading] = useState(true);
  const [termData, setTermData] = useState<TermProps | null>(null);

  console.log(termData);
  
  useEffect(() => {
    if (isLoading && termId) fetchSingleTermById(termId, setTermData, setIsLoading);
  }, [isLoading, termId]);

  useEffect(() => {
    if (termData?.status !== "ENDED" && termData && termData?.endDate < new Date().toISOString()) {
      updateTermStatusById(termId, "ENDED");
      fetchSingleTermById(termId, setTermData, setIsLoading);
    }
  }, [termData, termId]);

  const pageTitle = termData ? termData.name : "Single Term Page";

  if (isLoading) {
    return (
      <div className="admin-page-container">
        <Breadcrumbs currentPageTitle="Loading..." />
        <h1>Loading...</h1>
      </div>
    )
  }

  return (
    <div className="admin-page-container">
      <Breadcrumbs currentPageTitle={`Session: ${pageTitle}`} />
      <h1>{pageTitle}</h1>
      <div className="content-container">
        <div className="term-dates-container">
          {termData ? dateFormat(termData.startDate) : ""} - {termData ? dateFormat(termData.endDate) : ""}
        </div>
        <div className="term-status-container">
          {termData?.status === "ENDED" ? (
            <>
              {termData ? getStatusIcon(termData.status, termData.endDate) : null}
              {termData ? termData.status.slice(0,1) + termData.status.slice(1).toLowerCase() : ""}
            </>
          ) : (
            <Button className="w-icon">
              {termData ? getStatusIcon(termData.status) : null}
              {termData ? termData.status.slice(0,1) + termData.status.slice(1).toLowerCase() : ""}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}