'use client';

import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AccountLinks } from '../Links/Account';
import { signIn } from 'next-auth/react';
import { Button } from '../UI/Button';
import { TextField } from '../UI/TextField';
import { FullNameFields } from '../Forms/Fields/FullName';

import * as z from 'zod';

const SignInSchema = z.object({
  email: z.email().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }).max(100),
});

const SignUpSchema = z.object({
  firstName: z.string().min(1, { message: "First Name is required" }).max(50),
  lastName: z.string().min(1, { message: "Last Name is required" }).max(50),
  email: z.email(),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }).max(100),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

interface SignUpErrorProps {
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

interface SignInErrorProps {
  email?: {
    errors: string[];
  };
  password?: {
    errors: string[];
  };
}

interface AccountFormProps {
  signInForm?: boolean;
  signUpForm?: boolean;
}

export const SignInSignOutForm: FC<AccountFormProps> = (
  { signInForm, signUpForm }
) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [signInErrors, setSignInErrors] = useState<SignInErrorProps>({});
  const [signUpErrors, setSignUpErrors] = useState<SignUpErrorProps>({});

  const onSubmit = async (event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) => {
    event.preventDefault();
    setIsLoading(true);

    let validation;

    const formData = new FormData(event.currentTarget);
    const values = Object.fromEntries(formData.entries());

    let response;

    if (signInForm) {
      validation = SignInSchema.safeParse(values);

      if (!validation.success) {
        setSignInErrors(z.treeifyError(validation.error).properties || {});
        setIsLoading(false);
        return;
      }

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
      validation = SignUpSchema.safeParse(values);

      if (!validation.success) {
        // setSignUpErrors(z.treeifyError(validation.error) || {});
        setSignUpErrors(z.treeifyError(validation.error).properties || {});
        setIsLoading(false);
        console.log(signUpErrors)
        return;
      }
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
            <FullNameFields
              firstNameError={signUpErrors.firstName?.errors[0]}
              lastNameError={signUpErrors.lastName?.errors[0]}
            />
          </>
        )}
        <TextField
          label="Email"
          name="email"
          initialValue=""
          type="email"
          disabled={isLoading}
          errorMessage={signInForm ? signInErrors.email?.errors[0] : signUpErrors.email?.errors[0]}
        />
        <TextField
          label="Password"
          name="password"
          initialValue=""
          type="password"
          disabled={isLoading}
          errorMessage={signInForm ? signInErrors.password?.errors[0] : signUpErrors.password?.errors[0]}
        />
        {signUpForm && (
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            initialValue=""
            type="password"
            disabled={isLoading}
            errorMessage={signUpErrors.confirmPassword?.errors[0]}
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
