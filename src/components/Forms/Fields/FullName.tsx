import { TextField } from "@/components/UI/TextField"

interface FullNameFieldsProps {
  firstNameFieldName?: string;
  lastNameFieldName?: string;
  firstNameValue?: string;
  lastNameValue?: string;
  emergencyContact?: boolean;
}

export const FullNameFields = ({
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
          />
          <TextField
            label="Last Name"
            name={
              lastNameFieldName ? lastNameFieldName : 'lastName'
            }
            initialValue={lastNameValue ? lastNameValue : ''}
            type="text"
          />
        </div>
      </label>
    </div>
  )
}