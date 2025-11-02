'use client';

import { StartDateEndDateFields } from "./Fields/StartDateEndDate";
import { TextField } from "../UI/TextField";
import { buildSessionData } from "@/helpers/buildSession";

export const SessionForm = () => {
  
  const onSubmit = async (event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const values = Object.fromEntries(formData.entries());
    
    const sessionData = buildSessionData({
      title: values.sessionTitle as string,
      description: values.description as string,
      startDate: values.startDate as string,
      endDate: values.endDate as string,
    });
    
    const response = await fetch('/api/admin/session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sessionData),
    })

    if (response.ok) {
      console.log("Session created successfully.");
    } else {
      console.log("Failed to create session.");
    }
  }

  return (
    <div className="form-container">
      <form onSubmit={onSubmit}>
        <TextField label="Session Title" name="sessionTitle" initialValue="" />
        <TextField label="Description (optional)" name="description" initialValue="" />
        <StartDateEndDateFields />
        <button type="submit">Create Session</button>
      </form>
    </div>
  );
}