'use client';

import { StartDateEndDateFields } from "./Fields/StartDateEndDate";
import { TextField } from "../UI/TextField";

export const SessionForm = () => {

  const onSubmit = (event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const values = Object.fromEntries(formData.entries());

    fetch('/api/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Session created successfully:', data);
    })
    .catch(error => {
      console.error('Error creating session:', error);
    });
  }

  return (
    <div className="form-container">
      <h2>New Session</h2>
      <form onSubmit={onSubmit}>
        <TextField label="Session Name" name="sessionName" initialValue="" />
        <TextField label="Description (optional)" name="description" initialValue="" />
        <StartDateEndDateFields />
        <button type="submit">Create Session</button>
      </form>
    </div>
  );
}