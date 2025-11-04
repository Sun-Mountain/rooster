'use client';

import { useEffect, useState } from "react";
import { Session } from "@prisma/client";
import { Button } from "../UI/Button";
import { TextField } from "../UI/TextField";
import { SelectField } from "../UI/SelectField";
import { DayTimesFields } from "./Fields/DayTimes";

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

  const onSubmit = (event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const values = Object.fromEntries(formData.entries());

    console.log(values);

    // TODO: Handle form submission logic here
  };

  return (
    <div className="form-container">
      <form onSubmit={onSubmit}>
        <TextField label="Class Title" name="title" initialValue="" disabled={isLoading} />
        <TextField label="Class Description" name="description" initialValue="" />
        <TextField label="Class Capacity" name="capacity" initialValue="" />
        <TextField label="Price" name="price" initialValue="" />
        <SelectField
          label="Session"
          name="session"
          options={allSessions.map(session => ({
            value: session.id,
            label: `${session.title}: ${new Date(session.startDate).toLocaleDateString()} - ${new Date(session.endDate).toLocaleDateString()}`
          }))}
        />
        <DayTimesFields />
        <Button type="submit">Create Class</Button>
      </form>
    </div>
  );
}