"use client";

import { dateFormat } from "@/helpers/dateFormatting";
import { getStatusIcon } from "@/components/_ui/TermStatusIcon";

interface SessionListItemProps {
  sessionId: string;
  name: string;
  startDate: string;
  endDate: string;
  liveStatus: "LIVE" | "ENDED" | "DRAFT";
}

export const SessionListItem = ({
  sessionId,
  name,
  startDate,
  endDate,
  liveStatus
}: SessionListItemProps) => {

  const itemClass = () => {
    if (endDate < new Date().toISOString()) {
      return " ended";
    } else {
      return ` ${liveStatus.toLowerCase()}`;
    }
  }

  return (
    <li className={`list-item` + itemClass()} key={sessionId}>
      <div className="link-container">
        <a href={`/admin/session/${sessionId}`}>
          {name}
        </a>
      </div>
      <div className="status-icon icon-container">
        {getStatusIcon(liveStatus, endDate)}
      </div>
      <div>
        {dateFormat(startDate)} - {dateFormat(endDate)}
      </div>
    </li>
  )
};