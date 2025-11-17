'use client';

import { FC } from "react";
import { TextField } from "../_ui/TextField";
import { Button } from "../_ui/Button";

export const ChangePasswordForm: FC = () => {
  return (
    <div>
      <h2>Change Password</h2>

      <div className="form-container">
        <form>
          <TextField
            type="password"
            label="Current Password"
            name="currentPassword"
          />
          <TextField
            type="password"
            label="New Password"
            name="newPassword"
          />
          <TextField
            type="password"
            label="Confirm New Password"
            name="confirmNewPassword"
          />
          <Button type="submit" className="primary-btn">
            Change Password
          </Button>
        </form>
      </div>
    </div>
  );
}