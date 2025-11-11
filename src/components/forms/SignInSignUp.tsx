'use client';

import { TextField } from "@/components/_ui/TextField";

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
        <button type="submit">{signUp ? "Sign Up" : "Sign In"}</button>
      </form>
    </div>
  );
}
