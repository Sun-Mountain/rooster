export interface AddressProps {
  street1: string;
  street2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface PhoneNumberProps {
  areaCode?: string;
  numberGrp1?: string;
  numberGrp2?: string;
}

export interface UserProps {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: AddressProps;
  phoneNumber?: PhoneNumberProps;
}