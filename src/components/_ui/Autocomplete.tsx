import { useState } from "react";
import { Autocomplete as AutocompleteComponent } from "@mui/material";
import TextField from "@mui/material/TextField";

interface AutoCompleteProps {
  options: { id: string; name: string }[];
  label: string;
  name: string;
  initialValue?: string;
  disabled?: boolean;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Autocomplete = ({
  options,
  label,
  name,
  initialValue,
  disabled = false,
  handleChange }: AutoCompleteProps) => {
  const [value, setValue] = useState<string>(initialValue || "");
  const [inputValue, setInputValue] = useState('');


  return (
    <>
      <AutocompleteComponent
        disabled={disabled}
        disablePortal
        id={`${name}-autocomplete`}
        options={options.map(option => option.name)}
        sx={{ width: "100%" }}
        value={value}
        onChange={(_, newValue: string | null) => {
          setValue(newValue || "");
          if (handleChange) {
            const selectedOption = options.find(option => option.name === newValue);
            const syntheticEvent = {
              target: {
                name,
                value: selectedOption ? selectedOption.id : ""
              }
            } as React.ChangeEvent<HTMLInputElement>;
            handleChange(syntheticEvent);
          }
        }}
        inputValue={inputValue}
        onInputChange={(_, newInputValue) => {
          setInputValue(newInputValue);
        }}
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