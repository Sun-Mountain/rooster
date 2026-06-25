"use client";

import { useState } from "react";
import { FormControl, MenuItem, Select as MuiSelect, SelectChangeEvent } from "@mui/material";

interface SelectProps {
  label: string;
  options: string[];
  value: string;
  small?: boolean;
  topBottomMargin?: boolean;
  onChange: (event: SelectChangeEvent<string>) => void;
}

export const Select = ({ label, options, value, small = false, topBottomMargin = false, onChange }: SelectProps) => {
  const [selectedValue, setSelectedValue] = useState(value);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`select-container${topBottomMargin ? " w-margins" : ""}`}>
      <FormControl size={small ? "small" : "medium"}>
        <MuiSelect
          inputProps={{MenuProps: {disableScrollLock: true}}}
          labelId={label}
          value={selectedValue}
          onChange={(event) => {
            setSelectedValue(event.target.value);
            onChange(event);
          }}
          open={isOpen}
          onClose={handleToggle}
          onOpen={handleToggle}
        >
          {options.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </MuiSelect>
      </FormControl>
    </div>
  );
};