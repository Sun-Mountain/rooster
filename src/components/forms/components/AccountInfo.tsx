'use client';

import { FormEvent, useEffect, useState, Dispatch, SetStateAction } from "react";
import { MissingInfoProps } from "@/components/forms/AccountForm";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { Alert, AlertMsgProps } from "@/components/_ui/Alert";
import { Button } from "@/components/_ui/Button";
import { TextField } from "@/components/_ui/TextField";
import { User } from "@/lib/auth";
import { updateUser } from "@/lib/auth-client";

interface AccountInfoFormProps {
  user: User;
  setMissingInfo: Dispatch<SetStateAction<MissingInfoProps>>;
  missingInfo: MissingInfoProps;
}

export const AccountInfoForm = ({ user, setMissingInfo, missingInfo }: AccountInfoFormProps) => {
  // const router = useRouter();
  const [pronoun, setPronoun] = useState(user.pronouns || '');
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    pronouns: pronoun
  });
  const [alertMsg, setAlertMsg] = useState<AlertMsgProps | null>(null);

  useEffect(() => {
    // Update missing info state
    setMissingInfo(prev => ({
      ...prev,
      firstName: !formData.firstName,
      lastName: !formData.lastName,
    }));
  }, [formData, setMissingInfo]);

  const handlePronounChange = (event: SelectChangeEvent) => {
    setPronoun(event.target.value as string);
  };

  const handleChange=(e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => prev ? { ...prev, [name]: value } : prev);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { error } = await updateUser({
      firstName: formData.firstName,
      lastName: formData.lastName,
      name: `${formData.firstName} ${formData.lastName}`,
      pronouns: pronoun
    });

    if (error) {
      setAlertMsg({ message: error.message || "An unknown error occurred", type: 'error' });
    } else {
      setAlertMsg({ message: "User updated successfully", type: 'success' });
    }
  }

  return (
    <div className="form-container section-container">
      <div className="form-header">
        <h3>Identity</h3>
        {alertMsg && <Alert type={alertMsg.type} className="transparent no-margin no-padding">{alertMsg.message}</Alert>}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex-fields-container">
          <TextField
            label="First Name*"
            name="firstName"
            initialValue={formData.firstName}
            onChange={handleChange}
            errorMsg={missingInfo.firstName ? "First name is required" : undefined}
          />
          <TextField
            label="Last Name*"
            name="lastName"
            initialValue={formData.lastName}
            onChange={handleChange}
            errorMsg={missingInfo.lastName ? "Last name is required" : undefined}
          />
          <FormControl fullWidth className="text-field-container">
            <InputLabel id="pronoun-label">Pronouns</InputLabel>
            <Select
              labelId="pronoun-label"
              id="pronoun-select"
              value={pronoun}
              label="pronouns"
              onChange={handlePronounChange}
            >
              <MenuItem value="">
                <em>-</em>
              </MenuItem>
              <MenuItem value="he/him">He/Him</MenuItem>
              <MenuItem value="she/her">She/Her</MenuItem>
              <MenuItem value="they/them">They/Them</MenuItem>
              <MenuItem value="ze/zir">Ze/Zir</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="btn-container">
          <Button type="submit" className="btn btn-primary">Update</Button>
        </div>
      </form>
    </div>
  )
};