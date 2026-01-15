'use client';

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { Term } from "@client";
import { Button } from "@/components/_ui/Button";
import { BackLink } from "@/components/BackLink";
import { DeleteModal } from "@/components/modals/DeleteModal";
import { AddClassModal } from "@/components/modals/AddClass";
import { EditSquare } from "@mui/icons-material";

export const SingleSession = () => {
  const pathname = usePathname();
  const [session, setSession] = useState<Term | null>(null);
  
  const sessionId = useMemo(() => {
    const pathSegments = pathname.split("/");
    return pathSegments[pathSegments.length - 1];
  }, [pathname]);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch(`/api/admin/term/${sessionId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch session");
        }
        const data: Term = await response.json();
        setSession(data);
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    };

    if (sessionId) {
      fetchSession();
    }
  }, [sessionId]);

  return (
    <div className="page-content-container">
      <BackLink href="/admin/sessions" label="Sessions" />
      <div className="page-header">
        <h1>Session: {session?.name}</h1>
        <Button className="w-icon small">
          <EditSquare /> Edit
        </Button>
      </div>
      <div>
        {session ? (<h3>
          {new Date(session?.startDate).toLocaleDateString()} - {new Date(session?.endDate).toLocaleDateString()}
        </h3>) : "Loading..."}
      </div>
      <div className="session-description">
        {session?.description || (<em>No description/notes provided.</em>)}
      </div>
      <div>
        <AddClassModal />
      </div>
      {
        session && (
          <div className="danger-zone">
            <DeleteModal id={session?.id} name={session?.name} type="term" altType="session" />
          </div>
        )
      }
    </div>
  );
}