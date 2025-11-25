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

export const classBuilder = (formData: { [key: string]: string }, classNum: number) => {
  console.log(formData);
  const workshop = formData.workshop === 'on' ? true : false;

  let details;

  if (workshop) {
    const startTime = formData[`startTime`] as string;
    const endTime = formData[`endTime`] as string;
    const date = formData[`date`] as string;

    const dayTimes = [{ date, startTime, endTime }];

    details = { workshop: true, dayTimes };
  } else {
    const session = formData[`session`] as string;
    const dayTimes = [];
    
    for (let i = 0; i < classNum; i++) {
      const weekday = formData[`weekday-${i}`] as string;
      const startTime = formData[`startTime-${i}`] as string;
      const endTime = formData[`endTime-${i}`] as string;
      if (weekday && startTime && endTime) {
        dayTimes.push({ weekday, startTime, endTime });
      }
    }

    details = { workshop: false, session, dayTimes };
  }

  return {
    title: formData[`title`] as string,
    description: formData[`description`] as string,
    ...details,
  }
};