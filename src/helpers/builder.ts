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
  console.log('Building emergency contact with data:', emergencyContactData);

  const { firstName, lastName, relationship, phoneNumber } = emergencyContactData;

  console.log(phoneNumber)

  const phoneNum = phoneNumber ? phoneNumberBuilder(phoneNumber.areaCode, phoneNumber.prefix, phoneNumber.lineNum) : undefined;

  console.log('Built phone number:', phoneNum);

  return {
    firstName,
    lastName,
    relationship,
    phoneNum: phoneNum,
  };
};