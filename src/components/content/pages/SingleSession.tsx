'use client';

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/_ui/Button";
import { BackLink } from "@/components/BackLink";
import { DeleteModal } from "@/components/modals/DeleteModal";
import { AddClassModal } from "@/components/modals/AddClass";
import { EditSquare, Save } from "@mui/icons-material";
import { SessionLiveBtn } from "@/components/SessionLiveBtn";
import { TextField } from "@/components/_ui/TextField";

interface SessionProps {
  id: string;
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  live: boolean;
  classes: Array<{
    classId: string;
    details?: string;
  }>;
}

export const SingleSession = () => {
  const pathname = usePathname();
  const [session, setSession] = useState<SessionProps | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  const sessionId = useMemo(() => {
    const pathSegments = pathname.split("/");
    return pathSegments[pathSegments.length - 1];
  }, [pathname]);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch(`/api/admin/term/${sessionId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch session");
        }
        const data: SessionProps = await response.json();
        setSession(data);
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    };

    if (sessionId) {
      fetchSession();
    }
  }, [sessionId]);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  }

  return (
    <div className="page-content-container">
      <BackLink href="/admin/sessions" label="Sessions" />
      <div className="page-header">
        <div className="header-with-status">
          <h2>
            Session:&nbsp;
            {isEditing ? (
              <TextField
                label="Session Name"
                name="name"
                initialValue={session?.name || ""}
              />
            ) : session?.name}
          </h2>
          <SessionLiveBtn live={session?.live || false} className="w-icon small" />
        </div>
        <Button className="w-icon small" onClick={toggleEdit}>
          {isEditing ? <Save /> : <EditSquare />} {isEditing ? "Save" : "Edit"}
        </Button>
      </div>
      <div>
        {isEditing ? (
          <div className="form-container no-border no-padding">
            <div className="flex-fields-container">
              <TextField
                label="Start Date"
                name="startDate"
                type="date"
                initialValue={session ? new Date(session.startDate).toISOString().split('T')[0] : ""}
              />
              <TextField
                label="End Date"
                name="endDate"
                type="date"
                initialValue={session ? new Date(session.endDate).toISOString().split('T')[0] : ""}
              />
            </div>
          </div>
        ) : (
          <div className="session-dates">
            {session ? (<h3>
              {new Date(session?.startDate).toLocaleDateString()} - {new Date(session?.endDate).toLocaleDateString()}
            </h3>) : "Loading..."}
          </div>
        )}
      </div>
      <div className="session-description">
        {isEditing ? (
          <TextField
            label="Session Description"
            name="description"
            multiline
            rows={4}
            initialValue={session?.description || ""}
          />
        ) : (
          session?.description || <em>No description/notes provided.</em>
        )}
      </div>
      <div>
        <AddClassModal sessionId={sessionId} />
      </div>
      <div>
        <h3>Classes in this Session:</h3>
        {session ? (
          session.classes.length > 0 ? (
            <ul className="item-list">
              {session.classes.map((cls) => (
                <li key={cls.classId}>
                  <strong>{cls.classId}</strong>: {cls.details || <em>No description provided.</em>}
                </li>
              ))}
            </ul>
          ) : (
            <p>No classes added to this session yet.</p>
          )
        ) : (
          <p>Loading classes...</p>
        )}
      </div>
      {
        session && (
          <div className="danger-zone">
            <DeleteModal id={session?.id} name={session?.name} type="term" altType="session" />
          </div>
        )
      }
    </div>
  );
}