import { UserAccountProps } from '@/lib/types';
import dayjs from 'dayjs';

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

function convertTo24HourFormat(timeString: string): string {
    const [time, period] = timeString.split(' ');
    const [hour, minute] = time.split(':');
    let formattedHour = parseInt(hour);

    if (period === 'PM') {
        formattedHour += 12;
    }

    return `${formattedHour}:${minute}`;
}

export const classBuilder = (formData: { [key: string]: string }, classNum: number) => {
  const workshop = formData.workshop === 'on' ? true : false;

  let details;

  if (workshop) {
    let startTime = formData[`startTime`] as string;
    let endTime = formData[`endTime`] as string;
    const date = formData[`date`] as string;

    startTime = convertTo24HourFormat(startTime)
    endTime = convertTo24HourFormat(endTime)

    console.log("Raw times:", startTime, endTime);
    
    startTime = new Date(`1970-01-01T${startTime}`).toISOString()
    endTime = new Date(`1970-01-01T${endTime}`).toISOString()

    const dayTimes = [{ date, startTime, endTime }];

    details = { workshop, dayTimes };
  } else {
    const session = formData[`session`] as string;
    const daysTimes = [];
    
    for (let i = 0; i < classNum; i++) {
      const weekday = formData[`weekday-${i}`] as string;
      let startTime = formData[`startTime-${i}`] as string;
      let endTime = formData[`endTime-${i}`] as string;

      startTime = convertTo24HourFormat(startTime)
      endTime = convertTo24HourFormat(endTime)

      startTime = new Date(`1970-01-01T${startTime}`).toISOString()
      endTime = new Date(`1970-01-01T${endTime}`).toISOString()

      if (weekday && startTime && endTime) {
        daysTimes.push({ weekday, startTime, endTime });
      }
    }

    details = { workshop: false, session, daysTimes };
  }

  return {
    title: formData[`title`] as string,
    description: formData[`description`] as string,
    ...details,
  }
};