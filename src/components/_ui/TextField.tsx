"use client";

import { ChangeEvent, useState } from "react";
import {
  TextField as TextFieldComponent,
  InputLabelProps,
  InputAdornment,
} from "@mui/material";

interface TextFieldProps {
  label: string;
  name: string;
  initialValue?: string | number;
  disabled?: boolean;
  multiline?: boolean;
  rows?: number;
  type?: "text" | "password" | "email" | "number" | "date" | "time";
  errorMsg?: string;
  shrink?: boolean;
  slotAdornment?: React.ReactNode;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  InputLabelProps?: InputLabelProps;
}

export const TextField = ({
  label,
  name,
  initialValue = "",
  disabled = false,
  type,
  multiline = false,
  rows,
  errorMsg,
  onChange,
  InputLabelProps,
  slotAdornment,
}: TextFieldProps) => {
  const [defaultValue, setDefaultValue] = useState(initialValue);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDefaultValue(event.target.value);
    if (onChange) onChange(event);
  };

  return (
    <div className="text-field-container">
      <TextFieldComponent
        className="text-field"
        label={label}
        name={name}
        type={type}
        disabled={disabled}
        value={defaultValue}
        onChange={handleOnChange}
        helperText={errorMsg}
        error={!!errorMsg}
        multiline={multiline}
        rows={rows}
        fullWidth
        slotProps={{
          inputLabel: InputLabelProps,
          input: {
            startAdornment: slotAdornment ? (
              <InputAdornment position="start">
                {slotAdornment}
              </InputAdornment>
            ) : undefined,
          },
        }}
      />
    </div>
  );
};
