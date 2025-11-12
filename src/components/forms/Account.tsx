'use client';

import { FC, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { TextField } from '@/components/_ui/TextField';
import { Button } from '@/components/_ui/Button';
import { UserAccountProps } from '@/lib/types';

interface FormErrorProps {
  firstName?: {
    errors: string[];
  };
  lastName?: {
    errors: string[];
  };
  email?: {
    errors: string[];
  };
  password?: {
    errors: string[];
  };
  confirmPassword?: {
    errors: string[];
  };
}

export const AccountForm: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<UserAccountProps | null>(null);
  const [formErrors, setFormErrors] = useState<FormErrorProps>({});

  const { data: session } = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    if (!userId) return;
    
    fetch(`/api/user?id=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      setFormData(data.user);
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
    });
  }, [userId]);

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="form-container full-page">
      <h2>Account Info</h2>
      <form>
        <div className="field-group">
          <label> Full Name:
            <div className="flex-fields-container">
              <TextField
                label="First Name"
                name="firstName"
                type="text"
                initialValue={formData?.firstName || ''}
                disabled={isLoading}
                errorMsg={formErrors.firstName?.errors[0]}
              />
              <TextField
                label="Last Name"
                name="lastName"
                type="text"
                initialValue={formData?.lastName || ''}
                disabled={isLoading}
                errorMsg={formErrors.lastName?.errors[0]}
              />
            </div>
          </label>
        </div>
        <TextField
          label="Email"
          name="email"
          type="email"
          initialValue={formData?.email || ''}
          disabled={isLoading}
          errorMsg={formErrors.email?.errors[0]}
        />
        <Button type="submit" disabled={isLoading}>Update Account</Button>
      </form>
    </div>
  );
}