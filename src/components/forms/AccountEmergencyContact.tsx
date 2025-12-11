'use client';

import { Button } from "@/components/_ui/Button";
import { TextField } from "@/components/_ui/TextField";

export const AccountEmergencyContactForm = () => {
  return (
    <div className="form-container editor">
      <h3>Emergency Contact</h3>
      <form>
        <div className="flex-fields-container">
          <TextField label="First Name" name="firstName" />
          <TextField label="Last Name" name="lastName" />
        </div>
        <div className="flex-fields-container">
          <TextField label="Phone Number" name="phoneNumber" />
        </div>
        <div className="btn-container">
          <Button type="submit" className="btn btn-primary">Update</Button>
        </div>
      </form>
    </div>
  )
};