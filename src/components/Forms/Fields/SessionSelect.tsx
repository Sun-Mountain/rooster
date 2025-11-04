'use client';

import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState
} from "react";
import { Session } from "@prisma/client";
import { SelectChangeEvent } from "@mui/material";
import { SelectField } from "@/components/UI/SelectField";

interface SessionSelectProps {
  disabled?: boolean;
  initialSessionId?: string | null;
  setInitialSessionId?: Dispatch<SetStateAction<string | null>>;
}

export const SessionSelect = ({
  disabled = false,
}: SessionSelectProps) => {
  const [isLoading, setIsLoading] = useState(disabled);
  const [allSessions, setAllSessions] = useState<Session[]>([]);

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

    const handleChange = (event: SelectChangeEvent) => {
      // Handle change logic here
    }

  return (
    <SelectField
      label="Session"
      name="session"
      options={allSessions.map(session => ({
        value: session.id,
        label: `${session.title}: ${new Date(session.startDate).toLocaleDateString()} - ${new Date(session.endDate).toLocaleDateString()}`
      }))}
    />
  )
};