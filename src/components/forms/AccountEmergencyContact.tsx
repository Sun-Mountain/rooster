'use client';

import { useEffect, useState } from "react";
import { Button } from "@/components/_ui/Button";
import { TextField } from "@/components/_ui/TextField";import { Alert, AlertMsgProps } from "@/components/_ui/Alert";

interface AccountEmergencyContactFormProps {
  userId: string;
}

interface EmergencyContactInfoProps {
  firstName: string;
  lastName: string;
  phone: string;
  relationship?: string;
}

export const AccountEmergencyContactForm = ({ userId }: AccountEmergencyContactFormProps) => {
  const [emergencyContactInfo, setEmergencyContactInfo] = useState<EmergencyContactInfoProps | null>(null);
  const [alertMsg, setAlertMsg] = useState<AlertMsgProps | null>(null);

  useEffect(() => {
    if (!userId) return;

    fetch(`/api/user/${userId}/emergencyContact`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        if (!data.error) {
          setEmergencyContactInfo({
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            phone: data.phone || '',
            relationship: data.relationship || '',
          });
        }
      })
      .catch(error => {
        console.error('Error fetching emergency contact info:', error);
      });
  }, [userId]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const phone = formData.get('phone') as string;
    const relationship = formData.get('relationship') as string;

    fetch(`/api/user/${userId}/emergencyContact`, {
      method: emergencyContactInfo ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        phone,
        relationship,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setAlertMsg({ message: data.error.message || "An unknown error occurred", type: 'error' });
        } else {
          setAlertMsg({ message: "Emergency contact updated successfully", type: 'success' });
          setEmergencyContactInfo({
            firstName,
            lastName,
            phone,
            relationship,
          });
        }
      })
      .catch(error => {
        console.error('Error updating emergency contact info:', error);
        setAlertMsg({ message: "An unknown error occurred", type: 'error' });
      });
  };

  return (
    <div className="form-container section-container">
      <div className="form-header">
        <h3>Emergency Contact</h3>
        {alertMsg && <Alert type={alertMsg.type} className="transparent">{alertMsg.message}</Alert>}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex-fields-container">
          <TextField
            label="First Name*"
            name="firstName"
            initialValue={emergencyContactInfo?.firstName || ''}
          />
          <TextField
            label="Last Name*"
            name="lastName"
            initialValue={emergencyContactInfo?.lastName || ''}
          />
        </div>
        <div className="flex-fields-container">
          <TextField
            label="Phone Number*"
            name="phone"
            initialValue={emergencyContactInfo?.phone || ''}
          />
          <TextField
            label="Relationship"
            name="relationship"
            initialValue={emergencyContactInfo?.relationship || ''}
          />
        </div>
        <div className="btn-container">
          <Button type="submit" className="btn btn-primary">Update</Button>
        </div>
      </form>
    </div>
  )
};