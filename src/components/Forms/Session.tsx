'use client';

import { StartDateEndDateFields } from "./Fields/StartDateEndDate";
import { TextField } from "../UI/TextField";
import { buildSessionData } from "@/helpers/buildSession";
import { SessionProps } from "@/lib/interfaces/session";

interface SessionFormProps {
  onSuccess?: () => void;
  editSessionId?: string;
  sessionData?: SessionProps;
}

export const SessionForm = ({ onSuccess, editSessionId, sessionData }: SessionFormProps) => {

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

    const response = await fetch(`/api/admin/session${editSessionId ? `/${editSessionId}` : ''}`, {
      method: editSessionId ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sessionData),
    })

    if (response.ok) {
      if (onSuccess) onSuccess();
    } else {
      console.log("Failed to create session.");
    }
  }

  return (
    <div className="form-container">
      <form onSubmit={onSubmit}>
        <TextField label="Session Title" name="sessionTitle" initialValue={sessionData?.title || ""} />
        <TextField label="Description (optional)" name="description" initialValue={sessionData?.description || ""} />
        <StartDateEndDateFields initialStartDate={sessionData?.startDate} initialEndDate={sessionData?.endDate} />
        <button type="submit">{editSessionId ? "Update" : "Create"} Session</button>
      </form>
    </div>
  );
}