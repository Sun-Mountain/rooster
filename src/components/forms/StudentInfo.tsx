"use client";

import { useEffect, useState } from "react";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import TextField from "@/components/.ui/TextField";
import { UserProps } from "@/lib/props";

interface StudentFormProps {
  user?: UserProps;
}


const StudentInfoForm = ({ user }: StudentFormProps) => {
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    // phone: user?.phone || "",
    email: user?.email || "",
  });

  useEffect(() => {
    const fillForm = () => {
      setFormData({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        // phone: user?.phone || "",
        email: user?.email || "",
      });
    }
    fillForm();
  }, [user]);

  return (
    <div className="content-section">
      <div className="section-header">
        <PersonOutlineOutlinedIcon />
        <h3>Personal Information</h3>
      </div>
      <div className="section-content">
        <div className="form-container">
          <form>
            <div className="form-row">
              <TextField
                label="First Name"
                name="firstName"
                type="text"
                initialValue={formData.firstName}
                // disabled={isLoading}
                // errorMsg={signUpErrors.firstName?.errors[0]}
                formHelperText
              />
              <TextField
                label="Last Name"
                name="lastName"
                type="text"
                initialValue={formData.lastName}
                // disabled={isLoading}
                // errorMsg={signUpErrors.lastName?.errors[0]}
                formHelperText
              />
            </div>
            <div className="form-row">
              <TextField
                label="Phone Number"
                name="phone"
                type="text"
                // disabled={isLoading}
                // errorMsg={signUpErrors.firstName?.errors[0]}
                formHelperText
              />
              <TextField
                label="Email Address"
                name="email"
                type="text"
                initialValue={formData.email}
                // disabled={isLoading}
                // errorMsg={signUpErrors.lastName?.errors[0]}
                formHelperText
              />
            </div>
            <TextField
              label="Address Line 1"
              name="street1"
              type="text"
              // disabled={isLoading}
              // errorMsg={signUpErrors.lastName?.errors[0]}
              formHelperText
            />
            <TextField
              label="Address Line 2 (optional)"
              name="street2"
              type="text"
              // disabled={isLoading}
              // errorMsg={signUpErrors.lastName?.errors[0]}
              formHelperText
            />
            <div className="form-row">
              <TextField
                label="City"
                name="city"
                type="text"
                // disabled={isLoading}
                // errorMsg={signUpErrors.lastName?.errors[0]}
                formHelperText
              />
              <TextField
                label="State"
                name="state"
                type="text"
                // disabled={isLoading}
                // errorMsg={signUpErrors.lastName?.errors[0]}
                formHelperText
              />
              <TextField
                label="ZIP Code"
                name="zip"
                type="text"
                // disabled={isLoading}
                // errorMsg={signUpErrors.lastName?.errors[0]}
                formHelperText
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default StudentInfoForm;