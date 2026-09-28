'use client'

import { useEffect, useState } from "react";
import { fetchLiveTerms } from "@/lib/api/term";
import { TermProps } from "@/lib/props";

const LiveSessionsPage = () => {
  const [liveTerms, setLiveTerms] = useState<TermProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log(liveTerms)

  useEffect(() => {
    const fetchData = async () => {
      if (isLoading) fetchLiveTerms(setLiveTerms, setIsLoading);
    };
    fetchData();
  }, [isLoading]);

  return (
    <>
      <h1>Live Sessions</h1>
    </>
  )
}

export default LiveSessionsPage;