"use client";

import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import TextField from "@/components/.ui/TextField";
import { UserInfoProps } from "@/lib/props";

interface EmergencyContactFormProps {
  setUserInfo: Dispatch<SetStateAction<UserInfoProps | undefined>>;
  emergencyContact?: UserInfoProps["emergency"];
}

const EmergencyContactForm = ({ emergencyContact, setUserInfo }: EmergencyContactFormProps) => {
  const [formData, setFormData] = useState({
    name: emergencyContact?.name || "",
    relationship: emergencyContact?.relationship || "",
    phone: emergencyContact?.phone || ""
  });

  useEffect(() => {
    const fillForm = () => {
      setFormData({
        name: emergencyContact?.name || "",
        relationship: emergencyContact?.relationship || "",
        phone: emergencyContact?.phone || ""
      });
    }
    fillForm();
  }, [emergencyContact]);

  const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));

    setUserInfo(prevInfo => {
      if (!prevInfo) return prevInfo;
      return {
        ...prevInfo,
        emergency: {
          ...prevInfo.emergency,
          [name]: value
        }
      };
    });
  };

  return (
    <div className="content-section">
      <div className="section-header with-cav">
        <div>
          <LocalPhoneOutlinedIcon />
          <h3>Emergency Contact</h3>
        </div>
        <div className="caveat">
          Required for in-person classes
        </div>
      </div>
      <div className="section-content">
        <div className="form-container">
          <form>
            <div className="form-row">
              <TextField
                label="Full Name"
                name="name"
                type="text"
                initialValue={formData.name}
                onChange={handleFormChange}
                // disabled={isLoading}
                // errorMsg={signUpErrors.firstName?.errors[0]}
                formHelperText
              />
              <TextField
                label="Relationship (optional)"
                name="relationship"
                type="text"
                initialValue={formData.relationship}
                onChange={handleFormChange}
                // disabled={isLoading}
                // errorMsg={signUpErrors.lastName?.errors[0]}
                formHelperText
              />
            </div>
            <TextField
              label="Phone Number"
              name="phone"
              type="text"
              initialValue={formData.phone}
              onChange={handleFormChange}
              // disabled={isLoading}
              // errorMsg={signUpErrors.firstName?.errors[0]}
              formHelperText
            />
          </form>
        </div>
      </div>
    </div>
  )
}

export default EmergencyContactForm;