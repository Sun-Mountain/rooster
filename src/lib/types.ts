export interface AddressProps {
  street: string;
  street2?: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export interface PhoneNumProps {
  areaCode: string;
  prefix: string;
  lineNum: string;
}

export interface UserAccountProps {
  firstName: string;
  lastName: string;
  email: string;
  address?: AddressProps;
  phoneNum?: string;
  emergencyContact?: {
    firstName: string;
    lastName: string;
    relationship: string;
    phoneNum?: string;
  };
}