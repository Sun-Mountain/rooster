'use client';

import { FC, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { TextField } from '@/components/_ui/TextField';
import { Button } from '@/components/_ui/Button';
import { UserAccountProps } from '@/lib/types';
import { FullNameFields } from './fields/FullName';
import { PhoneNumberFields } from './fields/PhoneNumber';
import { addressBuilder, emergencyContactBuilder, phoneNumberBuilder } from '@/helpers/builder';

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
  address?: {
    street?: {
      errors: string[];
    };
    street2?: {
      errors: string[];
    };
    city?: {
      errors: string[];
    };
    state?: {
      errors: string[];
    };
    zipCode?: {
      errors: string[];
    };
    country?: {
      errors: string[];
    };
  };
  phoneNumber?: {
    areaCode?: {
      errors: string[];
    };
    prefix?: {
      errors: string[];
    };
    lineNum?: {
      errors: string[];
    };
  };
  emergencyContact?: {
    firstName?: {
      errors: string[];
    };
    lastName?: {
      errors: string[];
    };
    relationship?: {
      errors: string[];
    };
    phoneNumber?: {
      areaCode?: {
        errors: string[];
      };
      prefix?: {
        errors: string[];
      };
      lineNum?: {
        errors: string[];
      };
    };
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
    const phoneNumber = phoneNumberBuilder({
      areaCode: formData.get('areaCode') as string,
      prefix: formData.get('prefix') as string,
      lineNum: formData.get('lineNum') as string,
    });

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

    try {
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
    } catch (error) {
      console.error('Error updating user data:', error);
    } finally {
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
            errorMsg={formErrors.address?.street?.errors[0]}
          />
          <TextField
            label="Street 2"
            name="street2"
            type="text"
            initialValue={formData?.address?.street2 || ''}
            disabled={isLoading}
            errorMsg={formErrors.address?.street2?.errors[0]}
          />
          <div className="two-thirds-group">
            <TextField
              label="City"
              name="city"
              type="text"
              initialValue={formData?.address?.city || ''}
              disabled={isLoading}
              errorMsg={formErrors.address?.city?.errors[0]}
            />
            <TextField
              label="State"
              name="state"
              type="text"
              initialValue={formData?.address?.state || ''}
              disabled={isLoading}
              errorMsg={formErrors.address?.state?.errors[0]}
            />
          </div>
          <div className="flex-fields-container">
            <TextField
              label="Zip Code"
              name="zipCode"
              type="text"
              initialValue={formData?.address?.zipCode || ''}
              disabled={isLoading}
              errorMsg={formErrors.address?.zipCode?.errors[0]}
            />
            <TextField
              label="Country"
              name="country"
              type="text"
              initialValue={formData?.address?.country || 'USA'}
              disabled={isLoading}
              errorMsg={formErrors.address?.country?.errors[0]}
            />
          </div>
        </div>
        <PhoneNumberFields
          areaCode={formData?.phoneNumber?.areaCode || ''}
          prefix={formData?.phoneNumber?.prefix || ''}
          lineNum={formData?.phoneNumber?.lineNum || ''}
          isLoading={isLoading}
          errors={{
            areaCode: formErrors.phoneNumber?.areaCode?.errors,
            prefix: formErrors.phoneNumber?.prefix?.errors,
            lineNum: formErrors.phoneNumber?.lineNum?.errors,
          }}
        />
        <div className="field-group divider-top">
          <h3>Emergency Contact</h3>
          <FullNameFields
            firstName={formData?.emergencyContact?.firstName || ''}
            lastName={formData?.emergencyContact?.lastName || ''}
            isLoading={isLoading}
            formFirstName="emergencyFirstName"
            formLastName="emergencyLastName"
            errors={{
              firstName: formErrors.emergencyContact?.firstName?.errors,
              lastName: formErrors.emergencyContact?.lastName?.errors,
            }}
          />
          <TextField
            label="Relationship"
            name="emergencyRelationship"
            type="text"
            initialValue={formData?.emergencyContact?.relationship || ''}
            disabled={isLoading}
            errorMsg={formErrors.emergencyContact?.relationship?.errors[0]}
          />
          <PhoneNumberFields
            areaCode={formData?.emergencyContact?.phoneNumber?.areaCode || ''}
            prefix={formData?.emergencyContact?.phoneNumber?.prefix || ''}
            lineNum={formData?.emergencyContact?.phoneNumber?.lineNum || ''}
            isLoading={isLoading}
            formAreaCode="emergencyAreaCode"
            formPrefix="emergencyPrefix"
            formLineNum="emergencyLineNum"
            errors={{
              areaCode: formErrors.emergencyContact?.phoneNumber?.areaCode?.errors,
              prefix: formErrors.emergencyContact?.phoneNumber?.prefix?.errors,
              lineNum: formErrors.emergencyContact?.phoneNumber?.lineNum?.errors,
            }}
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