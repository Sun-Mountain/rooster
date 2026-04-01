"use client";

import { useEffect, useState } from "react";
import { TermProps } from "@/lib/props";
import { fetchTerms } from "@/lib/api/term";
import { TermForm } from "@/components/forms/TermForm";
import { AdminSessionList } from "../AdminSessionList";

export default function TermPageContent() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [termList, setTermList] = useState<TermProps[]>([]);

  useEffect(() => {
    if (isLoading) fetchTerms(setError, setIsLoading, setTermList)
  }, [isLoading])


  return (
    <div className="admin-page-container">
      <h1>Session Management</h1>
      <div className="content-container">
        <TermForm setIsLoading={setIsLoading} />
        {error ? (
          <>
            {error}
          </>
        ) : termList.length === 0 ? (
          <>
            {isLoading ? "Loading..." : "No sessions found."}
          </>
        ) : (
          <AdminSessionList termList={termList} />
        )}
      </div>
    </div>
  )
}