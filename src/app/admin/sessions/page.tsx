'use client';

import { useEffect, useState } from "react";
import { Session } from "@prisma/client";
import { WeekDayNames } from "@/lib/datesTimes";
import { SessionForm } from "@/components/Forms/Session";
import { AddEditSessionModal } from "@/components/Modals/AddEditSession";
import { ConfirmDeleteModal as ButtonDelete } from "@/components/Modals/ConfirmDelete";

export default function SessionsPage() {
  const [allSessions, setAllSessions] = useState<Session[]>([]);
  const [currentSession, setCurrentSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [newSessionCreated, setNewSessionCreated] = useState(false);

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

    if (!currentSession) {
      const fetchCurrentSession = async () => {
      const response = await fetch('/api/admin/session/current', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (response.ok) {
        const data = await response.json();
        setCurrentSession(data.session);
      } else {
        console.log("Failed to fetch current session.");
      }
    };
      fetchCurrentSession();
    }

  }, [newSessionCreated, currentSession]);

  const handleNewSessionSuccess = () => {
    setNewSessionCreated(!newSessionCreated);
  }

  const handleEditSessionSuccess = () => {
    setNewSessionCreated(!newSessionCreated);
  }

  const handleDeleteSessionSuccess = () => {
    setNewSessionCreated(!newSessionCreated);
  }

  return (
    <>
      <h2>Manage Sessions</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : allSessions.length > 0 ? (
        <>
          <section>
            <AddEditSessionModal onSuccess={handleNewSessionSuccess} />
          </section>
          <section>
            <h3>Current Session:</h3>
            {currentSession ? (
              <div className="list-item-container">
                <h4>{currentSession.title}</h4>
                <div>{currentSession.description}</div>
              </div>
            ) : (
              <p>No current session found.</p>
            )}
          </section>
          <section>
            <h3>Existing Sessions:</h3>
            <ul>
              {allSessions.map(session => (
                <li className="list-item-container" key={session.id}>
                  <div>
                    <h4>{session.title}</h4>
                    <div>{session.description}</div>
                    <div>Start: {new Date(session.startDate).toLocaleDateString()}, {WeekDayNames[new Date(session.startDate).getDay()]}</div>
                    <div>End: {new Date(session.endDate).toLocaleDateString()}, {WeekDayNames[new Date(session.endDate).getDay()]}</div>
                  </div>
                  <div>
                    <AddEditSessionModal
                      onSuccess={handleEditSessionSuccess}
                      editSessionId={session.id}
                      sessionData={{
                        id: session.id,
                        title: session.title,
                        description: session.description || undefined,
                        startDate: new Date(session.startDate),
                        endDate: new Date(session.endDate),
                      }}
                    />
                    <ButtonDelete id={session.id} itemType="session"
                    handleSuccess={handleDeleteSessionSuccess} />
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </>
      ) : (
        <>
          <p>No sessions found.</p>
          <p>Create your first session:</p>
          <SessionForm onSuccess={handleNewSessionSuccess} />
        </>
      )}
    </>
  );
}
