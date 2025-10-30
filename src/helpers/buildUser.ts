import { UserAccountFormProps } from '@/lib/interfaces/user';

export const buildUserData = (user: UserAccountFormProps) => {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneNumber: {
      areaCode: user.areaCode,
      numberGrp1: user.numberGrp1,
      numberGrp2: user.numberGrp2,
    },
    address: {
      street1: user.street1,
      street2: user.street2,
      city: user.city,
      state: user.state,
      zip: user.zip,
      country: user.country,
    },
    emergencyContact: {
      firstName: user.emergencyContactFirstName,
      lastName: user.emergencyContactLastName,
      relationship: user.emergencyContactRelationship,
      phoneNumber: {
        areaCode: user.emergencyContactAreaCode,
        numberGrp1: user.emergencyContactNumberGrp1,
        numberGrp2: user.emergencyContactNumberGrp2,
      },
    },
  };
};
