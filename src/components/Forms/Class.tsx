'use client';

import { useEffect, useState } from "react";
import { Session } from "@prisma/client";
import { Button } from "../UI/Button";
import { TextField } from "../UI/TextField";
import { SelectField } from "../UI/SelectField";
import { DayTimesFields } from "./Fields/DayTimes";
import { buildClassData } from "@/helpers/buildClass";

interface ClassFormProps {
  onSuccess?: () => void;
}

export const ClassForm = ({ onSuccess }: ClassFormProps) => {
  const [allSessions, setAllSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [classNumber, setClassNumber] = useState(1);

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

  const onSubmit = async (event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const values = Object.fromEntries(formData.entries());

    const classData = buildClassData(values, classNumber);

    const response = await fetch('/api/admin/class', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(classData),
    });

    if (response.ok) {
      if (onSuccess) {
        onSuccess();
      }
    } else {
      console.log("Failed to create class.");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={onSubmit}>
        <TextField label="Class Title" name="title" initialValue="" disabled={isLoading} />
        <TextField label="Class Description" name="description" initialValue="" />
        <TextField label="Class Capacity" name="capacity" initialValue="" />
        <TextField label="Price" name="price" initialValue="" />
        <div className="text-field-container">
          <SelectField
            label="Session"
            name="session"
            options={allSessions.map(session => ({
              value: session.id,
              label: `${session.title}: ${new Date(session.startDate).toLocaleDateString()} - ${new Date(session.endDate).toLocaleDateString()}`
            }))}
          />
        </div>
        {[...Array(classNumber)].map((_, index) => (
          <div key={index}>
            <div className="divider-top" />
            <DayTimesFields key={index} index={index} />
          </div>
        ))}
        <div className="extra-form-button">
          <Button type="button" onClick={() => setClassNumber(classNumber + 1)}>Add Day/Time</Button>
        </div>
        <Button type="submit">Create Class</Button>
      </form>
    </div>
  );
}