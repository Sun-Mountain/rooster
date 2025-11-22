'use client';

import { useState } from "react";
import LocalizationProvider from "@/components/providers/Localizer";
import { TimePicker as TimePickerUI } from '@mui/x-date-pickers/TimePicker';
import dayjs, { Dayjs } from 'dayjs';

interface TimePickerProps {
  label: string;
  name: string;
  initialTime?: string;
  disabled?: boolean;
  errorMsg?: string;
  onTimeChange?: (time: Dayjs | null) => void;
}
export const TimePicker = ({ label, name, initialTime, disabled = false, errorMsg, onTimeChange }: TimePickerProps) => {
  const [selectedTime, setSelectedTime] = useState<Dayjs | null>(initialTime ? dayjs(initialTime) : null);

  const handleTimeChange = (time: Dayjs | null) => {
    setSelectedTime(time);
    if (onTimeChange) {
      onTimeChange(time);
    }
  };
  return (
    <LocalizationProvider>
      <div className="text-field-container">
        <TimePickerUI
          label={label}
          name={name}
          value={selectedTime}
          onChange={handleTimeChange}
          disabled={disabled}
          slotProps={{
            textField: {
              helperText: errorMsg,
              error: !!errorMsg,
            },
          }}
        />
      </div>
    </LocalizationProvider>
  );
}