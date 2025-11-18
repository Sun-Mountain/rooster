'use client';

import { useState } from "react";
import LocalizationProvider from "@/components/providers/Localizer";
import { DatePicker as DatePickerUI} from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';

interface DatePickerProps {
  label: string;
  name: string;
  initialDate?: string;
  disabled?: boolean;
  errorMsg?: string;
}
export const DatePicker = ({ label, name, initialDate, disabled = false, errorMsg }: DatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(initialDate ? dayjs(initialDate) : null);

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
  };

  return (
    <LocalizationProvider>
      <div className="text-field-container">
        <DatePickerUI
          label={label}
          name={name}
          value={selectedDate}
          onChange={handleDateChange}
          disabled={disabled}
          slotProps={{
            textField: {
              helperText: errorMsg,
            },
          }}
        />
      </div>
    </LocalizationProvider>
  );
}