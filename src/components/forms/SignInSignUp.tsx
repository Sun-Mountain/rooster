'use client';

import { TextField } from "@/components/_ui/TextField";
import { Button } from "@/components/_ui/Button";

interface SignInSignUpFormProps {
  signUp?: boolean;
}

export const SignInSignUpForm = ({ signUp }: SignInSignUpFormProps) => {
  return (
    <div className="form-container">
      <h1>{signUp ? "Sign Up" : "Sign In"}</h1>
      <form>
        <TextField label="Email" name="email" type="email" />
        <TextField label="Password" name="password" type="password" />
        <Button type="submit">{signUp ? "Sign Up" : "Sign In"}</Button>
      </form>
    </div>
  );
}
