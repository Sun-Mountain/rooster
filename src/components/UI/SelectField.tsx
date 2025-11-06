'use client';

import { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

interface SelectFieldProps {
  label: string;
  name: string;
  options: { value: string; label: string }[];
}

export const SelectField = ({ label, name, options }: SelectFieldProps) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedOption(event.target.value);
  };

  return (
    <>
      <FormControl className="select-field">
      <InputLabel>{label}</InputLabel>
      <Select
        labelId={`${name}-label`}
        className="text-field"
        name={name}
        id={`${name}-select`}
        value={selectedOption}
        label={label}
        onChange={handleChange}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      </FormControl>
    </>
  );
}