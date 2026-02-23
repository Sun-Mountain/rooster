"use client";

import { useEffect, useState } from "react";
import { TextField } from "@/components/_ui/TextField";
import { Button } from "@/components/_ui/Button";
import { Alert } from "@/components/_ui/Alert";
import { TermProps } from "@/lib/props";

import { fetchTerms } from "@/lib/api/term";

import { TermForm } from "@/components/forms/TermForm";

export default function TermPageContent() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [termList, setTermList] = useState<TermProps[]>([]);
  
  const fetchAllTerms = () => fetchTerms(setError, setIsLoading, setTermList)

  useEffect(() => {
    fetchAllTerms();
  }, [])


  return (
    <div className="admin-page-container">
      <h1>Session Management</h1>
      <div className="content-container">
        <TermForm />
        {error ? (
          <>
            {error}
          </>
        ) : termList.length > 0 && !isLoading ? (
          <>
            Yay Sessions!
          </>
        ) : (
          <>
            No sessions
          </>
        )}
      </div>
    </div>
  )
}