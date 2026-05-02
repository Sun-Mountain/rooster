"use client";

import { ChangeEvent, useState } from "react";
import { Checkbox as CheckboxComponent } from "@mui/material";

interface CheckboxProps {
  checked: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox = ({ checked = false, onChange }: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    if (onChange) onChange(event);
  };

  return (
    <CheckboxComponent
      checked={isChecked}
      onChange={handleChange}
      slotProps={{
        input: { "aria-label": "controlled" },
      }}
    />
  );
};
