"use client";

import { useEffect, useState } from "react";
import { TermProps } from "@/lib/props";
import { fetchTerms } from "@/lib/api/term";
import { Add, DeleteForeverOutlined, ImportExport } from "@mui/icons-material";
import Button from "@/components/.ui/Button";

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
        </div>
        <div>
          <Button className="w-icon">
            <Add /> New Session
          </Button>
        </div>
      </div>
      <div className="admin-page-content">
        <div className="table-container">
          <div className="table-header table-row">
            <div className="table-cell">
              Session <ImportExport />
            </div>
          </div>
          {termList.map((session) => (
            <div key={session.id} className="table-row">
              <div className="table-cell">
                {session.name}
              </div>
              <div>
                <Button className="icon transparent small danger">
                  <DeleteForeverOutlined />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminSessionsMainPage;