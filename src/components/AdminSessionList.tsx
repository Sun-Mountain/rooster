"use client";

import { TermProps } from "@/lib/props";
import { SessionListItem } from "./SessionListItem";

interface AdminSessionListProps {
  termList: TermProps[];
}

export const AdminSessionList = ({ termList }: AdminSessionListProps) => {
  return (
    <ul className="admin-list">
      {termList.map((session: TermProps) => (
        <SessionListItem
          key={session.id}
          sessionId={session.id}
          name={session.name}
          startDate={session.startDate}
          endDate={session.endDate}
          liveStatus={session.live}
        />
      ))}
    </ul>
  )
}