
import { useCallback, useEffect, useState } from "react";
import { Autocomplete as AutocompleteComponent, AutocompleteChangeDetails } from "@mui/material";
import { TextField } from "@/components/_ui/TextField";

interface AutoCompleteProps {
  options: { id: string; name: string }[];
  label: string;
  name: string;
  initialValue?: string;
  disabled?: boolean;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AutoComplete = ({
  options,
  label,
  name,
  initialValue,
  disabled = false,
  handleChange }: AutoCompleteProps) => {


  return (
    <>
      <AutocompleteComponent
        disabled={disabled}
        disablePortal
        id={`${name}-autocomplete`}
        options={options.map(option => option.name)}
        sx={{ width: "100%" }}
        renderInput={(params) => (
          <TextField {...params}
            label={label}
            name={name}
            disabled={disabled}
          />
        )}
      />
    </>
  )
}