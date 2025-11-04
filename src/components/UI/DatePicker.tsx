'use client';

import { useState } from "react";
import DateTimePickerProvider from "@/components/Providers/DateTimePickerProvider";
import { DatePicker as DatePickerUI} from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';

interface DatePickerProps {
  label: string;
  name: string;
  initialDate?: Date;
}
export const DatePicker = ({ label, name, initialDate }: DatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(initialDate ? dayjs(initialDate) : null);

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
  };

  return (
    <DateTimePickerProvider>
      <DatePickerUI label={label} name={name} value={selectedDate} onChange={handleDateChange} />
    </DateTimePickerProvider>
  );
}