'use client';

import { useState } from "react";
import DateTimePickerProvider from "@/components/Providers/DateTimePickerProvider";
import { TimePicker as TimePickerUI } from "@mui/x-date-pickers";

interface TimePickerProps {
  name: string;
}

export const TimePicker = ({ name }: TimePickerProps) => {
  
  return (
    <DateTimePickerProvider>
      <TimePickerUI name={name} />
    </DateTimePickerProvider>
  );
};