'use client';

import { useEffect, useState } from "react";
import { Session } from "@prisma/client";
import { SessionForm } from "@/components/Forms/Session";
import { WeekDayNames } from "@/lib/dates";

export default function SessionsPage() {
  const [allSessions, setAllSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSessions = async () => {
      setIsLoading(true);
      const response = await fetch('/api/admin/sessions', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (response.ok) {
        const data = await response.json();
        const sessions: Session[] = data.sessions || [];
        setAllSessions(sessions);
      } else {
        console.log("Failed to fetch sessions.");
      }
      setIsLoading(false);
    };
    fetchSessions();
    
  }, []);

  return (

    <>
      <h1>Manage Sessions</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : allSessions.length > 0 ? (
        <ul>
          {allSessions.map(session => (
            <li key={session.id}>
              <div>
                <h4>{session.title}</h4>
                <div>{session.description}</div>
                <div>Start: {new Date(session.startDate).toLocaleDateString()}, {WeekDayNames[new Date(session.startDate).getDay()]}</div>
                <div>End: {new Date(session.endDate).toLocaleDateString()}, {WeekDayNames[new Date(session.endDate).getDay()]}</div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <>
          <p>No sessions found.</p>
          <p>Create your first session:</p>
          <SessionForm />
        </>
      )}
    </>
  );
}
