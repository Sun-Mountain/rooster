'use client';

import { useState } from "react";
import DateTimePickerProvider from "@/components/Providers/DateTimePickerProvider";
import { TimePicker as TimePickerUI } from "@mui/x-date-pickers";

export const TimePicker = () => {
  
  return (
    <DateTimePickerProvider>
      <TimePickerUI />
    </DateTimePickerProvider>
  );
};