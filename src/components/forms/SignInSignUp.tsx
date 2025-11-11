'use client';

import { FormEvent, useState } from "react";
import { TextField } from "@/components/_ui/TextField";
import { Button } from "@/components/_ui/Button";
import * as z from 'zod';

interface SignInSignUpFormProps {
  signUp?: boolean;
}

const SignInSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

const SignUpSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(100),
  lastName: z.string().min(1, "Last name is required").max(100),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters").max(100),
  confirmPassword: z.string().min(1, "Confirm password is required").max(100),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
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

export const SignInSignUpForm = ({ signUp }: SignInSignUpFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [signInErrors, setSignInErrors] = useState<SignInErrorProps>({});
  const [signUpErrors, setSignUpErrors] = useState<SignUpErrorProps>({});

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    if (signUp) {
      const validation = SignUpSchema.safeParse(data);
      if (!validation.success) {
        setSignUpErrors(z.treeifyError(validation.error).properties || {});
        setIsLoading(false);
        return;
      }
    } else {
      const validation = SignInSchema.safeParse(data);
      if (!validation.success) {
        setSignInErrors(z.treeifyError(validation.error).properties || {});
        setIsLoading(false);
        return;
      }
    }

    setIsLoading(false);
  }

  return (
    <div className="form-container">
      <h1>{signUp ? "Sign Up" : "Sign In"}</h1>
      <form onSubmit={onSubmit}>
        {signUp && <TextField
                      label="First Name"
                      name="firstName"
                      type="text"
                      disabled={isLoading}
                      errorMsg={signUpErrors.firstName?.errors[0]}
                    />}
        {signUp && <TextField
                      label="Last Name"
                      name="lastName"
                      type="text"
                      disabled={isLoading}
                      errorMsg={signUpErrors.lastName?.errors[0]}
                    />}
        <TextField
          label="Email"
          name="email"
          type="email"
          disabled={isLoading}
          errorMsg={signUp ? signUpErrors.email?.errors[0] : signInErrors.email?.errors[0]}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          disabled={isLoading}
          errorMsg={signUp ? signUpErrors.password?.errors[0] : signInErrors.password?.errors[0]}
        />
        {signUp && <TextField
                      label="Confirm Password"
                      name="confirmPassword"
                      type="password"
                      disabled={isLoading}
                      errorMsg={signUpErrors.confirmPassword?.errors[0]}
                    />}
        <Button type="submit" disabled={isLoading}>{signUp ? "Sign Up" : "Sign In"}</Button>
      </form>
    </div>
  );
}
