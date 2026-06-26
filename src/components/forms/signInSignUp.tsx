"use client";

import { SubmitEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { signUp as signUpAuth, signIn as signInAuth } from "@/lib/auth-client";
import { Error } from "@mui/icons-material";
import Button from "@/components/.ui/Button";
import TextField from "@/components/.ui/TextField";
import AuthLinks from "@/components/content/AuthLinks";
import * as z from "zod";

interface SignInSignUpFormProps {
  signUp?: boolean;
}

const SignInSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

interface SignInErrorProps {
  email?: {
    errors: string[];
  };
  password?: {
    errors: string[];
  }
}

const SignUpSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.email({ message: "Invalid email address" }),
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

const SignInSignUpForm = ({ signUp = false }: SignInSignUpFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [signInErrors, setSignInErrors] = useState<SignInErrorProps>({});
  const [signUpErrors, setSignUpErrors] = useState<SignUpErrorProps>({});
  const [formError, setFormError] = useState<string | null>(null);

  const onSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (signUp) {
      setSignUpErrors({});
    } else {
      setSignInErrors({});
    }

    setFormError(null);
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    let response, validation;

    if (signUp) {
      validation = SignUpSchema.safeParse(data);
      if (!validation.success) {
        setSignUpErrors(z.treeifyError(validation.error).properties || {});
        setIsLoading(false);
        return;
      }
      response = await signUpAuth.email({
        name: `${formData.get("firstName")} ${formData.get("lastName")}` as string,
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      });

      if (response.error) {
        setFormError(response.error.message || "Something went wrong.");
      } else {
        router.push("/");
      }
    } else {
      validation = SignInSchema.safeParse(data);
      if (!validation.success) {
        setSignInErrors(z.treeifyError(validation.error).properties || {});
        setIsLoading(false);
        return;
      }
      response = await signInAuth.email({
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      });

      if (response.error) {
        setFormError(response.error.message || "Something went wrong.");
      } else {
        router.push("/profile");
      }
    }
    setIsLoading(false);
  }

  return (
    <div className="form-container solo-form">
      <div className="form-header">
        <h1>{signUp ? "Sign Up" : "Welcome back"}</h1>
        <h4>{signUp ? "Create a new account" : "Sign in with your Rooster account"}</h4>
      </div>
      <form onSubmit={onSubmit} className="form">
        {signUp && (
          <>
            <TextField
              label="First Name"
              name="firstName"
              type="text"
              disabled={isLoading}
              errorMsg={signUpErrors.firstName?.errors[0]}
            />
            <TextField
              label="Last Name"
              name="lastName"
              type="text"
              disabled={isLoading}
              errorMsg={signUpErrors.lastName?.errors[0]}
            />
          </>
        )}
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
        <div className="form-btn-container">
          <Button type="submit" disabled={isLoading}>{signUp ? "Sign Up" : "Sign In"}</Button>
        </div>
      </form>
      <AuthLinks />
    </div>
  );
};

export default SignInSignUpForm;