
"use client";

import { useEffect, useState } from "react";
import { TermProps } from "@/lib/props";
import { usePathname } from "next/navigation";
import { Breadcrumbs } from "@/components/_ui/Breadcrumbs";
import { fetchSingleTermById, updateTermStatusById } from "@/lib/api/term";
import { dateFormat } from "@/helpers/dateFormatting";
import { DeleteItemModal } from "@/components/modals/DeleteItem";
import { EditSessionModal } from "@/components/modals/EditSession";
import { AdminClassDetailsByTerm } from "@/components/AdminClassDetailsByTerm";
import { StatusUpdateModal } from "../modals/statusUpdate";

export default function SingleTermPageContent() {
  const pathname = usePathname();
  const pathParts = pathname.split("/").filter(part => part);
  const termId = pathParts[pathParts.length - 1];

  const [isLoading, setIsLoading] = useState(true);
  const [termData, setTermData] = useState<TermProps | null>(null);

  useEffect(() => {
    if (isLoading && termId) fetchSingleTermById(termId, setTermData, setIsLoading);
  }, [isLoading, termId]);

  useEffect(() => {
    if (termData?.status !== "ENDED" && termData && termData?.endDate < new Date().toISOString()) {
      updateTermStatusById(termId, "ENDED");
      fetchSingleTermById(termId, setTermData, setIsLoading);
    }
  }, [termData, termId]);

  const pageTitle = isLoading ? "Loading..." : termData ? termData.name : "Single Term Page";

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
      <Breadcrumbs links= {[
        { name: "Admin", href: "/admin" },
        { name: "Sessions", href: "/admin/sessions" },
        { name: termData ? `Session: ${termData.name}` : "Session" },
      ]} />
      <h1>{pageTitle}</h1>
      <div className="content-container two-column">
        <div>
          <div className="action-btns-container">
            <div>
              {termData && termData?.status !== "ENDED" && (
                <EditSessionModal
                  formData={{ ...termData, description: termData.description ?? undefined }}
                  termId={termId}
                  setTermData={setTermData as React.Dispatch<React.SetStateAction<TermProps>>}
                />
              )}
            </div>
            <DeleteItemModal
              itemId={termId}
              type="term"
              name={termData?.name}
              modalBtnSize="small"
            />
          </div>
        </div>
        <div>
          <div className="term-dates-container">
            {termData ? dateFormat(termData.startDate) : ""} - {termData ? dateFormat(termData.endDate) : ""}
          </div>
          <div className="term-status-container">
            <StatusUpdateModal
              termId={termId}
              termStatus={termData?.status}
              setIsLoading={setIsLoading}
            />
          </div>
          <div className="term-description-container">
            {termData?.description ? termData.description : (
              <em>No description provided.</em>
            )}
          </div>
        </div>
      </div>
      <div className="content-container admin-list">
        <AdminClassDetailsByTerm
          termId={termId}
          termEnded={termData?.status === "ENDED"}
        />
      </div>
    </div>
  )
}