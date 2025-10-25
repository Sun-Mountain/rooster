import { TextField } from "@/components/UI/TextField"

interface FullNameFieldsProps {
  firstNameFieldName?: string;
  lastNameFieldName?: string;
  firstNameValue?: string;
  lastNameValue?: string;
}

export const FullNameFields = ({ firstNameFieldName, lastNameFieldName, firstNameValue, lastNameValue }: FullNameFieldsProps) => {
  return (
    <div className="flex-fields-container">
      <TextField
        label="First Name"
        name={
          firstNameFieldName ? firstNameFieldName : 'firstName'
        }
        value={firstNameValue ? firstNameValue : ''}
        type="text"
      />
      <TextField
        label="Last Name"
        name={
          lastNameFieldName ? lastNameFieldName : 'lastName'
        }
        value={lastNameValue ? lastNameValue : ''}
        type="text"
      />
    </div>
  )
}