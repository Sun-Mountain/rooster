import { db } from "@db/index";
import { User, Prisma } from "@prisma/client";
import { getAddressesByUserId } from "./address";
import { getEmergencyContactsByUserId } from "./emergencyContact";
import { getPhoneNumbersByUserId } from "./phoneNumber";

export const getUserById = async (id: string) => {
  const user = await db.user.findUnique({
    where: { id },
  });

  if (user) {
    const addresses = await getAddressesByUserId(user.id);
    const emergencyContacts = await getEmergencyContactsByUserId(user.id);
    const phoneNumber = await getPhoneNumbersByUserId(user.id);
    console.log("Fetched addresses for user:", addresses);
    console.log("Fetched phone number for user:", phoneNumber);
    console.log("Fetched emergency contacts for user:", emergencyContacts);
    (user as User & { addresses: typeof addresses }).addresses = addresses;
    (user as User & { phoneNumber: typeof phoneNumber }).phoneNumber = phoneNumber;
    (user as User & { emergencyContacts: typeof emergencyContacts }).emergencyContacts = emergencyContacts;
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