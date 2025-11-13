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
  lineNumber: string;
}

export interface UserAccountProps {
  firstName: string;
  lastName: string;
  email: string;
  address?: AddressProps;
  phoneNumber?: PhoneNumProps;
  emergencyContact?: {
    firstName: string;
    lastName: string;
    phoneNumber: PhoneNumProps;
  };
}