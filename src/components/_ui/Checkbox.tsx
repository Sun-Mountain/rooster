"use client";

import { ChangeEvent, useState } from "react";
import {
  Checkbox as CheckboxComponent,
  FormGroup,
  FormControlLabel
} from "@mui/material";

interface CheckboxProps {
  name: string;
  label: string;
  checked?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox = ({ name, label, checked = false, onChange }: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    if (onChange) onChange(event);
  };

  return (
    <div className="checkbox-container">
      <FormGroup>
        <FormControlLabel
          control={
            <CheckboxComponent
              checked={isChecked}
              onChange={handleChange}
              slotProps={{
                input: { "aria-label": "controlled", name },
              }}
            />
          }
          label={label}
        />
      </FormGroup>
    </div>
  );
};
