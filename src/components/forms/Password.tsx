"use client";

import { SubmitEvent, useState } from "react";
import TextField from "@/components/.ui/TextField";
import Button from "@/components/.ui/Button";

interface PasswordFormProps {
  recovery?: boolean;
}
const onSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
  event.preventDefault();
};

const PasswordForm = ({ recovery = false }: PasswordFormProps) => {
  return (
    <div className="form-container solo-form">
      <div className="form-header">
        <h1>{recovery ? "Recover" : "Reset"} Password</h1>
      </div>
      <form onSubmit={onSubmit} className="form">
        {!recovery && (
          <TextField
            type="password"
            name="currentPassword"
            label="Current Password"
          />
        )}
        <TextField
          type="password"
          name="password"
          label="New Password"
        />
        <TextField
          type="password"
          name="confirmPassword"
          label="Confirm New Password"
        />
        <div className="form-btn-container">
          <Button type="submit">{recovery ? "Recover" : "Reset"} Password</Button>
        </div>
      </form>
    </div>
  )
}

export default PasswordForm;