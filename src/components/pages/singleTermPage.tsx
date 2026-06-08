
"use client";

import { useEffect, useState } from "react";
import { TermProps } from "@/lib/props";
import { usePathname } from "next/navigation";
import { TermStatus } from "@client";
import { Breadcrumbs } from "@/components/_ui/Breadcrumbs";
import { fetchSingleTermById, updateTermStatusById } from "@/lib/api/term";
import { dateFormat } from "@/helpers/dateFormatting";
import { getStatusIcon } from "@/components/_ui/TermStatusIcon";
import { Button } from "@/components/_ui/Button";
import { DeleteItemModal } from "@/components/modals/DeleteItem";
import { EditSessionModal } from "@/components/modals/EditSession";
import { AdminClassDetailsByTerm } from "@/components/AdminClassDetailsByTerm";

export default function SingleTermPageContent() {
  const pathname = usePathname();
  const pathParts = pathname.split("/").filter(part => part);
  const termId = pathParts[pathParts.length - 1];

  const [isLoading, setIsLoading] = useState(true);
  const [termData, setTermData] = useState<TermProps | null>(null);
  const [termStatus, setTermStatus] = useState<TermStatus | undefined>(termData?.status);

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

  const updateTermStatus = () => {
    if (!termData) return;

    if (termData.status === "ENDED") return;

    let newStatus: "LIVE" | "DRAFT"

    if (termData.status === "DRAFT") {
      newStatus = "LIVE";
    } else {
      newStatus = "DRAFT";
    }

    updateTermStatusById(termId, newStatus);
    setTermStatus(newStatus)
  }

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
            {termData?.status === "ENDED" ? (
              <>
                {termData ? getStatusIcon(termData.status, termData.endDate) : null}
                {termData ? termData.status.slice(0,1) + termData.status.slice(1).toLowerCase() : ""}
              </>
            ) : (
              <Button
                className="w-icon medium"
                onClick={updateTermStatus}
              >
                {termStatus ? getStatusIcon(termStatus) : getStatusIcon(termData?.status || "DRAFT")}
                {termStatus ? termStatus.slice(0,1) + termStatus.slice(1).toLowerCase() : termData ? termData.status.slice(0,1) + termData.status.slice(1).toLowerCase() : ""}
              </Button>
            )}
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