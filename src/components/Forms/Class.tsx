'use client';

import { useEffect, useState } from "react";
import { Session } from "@prisma/client";
import { TextField } from "../UI/TextField";
import { SelectField } from "../UI/SelectField";
import { WeekDayNames } from "@/lib/datesTimes";
import { Weekday } from "@prisma/client";

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
        <TextField label="Class Title" name="title" initialValue="" disabled={isLoading} />
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
        <SelectField
          label="Weekday"
          name="weekday"
          options={WeekDayNames.map((day, index) => ({
            value: Object.values(Weekday)[index],
            label: day
          }))}
        />
      </form>
    </div>
  );
}