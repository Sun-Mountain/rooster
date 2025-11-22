'use client';


import { useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as SelectUI,
  SelectChangeEvent
} from "@mui/material";
import { Session, Weekday } from "@prisma/client";

interface SelectProps {
  label: string;
  name: string;
  options: Session[] | Weekday[];
  defaultSelected?: string;
  onChange?: (value: string) => void;
}

export const DropDownSelect = ({
  label,
  name,
  options,
  defaultSelected = '',
  onChange
}: SelectProps) => {
  const [selectedValue, setSelectedValue] = useState(defaultSelected);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedValue(event.target.value as string);
    if (onChange) {
      onChange(event.target.value as string);
    }
  };

  const capitalizeFirst = (s: string) => {
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
  }

  return (
    <div className="text-field-container">
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <SelectUI
          name={name}
          value={selectedValue}
          label={label}
          onChange={handleChange}
        >
          {options.map((option, index) => (
            <MenuItem key={index} value={typeof option === 'string' ? option : option.id}>
              {typeof option === 'string' ? capitalizeFirst(option) : option.title}
            </MenuItem>
          ))}
        </SelectUI>
      </FormControl>
    </div>
  )
}