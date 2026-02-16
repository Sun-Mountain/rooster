'use client';

import { useEffect, useState } from "react";
import { Term } from "@client";
import { SessionLiveBtn } from "../SessionLiveBtn";

export const SessionList = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/admin/term");
        if (!response.ok) throw new Error("Failed to fetch terms");
        const data = await response.json();
        setSessions(data);
      } catch (err) {
        console.error(err);
        // setError(err instanceof Error ? err.message : "Failed to load terms");
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  if (loading) {
    return <div>Loading sessions...</div>;
  }

  return (
    <div className="session-list">
      {sessions.length === 0 ? (
        <p>No sessions available.</p>
      ) : (
        <ul className="admin-list">
          {sessions.map((session: Term) => (
            <li className="list-item" key={session.id}>
              <div>
                <a href={`/admin/sessions/${session.id}`}>
                  {session.name}
                </a>
              </div>
              <SessionLiveBtn live={session.live} />
              {/* <div>
                <Button className="small">
                  {session.live ? 'Set Inactive' : 'Set Live'}
                </Button>
              </div> */}
              <div>
                {new Date(session.startDate).toLocaleDateString()} - {new Date(session.endDate).toLocaleDateString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

}