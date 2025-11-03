'use client';

import { useEffect, useState } from "react";
import { Session } from "@prisma/client";
import { TextField } from "../UI/TextField";
import { SelectField } from "../UI/SelectField";

export const ClassForm = () => {
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
    <div className="form-container">
      <h2>Class Form</h2>
      <form>
        <TextField label="Class Title" name="title" initialValue="" />
        <TextField label="Class Description" name="description" initialValue="" />
        <TextField label="Class Capacity" name="capacity" initialValue="" type="number" />
        <SelectField
          label="Session"
          name="session"
          options={allSessions.map(session => ({
            value: session.id,
            label: `${session.title}: ${new Date(session.startDate).toLocaleDateString()} - ${new Date(session.endDate).toLocaleDateString()}`
          }))}
        />
      </form>
    </div>
  );
}