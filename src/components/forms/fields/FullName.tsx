import { TextField } from '@/components/_ui/TextField';

interface FullNameFieldsProps {
  firstName: string;
  lastName: string;
  isLoading: boolean;
  formFirstName?: string;
  formLastName?: string;
  errors?: {
    firstName?: string[];
    lastName?: string[];
  };
}

export const FullNameFields = ({ firstName, lastName, isLoading, formFirstName = "firstName", formLastName = "lastName", errors }: FullNameFieldsProps) => {
  return (
      <div className="field-group">
        Full Name:
        <div className="flex-fields-container">
          <TextField
            label="First Name"
            name={formFirstName}
            type="text"
            initialValue={firstName || ''}
            disabled={isLoading}
            errorMsg={errors?.firstName?.[0]}
          />
          <TextField
            label="Last Name"
            name={formLastName}
            type="text"
            initialValue={lastName || ''}
            disabled={isLoading}
            errorMsg={errors?.lastName?.[0]}
          />
        </div>
      </div>
  )
}