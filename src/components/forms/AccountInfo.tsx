'use client';

import { FormEvent, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { Alert, AlertMsgProps } from "@/components/_ui/Alert";
import { Button } from "@/components/_ui/Button";
import { TextField } from "@/components/_ui/TextField";
import { User } from "@/lib/auth";
import { updateUser } from "@/lib/auth-client";

interface AccountInfoFormProps {
  user: User;
}

export const AccountInfoForm = ({ user }: AccountInfoFormProps) => {
  // const router = useRouter();
  const [pronoun, setPronoun] = useState(user.pronouns || '');
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    pronouns: pronoun
  });
  const [alertMsg, setAlertMsg] = useState<AlertMsgProps | null>(null);

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
        {alertMsg && <Alert type={alertMsg.type} className="transparent">{alertMsg.message}</Alert>}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex-fields-container">
          <TextField
            label="First Name*"
            name="firstName"
            initialValue={formData.firstName}
            onChange={handleChange}
          />
          <TextField
            label="Last Name*"
            name="lastName"
            initialValue={formData.lastName}
            onChange={handleChange}
          />
          <FormControl fullWidth className="text-field-container">
            <InputLabel id="demo-simple-select-label">Pronouns</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
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