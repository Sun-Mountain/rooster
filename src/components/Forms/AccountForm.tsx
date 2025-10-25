'use client';

import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AccountLinks } from '../AccountLinks';
import { signIn } from 'next-auth/react';
import { Button } from '../UI/Button';
import { TextField } from '../UI/TextField';
import { FullNameFields } from '../Forms/Fields/FullName';
import { PhoneNumberFields } from './Fields/PhoneNumber';

interface AccountFormProps {
  formType?: 'sign-in' | 'sign-up' | 'settings';
}

export const AccountForm: FC<AccountFormProps> = (
  { formType }
) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const buttonText = () => {
    switch (formType) {
      case 'sign-in':
        return 'Sign In';
      case 'sign-up':
        return 'Sign Up';
      case 'settings':
        return 'Save Account Settings';
      default:
        return 'Submit';
    }
  }

  const onSubmit = async (event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const values = Object.fromEntries(formData.entries());

    let response;

    if (formType === 'sign-in') {
      response = await signIn("credentials", {
        email: values.email as string,
        password: values.password as string,
        callbackUrl: `${window.location.origin}/`
      });

      if (response?.error) {
        console.log("Failed to sign in:", response.error);
      }
    }

    if (formType === 'sign-up') {
      console.log({values})
      if (values.password !== values.confirmPassword) {
        console.log("Passwords do not match");
        setIsLoading(false);
        return;
      }
      response = await fetch ('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        // setError(errorData.message || 'An error occurred. Please try again.');
        console.log('Error:', errorData);
        // console.log({error})
        setIsLoading(false);
        return;
      } else {
        router.push('/sign-in');
      }
    }
  }

  return (
    <div className="form-container">
      <form onSubmit={onSubmit}>
        {(formType === 'settings' || formType === 'sign-up') && (
          <>
            <FullNameFields />
          </>
        )}
        <TextField
          label="Email"
          name="email"
          value=""
          type="email"
        />
        {formType === 'settings' && (
          <>
            <PhoneNumberFields />
            <TextField
              label="Address 1"
              name="street1"
              value=""
              type="text"
            />
            <TextField
              label="Address 2"
              name="street2"
              value=""
              type="text"
            />
            <TextField
              label="City"
              name="city"
              value=""
              type="text"
            />
            <TextField
              label="State/Province"
              name="state"
              value=""
              type="text"
            />
            <TextField
              label="ZIP/Postal Code"
              name="zip"
              value=""
              type="text"
            />
            <TextField
              label="Country"
              name="country"
              value=""
              type="text"
            />
          </>
        )}
        {(formType === 'sign-in' || formType === 'sign-up') && (
          <TextField
            label="Password"
            name="password"
            value=""
            type="password"
          />
        )}
        {formType === 'sign-up' && (
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            value=""
            type="password"
          />
        )}
        <Button defaultDisabled={isLoading} type="submit">
          {isLoading ? 'Loading...' : buttonText()}
        </Button>
      </form>
      <AccountLinks showSignIn={formType === 'sign-up'} showSignUp={formType === 'sign-in'} />
    </div>
  );
};
