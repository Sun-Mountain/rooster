'use client';

import { useState } from "react";
import { Checkbox as CheckboxUI } from "@mui/material";

interface CheckboxProps {
  defaultChecked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox = ({ defaultChecked, onChange }: CheckboxProps) => {
  const [checked, setChecked] = useState(defaultChecked || false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <div className="checkbox-container">
      <CheckboxUI className="checkbox" checked={checked} onChange={handleChange} />
    </div>
  )
};