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

export const phoneNumberBuilder = (
  areaCode: string,
  prefix: string,
  lineNum: string,
) => {
  return `${areaCode}-${prefix}-${lineNum}`;
};

export const emergencyContactBuilder = (emergencyContactData: {
  firstName: string;
  lastName: string;
  relationship: string;
  phoneNumber?: {
    areaCode: string;
    prefix: string;
    lineNum: string;
  };
}): UserAccountProps['emergencyContact'] => {
  const { firstName, lastName, relationship, phoneNumber } = emergencyContactData;

  const phoneNum = phoneNumber ? phoneNumberBuilder(phoneNumber.areaCode, phoneNumber.prefix, phoneNumber.lineNum) : undefined;

  return {
    firstName,
    lastName,
    relationship,
    phoneNum: phoneNum,
  };
};