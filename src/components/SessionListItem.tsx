"use client";

import { JSX, use, useEffect, useState } from "react";
import { Circle, Inventory, Drafts } from "@mui/icons-material";
import { dateFormat } from "@/helpers/dateFormatting";

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
  const getStatusIcon = (status: "LIVE" | "ENDED" | "DRAFT"): JSX.Element => {
    switch (status) {
      case "LIVE":
        return <Circle />;
      case "ENDED":
        return <Inventory />;
      default:
        if (endDate < new Date().toISOString()) {
          return <Inventory />;
        }
        return <Drafts />;
    }
  };

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
        <a href={`/admin/sessions/${sessionId}`}>
          {name}
        </a>
      </div>
      <div className="status-icon icon-container">
        {getStatusIcon(liveStatus)}
      </div>
      <div>
        {dateFormat(startDate)} - {dateFormat(endDate)}
      </div>
    </li>
  )
};