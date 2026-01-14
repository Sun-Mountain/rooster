'use client';

import { Term } from "@client";
import { Circle, DoNotDisturb } from "@mui/icons-material";
import { useState, useEffect } from "react";

export const SessionList = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/term");
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
                <strong>{session.name}</strong>
              </div>
              <div className={session.live ? "status live" : "status inactive"}>
                {session.live ? (
                  <>
                    <Circle fontSize="small" /> Live
                  </>
                ) : (
                  <>
                    <DoNotDisturb fontSize="small" /> Inactive
                  </>
                )}
              </div>
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