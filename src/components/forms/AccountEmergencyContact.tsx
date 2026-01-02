'use client';

import { useEffect, useState } from "react";
import { Button } from "@/components/_ui/Button";
import { TextField } from "@/components/_ui/TextField";

interface AccountEmergencyContactFormProps {
  userId: string;
}

interface EmergencyContactInfoProps {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export const AccountEmergencyContactForm = ({ userId }: AccountEmergencyContactFormProps) => {
  const [emergencyContactInfo, setEmergencyContactInfo] = useState<EmergencyContactInfoProps | null>(null);

  return (
    <div className="form-container section-container">
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