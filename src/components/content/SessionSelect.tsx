'use client';

import { useEffect, useState } from "react";
import { Session } from "@prisma/client";
import { DropDownSelect } from "@/components/_ui/DropDownSelect";

export const SessionSelect = () => {
  const [sessions, setSessions] = useState<Session[]>([])

  useEffect(() => {
    if (sessions.length === 0) {
      fetch('/api/admin/sessions', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(response => response.json())
      .then(data => {
        setSessions(data.sessions);
      })
      .catch(error => {
        console.error('Error fetching sessions:', error);
      });
    }
  }, [sessions])

  return (
    <>
      <DropDownSelect
        label="Session"
        name="session"
        options={sessions}
      />
    </>
  )
}