"use client";

import { ChangeEvent, useEffect, useState } from "react";
import {
  TextField as TextFieldComponent,
  InputLabelProps,
  InputAdornment,
} from "@mui/material";

interface TextFieldProps {
  label: string;
  name: string;
  className?: string;
  initialValue?: string | number;
  disabled?: boolean;
  multiline?: boolean;
  rows?: number;
  type?: "text" | "password" | "email" | "number" | "date" | "time";
  errorMsg?: string;
  shrink?: boolean;
  slotAdornment?: React.ReactNode;
  resetInitialValue?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  InputLabelProps?: InputLabelProps;
}

const TextField = ({
  label,
  name,
  className,
  initialValue = "",
  disabled = false,
  type,
  multiline = false,
  rows,
  errorMsg,
  onChange,
  InputLabelProps,
  slotAdornment,
  resetInitialValue = false,
}: TextFieldProps) => {
  const [defaultValue, setDefaultValue] = useState(initialValue);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDefaultValue(event.target.value);
    if (onChange) onChange(event);
  };

  useEffect(() => {
    const setInitialValue = () => {
      if (initialValue) {
        setDefaultValue(initialValue);
      } else {
        setDefaultValue("");
      }
    };

    setInitialValue();
  }, [initialValue, resetInitialValue]);

  return (
    <div className="text-field-container">
      <TextFieldComponent
        className={`text-field ${className || ""}`}
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

export default TextField;