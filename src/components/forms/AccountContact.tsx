'use client';

import { useEffect, useState } from "react";
import { Button } from "@/components/_ui/Button";
import { TextField } from "@/components/_ui/TextField";
import { Alert, AlertMsgProps } from "@/components/_ui/Alert";

interface AccountContactFormProps {
  userId: string;
  userEmail: string;
}

interface AccountContactInfoProps {
  primaryEmail: string;
  secondaryEmail?: string;
  phone: string;
}

export const AccountContactForm = ({ userId, userEmail }: AccountContactFormProps
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
          console.log({ data });
          setUserContactInfo({
            primaryEmail: userEmail,
            secondaryEmail: data.secondaryEmail || '',
            phone: data.phone || '',
          });
        }
      })
      .catch(error => {
        console.error('Error fetching contact info:', error);
      });
  }, [userId, userEmail]);

  if (!userContactInfo) {
    return <div>Loading...</div>;
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const secondaryEmail = formData.get('secondaryEmail') as string;
    const phone = formData.get('phone') as string;

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
        {alertMsg && <Alert type={alertMsg.type} className="transparent">{alertMsg.message}</Alert>}
      </div>
      <form onSubmit={onSubmit}>
        <div className="flex-fields-container">
          <TextField label="Primary Email*" name="primaryEmail" initialValue={userEmail} disabled />
          <TextField label="Secondary Email" name="secondaryEmail" initialValue={userContactInfo?.secondaryEmail || ''} />
        </div>
        <div>
          <TextField label="Phone Number*" name="phone" initialValue={userContactInfo?.phone || ''} />
        </div>
        <div className="btn-container">
          <Button type="submit" className="btn btn-primary">Update</Button>
        </div>
      </form>
    </div>
  )
};