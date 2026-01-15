'use client';

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { Term } from "@client";

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
      <h1>Session: {session?.name}</h1>
      <div>
        {session ? (<h3>
          {new Date(session?.startDate).toLocaleDateString()} - {new Date(session?.endDate).toLocaleDateString()}
        </h3>) : "Loading..."}
      </div>
    </div>
  );
}