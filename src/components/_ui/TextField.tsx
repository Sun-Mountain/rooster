import { TextField as TextFieldComponent } from "@mui/material";

interface TextFieldProps {
  label: string;
  name: string;
  disabled?: boolean;
  type?: 'text' | 'password' | 'email' | 'number';
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  errorMsg?: string;
}

export const TextField = ({ label, name, disabled = false, type, value, onChange, errorMsg }: TextFieldProps) => {

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(event);
  }

  return (
    <div className="text-field-container">
      <TextFieldComponent
        className="text-field"
        label={label}
        name={name}
        type={type}
        disabled={disabled}
        value={value}
        onChange={handleOnChange}
        helperText={errorMsg}
        error={!!errorMsg}
      />
    </div>
  );
}