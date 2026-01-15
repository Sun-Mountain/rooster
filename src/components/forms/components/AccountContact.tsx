'use client';

import { useEffect, useState, SetStateAction, Dispatch } from "react";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

import { MissingInfoProps } from "@/components/forms/AccountForm";
import { Button } from "@/components/_ui/Button";
import { TextField } from "@/components/_ui/TextField";
import { Alert, AlertMsgProps } from "@/components/_ui/Alert";

interface AccountContactFormProps {
  userId: string;
  userEmail: string;
  setMissingInfo: Dispatch<SetStateAction<MissingInfoProps>>;
  missingInfo: MissingInfoProps;
}

interface AccountContactInfoProps {
  primaryEmail: string;
  secondaryEmail?: string;
  phone: string;
  preferredContact?: string;
}

export const AccountContactForm = ({ userId, userEmail, setMissingInfo, missingInfo }: AccountContactFormProps
) => {
  const [userContactInfo, setUserContactInfo] = useState<AccountContactInfoProps | null>(null);
  const [alertMsg, setAlertMsg] = useState<AlertMsgProps | null>(null);

  useEffect(() => {
    // Fetch existing contact info
    if (!userId) return;
    fetch(`/api/user/${userId}/contactInfo`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        if (!data.error) {
          setUserContactInfo({
            primaryEmail: userEmail,
            secondaryEmail: data.secondaryEmail || '',
            phone: data.phone || '',
            preferredContact: data.preferredContact || '',
          });
        }
      })
      .catch(error => {
        console.error('Error fetching contact info:', error);
      });
  }, [userId, userEmail]);

  useEffect(() => {
    // Update missing info state
    setMissingInfo(prev => ({
      ...prev,
      userPhone: !userContactInfo?.phone,
    }));
  }, [userContactInfo, setMissingInfo]);

  const handleContactMethodChange = (event: SelectChangeEvent) => {
    if (userContactInfo) {
      setUserContactInfo({ ...userContactInfo, preferredContact: event.target.value as string });
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const secondaryEmail = formData.get('secondaryEmail') as string;
    const phone = formData.get('phone') as string;
    const preferredContact = formData.get('preferredContact') as string;

    if (!userContactInfo) {
      // Create new contact info
      fetch(`/api/user/${userId}/contactInfo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          secondaryEmail,
          phone,
          preferredContact
        }),
      })
        .then(async (res) => {
          if (res.ok) {
            const data = await res.json();
            setUserContactInfo(data);
            setAlertMsg({ type: 'success', message: 'Contact information updated successfully.' });
          } else {
            const errorData = await res.json();
            setAlertMsg({ type: 'error', message: `Error: ${errorData.error}` });
          }
        })
        .catch((error) => {
          console.error('Error creating contact info:', error);
          setAlertMsg({ type: 'error', message: 'An unexpected error occurred.' });
        });
    } else {
      // Update existing contact info
      fetch(`/api/user/${userId}/contactInfo`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          secondaryEmail,
          phone,
          preferredContact,
        }),
      })
        .then(async (res) => {
          if (res.ok) {
            const data = await res.json();
            setUserContactInfo(data);
            setAlertMsg({ type: 'success', message: 'Contact information updated successfully.' });
          } else {
            const errorData = await res.json();
            setAlertMsg({ type: 'error', message: `Error: ${errorData.error}` });
          }
        })
        .catch((error) => {
          console.error('Error updating contact info:', error);
          setAlertMsg({ type: 'error', message: 'An unexpected error occurred.' });
        });
    }
  };

  return (
    <div className="form-container section-container">
      <div className="form-header">
        <h3>Contact</h3>
        {alertMsg && <Alert type={alertMsg.type} className="transparent no-margin no-padding">{alertMsg.message}</Alert>}
      </div>
      <form onSubmit={onSubmit}>
        <div className="flex-fields-container">
          <TextField
            label="Primary Email*"
            name="primaryEmail"
            initialValue={userEmail}
            disabled
          />
          <TextField
            label="Secondary Email"
            name="secondaryEmail"
            initialValue={userContactInfo?.secondaryEmail || ''}
          />
        </div>
        <div className="flex-fields-container">
          <TextField
            label="Phone Number*"
            name="phone"
            initialValue={userContactInfo?.phone || ''}
            errorMsg={missingInfo.userPhone ? "Phone number is required" : undefined}
          />
          <FormControl fullWidth className="text-field-container">
            <InputLabel id="demo-simple-select-label">Preferred Contact</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={userContactInfo?.preferredContact || ''}
              label="preferredContact"
              name="preferredContact"
              onChange={handleContactMethodChange}
            >
              <MenuItem value="phone">Phone</MenuItem>
              <MenuItem value="text">Text</MenuItem>
              <MenuItem value="email">Email</MenuItem>
              <MenuItem value="secondaryEmail">Secondary Email</MenuItem>
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