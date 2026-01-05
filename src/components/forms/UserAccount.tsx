'use client';

import { useEffect, useState } from "react";
import { User } from "@/lib/auth";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { Button } from "@/components/_ui/Button";
import { TextField } from "@/components/_ui/TextField";
import { updateUser } from "@/lib/auth-client";

export const AccountForm = ({ user }: { user: User }) => {
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    pronouns: user.pronouns || '',
    email: user.email,
    secondaryEmail: '',
    phone: '',
    preferredContact: 'email',
  });

  useEffect(() => {
    if (!user) return;

    // Fetch existing contact info
    fetch(`/api/user/${user.id}/contactInfo`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('Fetched contact info:', data);
        if (!data.error) {
          setFormData(prev => ({
            ...prev,
            secondaryEmail: data.secondaryEmail,
            phone: data.phone,
            preferredContact: data.preferredContact || 'email',
          }));
        }
      })
      .catch(error => {
        console.error('Error fetching contact info:', error);
      });
  }, [user]);

  const handleChange=(e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => prev ? { ...prev, [name]: value } : prev);
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setFormData(prev => prev ? { ...prev, [name]: value as string } : prev);
  };

  const onIdentitySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error } = await updateUser({
      firstName: formData.firstName,
      lastName: formData.lastName,
      name: `${formData.firstName} ${formData.lastName}`,
      pronouns: formData.pronouns,
    });

    console.log('Update identity error:', error);
  };

  const onContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const info = fetch(`/api/user/${user.id}/contactInfo`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        if (!data.error) {
          setFormData(prev => ({
            ...prev,
            secondaryEmail: data.secondaryEmail || '',
            phone: data.phone || '',
            preferredContact: data.preferredContact || 'email',
          }));
        }
      })
      .catch(error => {
        console.error('Error fetching contact info:', error);
      });

    if (!info) {
      // Create new contact info
      fetch(`/api/user/${user.id}/contactInfo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          secondaryEmail: formData.secondaryEmail,
          phone: formData.phone,
          preferredContact: formData.preferredContact,
        }),
      })
        .then(async (res) => {
          if (res.ok) {
            const data = await res.json();
            setFormData(prev => ({
              ...prev,
              secondaryEmail: data.secondaryEmail || '',
              phone: data.phone || '',
              preferredContact: data.preferredContact || 'email',
            }));
            console.log('Contact info created:', data);
          } else {
            const errorData = await res.json();
            console.error('Error creating contact info:', errorData.error);
          }
        })
        .catch((error) => {
          console.error('Error creating contact info:', error);
        });
    } else {
      // Update existing contact info
      fetch(`/api/user/${user.id}/contactInfo`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          secondaryEmail: formData.secondaryEmail,
          phone: formData.phone,
          preferredContact: formData.preferredContact,
        }),
      })
        .then(async (res) => {
          if (res.ok) {
            const data = await res.json();
            setFormData(prev => ({
              ...prev,
              secondaryEmail: data.secondaryEmail || '',
              phone: data.phone || '',
              preferredContact: data.preferredContact || 'email',
            }));
            console.log('Contact info updated:', data);
          } else {
            const errorData = await res.json();
            console.error('Error updating contact info:', errorData.error);
          }
        })
        .catch((error) => {
          console.error('Error updating contact info:', error);
        });
    }
  };

  return (
    <div>
      <div className="form-container section-container">
        <div className="form-header">
          <h3>Identity</h3>
        </div>
        <form onSubmit={onIdentitySubmit}>
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
                value={formData.pronouns}
                label="pronouns"
                onChange={handleSelectChange}
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
      <div className="form-container section-container">
        <div className="form-header">
          <h3>Contact</h3>
        </div>
        <form onSubmit={onContactSubmit}>
          <div className="flex-fields-container">
            <TextField
              label="Primary Email*"
              name="primaryEmail"
              initialValue={formData.email} disabled
            />
            <TextField
              label="Secondary Email"
              name="secondaryEmail"
              initialValue={formData?.secondaryEmail}
            />
          </div>
          <div className="flex-fields-container">
            <TextField
              label="Phone Number*"
              name="phone"
              initialValue={formData?.phone}
            />
            <FormControl fullWidth className="text-field-container">
              <InputLabel id="demo-simple-select-label">Preferred Contact</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formData.preferredContact}
                label="preferredContact"
                onChange={handleSelectChange}
              >
                <MenuItem value="phone">Phone</MenuItem>
                <MenuItem value="text">Text</MenuItem>
                <MenuItem value="email">Email</MenuItem>
                <MenuItem value="secondEmail">Second Email</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="btn-container">
            <Button type="submit" className="btn btn-primary">Update</Button>
          </div>
        </form>
      </div>
    </div>
  );
};