"use client";

import { useEffect, useState } from "react";
import { fetchLiveTerms } from "@/lib/api/term";
import { TermProps } from "@/lib/props";
import { Tabs } from "@/components/_ui/Tabs";
import { ClassTabPanelContent } from "@/components/ClassTabPanelContent";

export default function LiveClassesPage() {
  const [liveTerms, setLiveTerms] = useState<TermProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      fetchLiveTerms(setLiveTerms, setIsLoading);
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="page-content">
        <h1>Live Classes</h1>
        <p>Loading...</p>
      </div>
    );
  }

  const currentTerm = (
    name: string,
    startDate: string,
    endDate: string,
    index: number
  ) => {
    if (index > 1) {
      return (<>{name}</>);
    }

    return (
      <>
        {name}<br />
        {new Date(startDate) <= new Date() && new Date(endDate) >= new Date() && (
          <span>(Current Session)</span>
        )}
        {new Date(startDate) > new Date() && (
          <span>(Upcoming Session)</span>
        )}
      </>
    );
  };

  return (
    <div className="page-content">
      <h1>Classes</h1>
      {liveTerms.length === 0 ? (
        <p>No live classes available at the moment.</p>
      ) : (
        <>
          <Tabs
            tabs={liveTerms.map((term, index) => ({
              label: currentTerm(term.name, term.startDate, term.endDate, index),
              name: term.name,
              tabContent: {
                children: <ClassTabPanelContent
                            termId={term.id}
                            startDate={term.startDate}
                            endDate={term.endDate}
                            currentSession={new Date(term.startDate) <= new Date() && new Date(term.endDate) >= new Date()}
                          />
              }
            }))}
          />
        </>
      )}
    </div>
  );
}