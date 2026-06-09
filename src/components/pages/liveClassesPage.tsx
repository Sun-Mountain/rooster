"use client";

import { useEffect, useState } from "react";
import { fetchLiveTerms } from "@/lib/api/term";
import { TermProps } from "@/lib/props";
import { ClassDetailSchedule } from "../ClassDetailSchedule";

export default function LiveClassesPage() {
  const [liveTerms, setLiveTerms] = useState<TermProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      fetchLiveTerms(setLiveTerms, setIsLoading);
    }
  }, [isLoading]);

  console.log("Live Terms:", liveTerms);

  if (isLoading) {
    return (
      <div className="page-content">
        <h1>Live Classes</h1>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="page-content">
      <h1>Classes</h1>
      {liveTerms.length === 0 ? (
        <p>No live classes available at the moment.</p>
      ) : (
        <>
          Yay! We have live classes! {/* You can replace this with a more detailed rendering of the live terms */}
        </>
      )}
    </div>
  );
}