'use client';

import { FC, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { TextField } from '@/components/_ui/TextField';
import { Button } from '@/components/_ui/Button';
import { UserAccountProps } from '@/lib/types';
import { FullNameFields } from './fields/FullName';
import { PhoneNumberFields } from './fields/PhoneNumber';
import { addressBuilder, emergencyContactBuilder, phoneNumberBuilder } from '@/helpers/builder';
import * as z from 'zod';

const AccountFormSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(100),
  lastName: z.string().min(1, "Last name is required").max(100),
  email: z.email("Invalid email address").min(1, "Email is required").max(100),
})

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
}

interface AccountFormProps {
  onCancel?: () => void;
}

export const AccountForm: FC<AccountFormProps> = ({ onCancel }) => {
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setFormErrors({});

    const form = event.currentTarget;
    const formData = new FormData(form);
    const address = addressBuilder({
      street: formData.get('street') as string,
      street2: formData.get('street2') as string,
      city: formData.get('city') as string,
      state: formData.get('state') as string,
      zipCode: formData.get('zipCode') as string,
      country: formData.get('country') as string,
    });
    const emergencyContact = emergencyContactBuilder({
      firstName: formData.get('emergencyFirstName') as string,
      lastName: formData.get('emergencyLastName') as string,
      relationship: formData.get('emergencyRelationship') as string,
      phoneNumber: {
        areaCode: formData.get('emergencyAreaCode') as string,
        prefix: formData.get('emergencyPrefix') as string,
        lineNum: formData.get('emergencyLineNum') as string,
      },
    });
    const phoneNumber = phoneNumberBuilder(
      formData.get('areaCode') as string,
      formData.get('prefix') as string,
      formData.get('lineNum') as string,
    );
    const data = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
    };

    const payload = {
      ...data,
      address,
      emergencyContact,
      phoneNumber
    };

    console.log({payload})

    try {
      const validationResult = z.object({
        ...AccountFormSchema.shape
      }).safeParse(payload);

      if (!validationResult.success) {
        const errorTree = z.treeifyError(validationResult.error);
        setFormErrors(errorTree.properties || {});
        setIsLoading(false);
        return;
      }
      const response = await fetch(`/api/user?id=${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setFormErrors(errorData.errors || {});
      } else {
        const updatedUser = await response.json();
        setFormData(updatedUser.user);
      }
      setIsLoading(false);
      if (onCancel) onCancel();
    } catch (error) {
      console.error('Error updating user data:', error);
      setIsLoading(false);
      if (onCancel) onCancel();
    }
  };

  return (
    <div className="form-container full-page">
      <h2>Account Info</h2>
      <form onSubmit={handleSubmit}>
        <FullNameFields
          firstName={formData.firstName}
          lastName={formData.lastName}
          isLoading={isLoading}
          errors={{ firstName: formErrors.firstName?.errors, lastName: formErrors.lastName?.errors }}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          initialValue={formData?.email || ''}
          disabled={isLoading}
          errorMsg={formErrors.email?.errors[0]}
        />
        <div className="field-group">
          Address:
          <TextField
            label="Street"
            name="street"
            type="text"
            initialValue={formData?.address?.street || ''}
            disabled={isLoading}
          />
          <TextField
            label="Street 2"
            name="street2"
            type="text"
            initialValue={formData?.address?.street2 || ''}
            disabled={isLoading}
          />
          <div className="two-thirds-group">
            <TextField
              label="City"
              name="city"
              type="text"
              initialValue={formData?.address?.city || ''}
              disabled={isLoading}
            />
            <TextField
              label="State"
              name="state"
              type="text"
              initialValue={formData?.address?.state || ''}
              disabled={isLoading}
            />
          </div>
          <div className="flex-fields-container">
            <TextField
              label="Zip Code"
              name="zipCode"
              type="text"
              initialValue={formData?.address?.zipCode || ''}
              disabled={isLoading}
            />
            <TextField
              label="Country"
              name="country"
              type="text"
              initialValue={formData?.address?.country || 'USA'}
              disabled={isLoading}
            />
          </div>
        </div>
        <PhoneNumberFields
          areaCode={formData?.phoneNum ? formData.phoneNum.split('-')[0] : ''}
          prefix={formData?.phoneNum ? formData.phoneNum.split('-')[1] : ''}
          lineNum={formData?.phoneNum ? formData.phoneNum.split('-')[2] : ''}
          isLoading={isLoading}
        />
        <div className="field-group divider-top">
          <h3>Emergency Contact</h3>
          <FullNameFields
            firstName={formData?.emergencyContact?.firstName || ''}
            lastName={formData?.emergencyContact?.lastName || ''}
            isLoading={isLoading}
            formFirstName="emergencyFirstName"
            formLastName="emergencyLastName"
          />
          <TextField
            label="Relationship"
            name="emergencyRelationship"
            type="text"
            initialValue={formData?.emergencyContact?.relationship || ''}
            disabled={isLoading}
          />
          <PhoneNumberFields
            areaCode={formData?.emergencyContact?.phoneNum ? formData.emergencyContact.phoneNum.split('-')[0] : ''}
            prefix={formData?.emergencyContact?.phoneNum ? formData.emergencyContact.phoneNum.split('-')[1] : ''}
            lineNum={formData?.emergencyContact?.phoneNum ? formData.emergencyContact.phoneNum.split('-')[2] : ''}
            isLoading={isLoading}
            formAreaCode="emergencyAreaCode"
            formPrefix="emergencyPrefix"
            formLineNum="emergencyLineNum"
          />
        </div>
        <div className="two-thirds-group reverse">
          <Button ariaLabel="Update Account" type="submit" disabled={isLoading}>Update Account</Button>
          <Button ariaLabel="Cancel Changes" className="text-style-btn danger" type="button" onClick={onCancel}>Cancel</Button>
        </div>
      </form>
    </div>
  );
}