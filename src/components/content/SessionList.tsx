'use client';

import { useEffect, useState } from "react";
import { Session } from "@prisma/client";
import { SessionForm } from "@/components/forms/Session";
import { DeleteModal } from "../content/DeleteModal";

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
          <ul className="table">
            {sessions.map((session) => (
              <li key={session.id} className="session-item">
                <div className="row-content">
                  <div>{session.title}</div>
                  <div>
                    <div>Start: {new Date(session.startDate).toDateString()}</div>
                    <div>End: {new Date(session.endDate).toDateString()}</div>
                  </div>
                </div>
                <div className="row-content actions">
                  <SessionForm setIsLoading={setIsLoading} isLoading={isLoading} editMode />
                  <DeleteModal
                    item="session"
                    itemName={session.title}
                    itemId={session.id}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading} />
                </div>
              </li>
            ))}
          </ul>
        ) : <p>No sessions found.</p>}
      </div>
    </>
  );
}