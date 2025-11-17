'use client';

import { ChangeEvent, useState } from "react";
import { TextField as TextFieldComponent } from "@mui/material";

interface TextFieldProps {
  label: string;
  name: string;
  initialValue?: string;
  disabled?: boolean;
  type?: 'text' | 'password' | 'email' | 'number';
  errorMsg?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const TextField = ({
  label,
  name,
  initialValue = '',
  disabled = false,
  type,
  errorMsg,
  onChange
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
      />
    </div>
  );
}