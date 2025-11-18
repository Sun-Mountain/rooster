'use client';

import { useEffect, useState } from "react";
import { Session } from "@prisma/client";
import { SessionForm } from "@/components/forms/Session";

export const SessionList = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch('/api/admin/sessions', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('Fetched sessions:', data.sessions);
      setSessions(data.sessions);
    })
    .catch(error => {
      console.error('Error fetching sessions:', error);
    });
  }, [isLoading]);

  return (
    <>
      <SessionForm setIsLoading={setIsLoading} isLoading={isLoading} />
      <div className="divider-top">
        <h2>Sessions</h2>
        {sessions && sessions.length > 0 ? (
          <>
            {sessions.map((session) => (
              <div key={session.id} className="session-item">
                <h3>{session.title}</h3>
                <p>{session.description}</p>
                <p>Start: {new Date(session.startDate).toLocaleString()}</p>
                <p>End: {new Date(session.endDate).toLocaleString()}</p>
              </div>
            ))}
          </>
        ) : <p>No sessions found.</p>}
      </div>
    </>
  );
}