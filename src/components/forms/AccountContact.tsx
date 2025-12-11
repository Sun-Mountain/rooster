'use client';

import { Button } from "@/components/_ui/Button";
import { TextField } from "@/components/_ui/TextField";

export const AccountContactForm = () => {
  return (
    <div className="form-container editor">
      <h3>Contact</h3>
      <form>
        <div className="flex-fields-container">
          <TextField label="Primary Email" name="primaryEmail" />
          <TextField label="Secondary Email" name="secondaryEmail" />
        </div>
        <div>
          <TextField label="Phone Number" name="phoneNumber" />
        </div>
        <div className="btn-container">
          <Button type="submit" className="btn btn-primary">Update</Button>
        </div>
      </form>
    </div>
  )
};