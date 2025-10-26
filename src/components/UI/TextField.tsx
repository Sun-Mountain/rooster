'use client';

import { ChangeEvent, useState } from 'react';
import { TextField as TextFieldUI } from '@mui/material';

interface TextFieldProps {
  label: string;
  name: string;
  initialValue: string;
  helperText?: string;
  required?: boolean;
  type?: 'text' | 'password' | 'email' | 'number';
}

export const TextField = (
  { label, initialValue, helperText, required = false, type = 'text', ...props }: TextFieldProps
) => {
  const [inputValue, setInputValue] = useState(initialValue);

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
        {...props}
      />
    </div>
  );
};