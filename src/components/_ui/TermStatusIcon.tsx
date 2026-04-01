"use client";

import { JSX } from "react";
import { Circle, Inventory, Drafts } from "@mui/icons-material";

export const getStatusIcon = (status: "LIVE" | "ENDED" | "DRAFT", endDate?: string): JSX.Element => {
  switch (status) {
    case "LIVE":
      return <Circle />;
    case "ENDED":
      return <Inventory />;
    default:
      if (endDate && endDate < new Date().toISOString()) {
        return <Inventory />;
      }
      return <Drafts />;
  }
};