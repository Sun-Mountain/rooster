import { db } from "@db/index";
import { User, Prisma } from "@prisma/client";
import { getAddressByUserId } from "./address";
import { getEmergencyContactByUserId } from "./emergencyContact";
import { getPhoneNumbersByUserId } from "./phoneNumber";

export const getUserById = async (id: string) => {
  const user = await db.user.findUnique({
    where: { id },
  });

  if (user) {
    const address = await getAddressByUserId(user.id);
    const emergencyContact = await getEmergencyContactByUserId(user.id);
    const phoneNumber = await getPhoneNumbersByUserId(user.id);
    (user as User & { address: typeof address }).address = address;
    (user as User & { phoneNumber: typeof phoneNumber }).phoneNumber = phoneNumber;
    (user as User & { emergencyContact: typeof emergencyContact }).emergencyContact = emergencyContact;
  }

  return user;
};

export const getUserByEmail = async (email: string) => {
  return db.user.findUnique({
    where: { email },
  });
};

export const createUser = async (data: Prisma.UserCreateInput): Promise<User> => {
  const user = await db.user.create({
    data: {
      ...data,
      address: { 
        create: { 
          street1: "",
          city: "",
          state: "",
          zip: "",
          country: "" 
        }
      },
      phoneNumber: {
        create: {
          areaCode: "",
          numberGrp1: "",
          numberGrp2: "",
        }
      },
      emergencyContact: {
        create: {
          firstName: "",
          lastName: "",
          relationship: "",
          phoneNumber: {
            create: {
              areaCode: "",
              numberGrp1: "",
              numberGrp2: "",
            }
          }
        }
      },
    },
  });

  return user;
};

export const updateUser = async (data: Prisma.UserUpdateInput) => {
  console.log("Update user data:", data);
};