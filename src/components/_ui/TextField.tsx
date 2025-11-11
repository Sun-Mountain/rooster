import { TextField as TextFieldComponent } from "@mui/material";

interface TextFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'password' | 'email' | 'number';
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextField = ({ label, name, type, value, onChange }: TextFieldProps) => {

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
        value={value}
        onChange={handleOnChange}
      />
    </div>
  );
}