'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/_ui/Button";
import { TextField } from "@/components/_ui/TextField";
import { Alert, AlertMsgProps } from "@/components/_ui/Alert";

interface AccountAddressFormProps {
  userId: string;
}

interface AddressInfoProps {
  street1: string;
  street2?: string;
  city: string;
  state: string;
  zip: string;
}

export const AccountAddressForm = ({ userId }: AccountAddressFormProps) => {
  const [addressInfo, setAddressInfo] = useState<AddressInfoProps | null>(null);
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
          setAddressInfo({
            street1: data.street1 || '',
            street2: data.street2 || '',
            city: data.city || '',
            state: data.state || '',
            zip: data.zip || '',
          });
        }
      })
      .catch(error => {
        console.error('Error fetching contact info:', error);
      });
  }, [userId]);

  const handleChange=(e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddressInfo(prev => prev ? { ...prev, [name]: value } : prev);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const street1 = formData.get('street1') as string;
    const street2 = formData.get('street2') as string;
    const city = formData.get('city') as string;
    const state = formData.get('state') as string;
    const zip = formData.get('zip') as string

    fetch(`/api/user/${userId}/contactInfo`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ street1, street2, city, state, zip }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setAlertMsg({ message: data.error.msg || 'Error updating address', type: 'error' });
        } else {
          setAlertMsg({ message: 'Address updated successfully', type: 'success' });
          setAddressInfo({
            street1,
            street2,
            city,
            state,
            zip,
          });
        }
      })
      .catch(error => {
        console.error('Error updating address:', error);
        setAlertMsg({ message: 'Error updating address', type: 'error' });
      });
  };

  return (
    <div className="form-container section-container">
      <div className="form-header">
        <h3>Address</h3>
        {alertMsg && <Alert type={alertMsg.type} className="transparent">{alertMsg.message}</Alert>}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex-fields-container">
          <TextField
            label="Street 1"
            name="street1"
            initialValue={addressInfo?.street1 || ''}
            onChange={handleChange}
          />
          <TextField
            label="Street 2"
            name="street2"
            initialValue={addressInfo?.street2 || ''}
            onChange={handleChange}
          />
        </div>
        <div className="flex-fields-container">
          <TextField 
            label="City"
            name="city"
            initialValue={addressInfo?.city || ''}
            onChange={handleChange}
          />
          <TextField
            label="State"
            name="state"
            initialValue={addressInfo?.state || ''}
            onChange={handleChange}
          />
          <TextField
            label="Zip Code"
            name="zip"
            initialValue={addressInfo?.zip || ''}
            onChange={handleChange}
          />
        </div>
        <div className="btn-container">
          <Button type="submit" className="btn btn-primary">Update</Button>
        </div>
      </form>
    </div>
  )
};