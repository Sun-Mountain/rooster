'use client';

import { ChangeEvent, useState } from 'react';
import { TextField as TextFieldUI } from '@mui/material';

interface TextFieldProps {
  label: string;
  value: string;
  helperText?: string;
  required?: boolean;
  type?: 'text' | 'password' | 'email' | 'number';
}

export const TextField = (
  { label, value, helperText, required = false, type = 'text' }: TextFieldProps
) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="text-field-container">
      <TextFieldUI
        label={label}
        value={inputValue}
        helperText={helperText}
        type={type}
        onChange={handleChange}
        fullWidth
        required={required}
        className="text-field"
      />
    </div>
  );
};