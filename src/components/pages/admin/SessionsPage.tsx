"use client";

import { useEffect, useState } from "react";
import { TermProps } from "@/lib/props";
import { fetchTerms } from "@/lib/api/term";
import AddSessionModal from "@/components/modals/AddSession";
import SessionListItem from "@/components/content/SessionListItem";

const AdminSessionsMainPage = () => {
  const [termList, setTermList] = useState<TermProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isLoading) fetchTerms(setError, setIsLoading, setTermList);
  }, [isLoading]);

  return (
    <div className="admin-dash-page-container">
      <div className="admin-page-header">
        <h1>Sessions</h1>
      </div>
      <div className="admin-page-subheader">
        <div>
          {(termList.length > 1 || termList.length === 0) ? <p>{termList.length} sessions</p> : <p>{termList.length} session</p>}
        </div>  
        <div>
          <AddSessionModal setIsLoading={setIsLoading} />
        </div>
      </div>
      <div className="admin-page-content">
        {termList.length > 0 ? (
          <>
            {termList.map((term) => (
              <SessionListItem key={term.id} term={term} />
            ))}
          </>
        ) : (
          <div className="no-data-message">
            <p>No sessions found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminSessionsMainPage;