export interface AddressProps {
  street1: string;
  street2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface EmergencyContactProps {
  firstName: string;
  lastName: string;
  relationship: string;
  phoneNumber: PhoneNumberProps;
}

export interface PhoneNumberProps {
  areaCode?: string;
  numberGrp1?: string;
  numberGrp2?: string;
  emergencyContact?: boolean;
}

export interface UserProps {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: AddressProps;
  phoneNumber?: PhoneNumberProps;
  emergencyContact?: EmergencyContactProps;
}

export interface UserAccountFormProps {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    areaCode: string;
    numberGrp1: string;
    numberGrp2: string;
    street1: string;
    street2: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    emergencyContactFirstName: string;
    emergencyContactLastName: string;
    emergencyContactRelationship: string;
    emergencyContactAreaCode: string;
    emergencyContactNumberGrp1: string;
    emergencyContactNumberGrp2: string;
}