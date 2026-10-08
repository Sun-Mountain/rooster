'use client'

import { useEffect, useState } from "react";
import SingleSessionSignUp from "@/components/SingleSessionSignUp";
import { fetchLiveTerms } from "@/lib/api/term";
import { TermProps } from "@/lib/props";

const LiveSessionsPage = () => {
  const [liveTerms, setLiveTerms] = useState<TermProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (isLoading) fetchLiveTerms(setLiveTerms, setIsLoading);
    };
    fetchData();
  }, [isLoading]);

  return (
    <>
      <div className="live-sessions-header">
        <div>
          {liveTerms.length === 0 ? (
            <h2>No Live Sessions</h2>
          ) : liveTerms.length === 1 ? (
            <SingleSessionSignUp
              termId={liveTerms[0].id}
              weeks={liveTerms[0].weeks}
              name={liveTerms[0].name}
              startDate={liveTerms[0].startDate}
              endDate={liveTerms[0].endDate}
              status={liveTerms[0].status}
              description={liveTerms[0].description}
            />
          ) : (
            <h2>{liveTerms.length} Live Sessions</h2>
          )}
        </div>
      </div>
    </>
  )
}

export default LiveSessionsPage;