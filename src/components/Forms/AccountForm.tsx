'use client';

import { FC, useEffect, useState } from 'react';
import { Button } from '../UI/Button';
import { TextField } from '../UI/TextField';
import { FullNameFields } from '../Forms/Fields/FullName';
import { PhoneNumberFields } from './Fields/PhoneNumber';
import { useSession } from 'next-auth/react';
import { UserProps as User } from '@/lib/interfaces/user';


export const AccountForm: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    fetch(`/api/user?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      setUserData(data.user);
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
    });
  }, [userId]);

  console.log({userData});

  const onSubmit = async (event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) => {
    event.preventDefault();
    setIsLoading(true);
    setIsLoading(false);
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="form-container">
      <form onSubmit={onSubmit}>
        <FullNameFields firstNameValue={userData?.firstName || ''} lastNameValue={userData?.lastName || ''} />
        <TextField
          label="Email"
          name="email"
          initialValue={userData?.email || ''}
          type="email"
        />
        <PhoneNumberFields {...userData?.phoneNumber} />
        <TextField
          label="Address 1"
          name="street1"
          initialValue=''
          type="text"
        />
        <TextField
          label="Address 2"
          name="street2"
          initialValue=''
          type="text"
        />
        <TextField
          label="City"
          name="city"
          initialValue=''
          type="text"
        />
        <TextField
          label="State/Province"
          name="state"
          initialValue=""
          type="text"
        />
        <TextField
          label="ZIP/Postal Code"
          name="zip"
          initialValue=""
          type="text"
        />
        <TextField
          label="Country"
          name="country"
          initialValue=""
          type="text"
        />
        <Button defaultDisabled={isLoading} type="submit">
          {isLoading ? 'Loading...' : 'Save Account Settings'}
        </Button>
      </form>
    </div>
  );
};
