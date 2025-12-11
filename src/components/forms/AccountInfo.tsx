'use client';

import { useState } from "react";
import { Button } from "@/components/_ui/Button";
import { TextField } from "@/components/_ui/TextField";
import { User } from "@/lib/auth";
import { z } from "zod";

interface AccountInfoFormProps {
  user: User;
}

export const AccountInfoForm = ({ user }: AccountInfoFormProps) => {
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
  });

  return (
    <div className="form-container editor">
      <h3>Identity</h3>
      <form>
        <div className="flex-fields-container">
          <TextField label="First Name" name="firstName" initialValue={formData.firstName} />
          <TextField label="Last Name" name="lastName" initialValue={formData.lastName} />
        </div>
        <div className="btn-container">
          <Button type="submit" className="btn btn-primary">Update</Button>
        </div>
      </form>
    </div>
  )
};