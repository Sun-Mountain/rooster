'use client';

import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AccountLinks } from '../AccountLinks';
import { signIn } from 'next-auth/react';
import { Button } from '../UI/Button';
import { TextField } from '../UI/TextField';

interface AccountFormProps {
  showSignIn?: boolean;
  showSignUp?: boolean;
}

export const AccountForm: FC<AccountFormProps> = (
  { showSignIn, showSignUp }
) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const values = Object.fromEntries(formData.entries());

    let response;

    if (showSignUp) {
      response = await signIn("credentials", {
        email: values.email as string,
        password: values.password as string,
        callbackUrl: `${window.location.origin}/`
      });

      if (response?.error) {
        console.log("Failed to sign in:", response.error);
      }
    }

    if (showSignIn) {
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
        {showSignIn && (
          <>
            <TextField
              label="First Name"
              name="firstName"
              value=""
              type="text"
            />
            <TextField
              label="Last Name"
              name="lastName"
              value=""
              type="text"
            />
          </>
        )}
        <TextField
          label="Email"
          name="email"
          value=""
          type="email"
        />
        <TextField
          label="Password"
          name="password"
          value=""
          type="password"
        />
        {showSignIn && (
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            value=""
            type="password"
          />
        )}
        <Button defaultDisabled={isLoading} type="submit">{isLoading ? 'Loading...' : (showSignIn ? 'Sign Up' : 'Sign In')}</Button>
      </form>
      <AccountLinks showSignIn={showSignIn} showSignUp={showSignUp} />
    </div>
  );
};
