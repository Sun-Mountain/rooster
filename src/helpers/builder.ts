import { UserAccountProps } from '@/lib/types';

export const addressBuilder = (addressData: UserAccountProps['address']) => {
  if (!addressData) {
    return null;
  }

  const { street, street2, city, state, zipCode, country } = addressData;

  if (street === '' && city === '' && state === '' && zipCode === '') {
    return null;
  }

  return {
    street,
    street2,
    city,
    state,
    zipCode,
    country: country || 'USA',
  };
};

export const emergencyContactBuilder = (emergencyContactData: UserAccountProps['emergencyContact']) => {
  if (!emergencyContactData) {
    return null;
  }

  const { firstName, lastName, relationship, phoneNumber } = emergencyContactData;

  if (firstName === '' && lastName === '' && relationship === '') {
    return null;
  }

  return {
    firstName,
    lastName,
    relationship,
    phoneNumber: phoneNumber ? {
      areaCode: phoneNumber.areaCode,
      prefix: phoneNumber.prefix,
      lineNum: phoneNumber.lineNum,
    } : undefined,
  };
};

export const phoneNumberBuilder = (phoneNumberData: UserAccountProps['phoneNumber']) => {
  if (!phoneNumberData) {
    return null;
  }

  const { areaCode, prefix, lineNum } = phoneNumberData;

  if (areaCode === '' && prefix === '' && lineNum === '') {
    return null;
  }

  return {
    areaCode,
    prefix,
    lineNum,
  };
};

export const userProfileBuilder = (userData: UserAccountProps) => {
  const { firstName, lastName, email, address, phoneNumber, emergencyContact } = userData;

  if (!address && !phoneNumber && !emergencyContact) {
    return {
      firstName,
      lastName,
      email,
    };
  }

  return {
    firstName,
    lastName,
    email,
    address: address ? {
      street: address.street,
      street2: address.street2,
      city: address.city,
      state: address.state,
      country: address.country,
      zipCode: address.zipCode,
    } : undefined,
    phoneNumber: phoneNumber ? {
      areaCode: phoneNumber.areaCode,
      prefix: phoneNumber.prefix,
      lineNum: phoneNumber.lineNum,
    } : undefined,
    emergencyContact: emergencyContact ? {
      firstName: emergencyContact.firstName,
      lastName: emergencyContact.lastName,
      phoneNumber: emergencyContact.phoneNumber ? {
        areaCode: emergencyContact.phoneNumber.areaCode,
        prefix: emergencyContact.phoneNumber.prefix,
        lineNum: emergencyContact.phoneNumber.lineNum,
      } : undefined,
    } : undefined,
  };
}