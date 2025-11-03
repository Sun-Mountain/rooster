import { TextField } from "@/components/UI/TextField"

interface FullNameFieldsProps {
  isLoading?: boolean;
  firstNameError?: string;
  lastNameError?: string;
  firstNameFieldName?: string;
  lastNameFieldName?: string;
  firstNameValue?: string;
  lastNameValue?: string;
  emergencyContact?: boolean;
}

export const FullNameFields = ({
  isLoading,
  firstNameError,
  lastNameError,
  firstNameFieldName,
  lastNameFieldName,
  firstNameValue,
  lastNameValue,
  emergencyContact
}: FullNameFieldsProps) => {
  return (
    <div className="field-group">
      <label className="field-label">{emergencyContact ? 'Contact ' : ''}Full Name:
        <div className="flex-fields-container">
          <TextField
            label="First Name"
            name={
              firstNameFieldName ? firstNameFieldName : 'firstName'
            }
            initialValue={firstNameValue ? firstNameValue : ''}
            type="text"
            disabled={isLoading}
            errorMessage={firstNameError}
          />
          <TextField
            label="Last Name"
            name={
              lastNameFieldName ? lastNameFieldName : 'lastName'
            }
            initialValue={lastNameValue ? lastNameValue : ''}
            type="text"
            disabled={isLoading}
            errorMessage={lastNameError}
          />
        </div>
      </label>
    </div>
  )
}