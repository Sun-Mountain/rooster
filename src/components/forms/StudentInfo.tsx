"use client";

import {
  ChangeEvent,
  useEffect,
  useState,
  SetStateAction,
  Dispatch
} from "react";
import { UserInfoProps } from "@/lib/props";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import TextField from "@/components/.ui/TextField";

interface StudentFormProps {
  setUserInfo: Dispatch<SetStateAction<UserInfoProps | undefined>>;
  userInfo?: UserInfoProps;
}

const StudentInfoForm = ({ userInfo, setUserInfo }: StudentFormProps) => {
  const [formData, setFormData] = useState({
    firstName: userInfo?.firstName || "",
    lastName: userInfo?.lastName || "",
    phone: userInfo?.contact?.phone || "",
    email: userInfo?.email || "",
    street1: userInfo?.contact?.street1 || "",
    street2: userInfo?.contact?.street2 || "",
    city: userInfo?.contact?.city || "",
    state: userInfo?.contact?.state || "",
    zip: userInfo?.contact?.zip || ""
  });

  useEffect(() => {
    const fillForm = () => {
      setFormData({
        firstName: userInfo?.firstName || "",
        lastName: userInfo?.lastName || "",
        phone: userInfo?.contact?.phone || "",
        email: userInfo?.email || "",
        street1: userInfo?.contact?.street1 || "",
        street2: userInfo?.contact?.street2 || "",
        city: userInfo?.contact?.city || "",
        state: userInfo?.contact?.state || "",
        zip: userInfo?.contact?.zip || ""
      });
    }
    fillForm();
  }, [userInfo]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));

    setUserInfo(prevInfo => {
      if (!prevInfo) return prevInfo;
      
      if (name === "phone" || name === "street1" || name === "street2" || name === "city" || name === "state" || name === "zip") {
        return {
          ...prevInfo,
          contact: {
            ...prevInfo.contact,
            [name]: value
          }
        };
      }
      
      return {
        ...prevInfo,
        [name]: value
      };
    });
  };

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
                onChange={handleInputChange}
                // disabled={isLoading}
                // errorMsg={signUpErrors.firstName?.errors[0]}
                formHelperText
              />
              <TextField
                label="Last Name"
                name="lastName"
                type="text"
                initialValue={formData.lastName}
                onChange={handleInputChange}
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
                initialValue={formData.phone}
                onChange={handleInputChange}
                // disabled={isLoading}
                // errorMsg={signUpErrors.firstName?.errors[0]}
                formHelperText
              />
              <TextField
                label="Email Address"
                name="email"
                type="text"
                initialValue={formData.email}
                onChange={handleInputChange}
                // disabled={isLoading}
                // errorMsg={signUpErrors.lastName?.errors[0]}
                formHelperText
              />
            </div>
            <TextField
              label="Address Line 1"
              name="street1"
              type="text"
              initialValue={formData.street1}
              onChange={handleInputChange}
              // disabled={isLoading}
              // errorMsg={signUpErrors.lastName?.errors[0]}
              formHelperText
            />
            <TextField
              label="Address Line 2 (optional)"
              name="street2"
              type="text"
              initialValue={formData.street2}
              onChange={handleInputChange}
              // disabled={isLoading}
              // errorMsg={signUpErrors.lastName?.errors[0]}
              formHelperText
            />
            <div className="form-row">
              <TextField
                label="City"
                name="city"
                type="text"
                initialValue={formData.city}
                onChange={handleInputChange}
                // disabled={isLoading}
                // errorMsg={signUpErrors.lastName?.errors[0]}
                formHelperText
              />
              <TextField
                label="State"
                name="state"
                type="text"
                initialValue={formData.state}
                onChange={handleInputChange}
                // disabled={isLoading}
                // errorMsg={signUpErrors.lastName?.errors[0]}
                formHelperText
              />
              <TextField
                label="ZIP Code"
                name="zip"
                type="text"
                initialValue={formData.zip}
                onChange={handleInputChange}
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