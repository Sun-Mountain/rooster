'use client';

import { FC, useEffect, useState } from 'react';
import { Button } from '../UI/Button';
import { TextField } from '../UI/TextField';
import { EmergencyContactFields } from './Fields/EmergencyContact';
import { FullNameFields } from '../Forms/Fields/FullName';
import { PhoneNumberFields } from './Fields/PhoneNumber';
import { ZipCountryFields } from '../Forms/Fields/ZipCountry';
import { useSession } from 'next-auth/react';
import { UserProps as User, UserAccountFormProps } from '@/lib/interfaces/user';
import { buildUserData } from '@/helpers/buildUser';


export const AccountForm: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    if (!userId) return;

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

  const onSubmit = async (event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const values = Object.fromEntries(formData.entries());

    if (!userId) {
      console.log("User ID is missing.");
      setIsLoading(false);
      return;
    }

    const userData = buildUserData({ id: userId, ...values } as UserAccountFormProps);

    const response = await fetch('/api/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log("Failed to update user:", errorData.message);
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="form-container">
      <h2>Personal Information:</h2>
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
          initialValue={userData?.address?.street1 || ''}
          type="text"
        />
        <TextField
          label="Address 2"
          name="street2"
          initialValue={userData?.address?.street2 || ''}
          type="text"
        />
        <TextField
          label="City"
          name="city"
          initialValue={userData?.address?.city || ''}
          type="text"
        />
        <TextField
          label="State/Province"
          name="state"
          initialValue={userData?.address?.state || ''}
          type="text"
        />
        <ZipCountryFields zipValue={userData?.address?.zip || ''} countryValue={userData?.address?.country || 'USA'} />
        <EmergencyContactFields
          firstName={userData?.emergencyContact?.firstName || ''}
          lastName={userData?.emergencyContact?.lastName || ''}
          relationship={userData?.emergencyContact?.relationship || ''}
          phoneNumber={{
            areaCode: userData?.emergencyContact?.phoneNumber?.areaCode || '',
            numberGrp1: userData?.emergencyContact?.phoneNumber?.numberGrp1 || '',
            numberGrp2: userData?.emergencyContact?.phoneNumber?.numberGrp2 || '',
          }}
        />
        <Button defaultDisabled={isLoading} type="submit">
          {isLoading ? 'Loading...' : 'Save Account Settings'}
        </Button>
      </form>
    </div>
  );
};
