'use client';

import { useState } from "react";
import { Checkbox as CheckboxUI } from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';

interface CheckboxProps {
  defaultChecked?: boolean;
  label?: string;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox = ({
  defaultChecked,
  label,
  name,
  onChange
}: CheckboxProps) => {
  const [checked, setChecked] = useState(defaultChecked || false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <div className="checkbox-container">
      <FormControlLabel control={
        <CheckboxUI
          checked={checked}
          onChange={handleChange}
          name={name} />
        }
        label={label}
      />
    </div>
  )
};