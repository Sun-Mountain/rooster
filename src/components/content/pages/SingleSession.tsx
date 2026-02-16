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
import { SessionClassList } from "@/components/content/SessionClassList";
import { TermProps } from "@/lib/props";
import { fetchSingleSession } from "@/lib/api/term";

export const SingleSession = () => {
  const pathname = usePathname();
  const [session, setSession] = useState<TermProps | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  const sessionId = useMemo(() => {
    const pathSegments = pathname.split("/");
    return pathSegments[pathSegments.length - 1];
  }, [pathname]);

  useEffect(() => {
    if (!sessionId) return;
    fetchSingleSession(sessionId, setSession);
  }, [sessionId]);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const formData = new FormData(event.currentTarget);
    const updatedSession = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      startDate: formData.get("startDate") as string,
      endDate: formData.get("endDate") as string,
    };

    fetch(`/api/admin/term/${sessionId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedSession),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update session");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Session updated successfully:", data);
        setSession((prev) => prev ? { ...prev, ...updatedSession } : prev);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating session:", error);
      });
  }

  return (
    <div className="page-content-container">
      <BackLink href="/admin/sessions" label="Sessions" />
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className="page-header">
            <div className="header-with-status">
              <h2>
                Session:&nbsp;
                <TextField
                  label="Session Name"
                  name="name"
                  initialValue={session?.name || ""}
                />
              </h2>
            </div>
            <Button className="w-icon small" type="submit">
              <Save /> Save
            </Button>
          </div>
          <div className="form-container no-border no-padding session-dates">
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
          <div className="session-description">
            <TextField
              label="Session Description"
              name="description"
              multiline
              rows={4}
              initialValue={session?.description || ""}
            />
          </div>
        </form>
      ) : (
        <>
          <div className="page-header">
            <div className="header-with-status">
              <h2>
                Session:&nbsp;
                {session?.name}
              </h2>
              <SessionLiveBtn live={session?.live || false} className="w-icon small" />
            </div>
            <Button className="w-icon small" onClick={toggleEdit}>
              <EditSquare /> Edit
            </Button>
          </div>
          <div className="session-dates">
            {session ? (<h3>
              {new Date(session?.startDate).toLocaleDateString()} - {new Date(session?.endDate).toLocaleDateString()}
            </h3>) : "Loading..."}
          </div>
          <div className="session-description">
            {session?.description || <em>No description/notes provided.</em>}
          </div>
        </>
      )}
      <div>
        <h3>Classes in this Session:</h3>
        <div className="admin-list">
          {session && session.classes.length > 0 ? (
            <SessionClassList
              sessionId={session.id}
              classIds={session.classes.map(cls => cls.classId)}
            />
            // <>
            //   {session ? (
            //     session.classes.length > 0 ? (
            //       <ul className="admin-list">
            //         {session.classes.map((cls) => (
            //           <li className="list-item" key={cls.classId}>
            //             <div>
            //               <a href={`/admin/classes/${cls.classId}`}>
            //                 {cls.classId}
            //               </a>
            //             </div>
            //           </li>
            //         ))}
            //       </ul>
            //     ) : (
            //       <p>No classes added to this session yet.</p>
            //     )
            //   ) : (
            //     <p>Loading classes...</p>
            //   )}
            // </>
          ) : (
            <>
              No classes are in this session.
            </>
          )}
        </div>
        <div>
          <AddClassModal sessionId={sessionId} />
        </div>
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