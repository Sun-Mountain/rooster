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
  signInForm?: boolean;
  signUpForm?: boolean;
}

export const SignInSignOutForm: FC<AccountFormProps> = (
  { signInForm, signUpForm }
) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const values = Object.fromEntries(formData.entries());

    let response;

    if (signInForm) {
      response = await signIn("credentials", {
        email: values.email as string,
        password: values.password as string,
        callbackUrl: `${window.location.origin}/`
      });

      if (response?.error) {
        console.log("Failed to sign in:", response.error);
      }
    }

    if (signUpForm) {
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
        {signUpForm && (
          <>
            <FullNameFields />
          </>
        )}
        <TextField
          label="Email"
          name="email"
          initialValue=""
          type="email"
        />
        <TextField
          label="Password"
          name="password"
          initialValue=""
          type="password"
        />
        {signUpForm && (
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            initialValue=""
            type="password"
          />
        )}
        <Button defaultDisabled={isLoading} type="submit">
          {isLoading ? 'Loading...' : (signInForm ? 'Sign In' : 'Sign Up')}
        </Button>
      </form>
      <AccountLinks signInForm={signInForm} signUpForm={signUpForm} />
    </div>
  );
};
