'use client';

import { useState } from "react";
import dayjs, { Dayjs } from 'dayjs';
import DateTimePickerProvider from "@/components/Providers/DateTimePickerProvider";
import { TimePicker as TimePickerUI } from "@mui/x-date-pickers";

interface TimePickerProps {
  name: string;
  label: string;
  initialValue?: string;
}

export const TimePicker = ({ name, label, initialValue }: TimePickerProps) => {
  const [value, setValue] = useState<Dayjs | null>(initialValue ? dayjs(initialValue, 'h:mm A') : null);

  return (
    <DateTimePickerProvider>
      <TimePickerUI name={name} label={label} value={value} onChange={(newValue) => setValue(newValue)} />
    </DateTimePickerProvider>
  );
};