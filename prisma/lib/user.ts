import { db } from "@db/index";
import { User, Prisma, Role } from "@prisma/client";
import { getAddressByUserId, updateAddressByUserId } from "./address";
import { getEmergencyContactByUserId, updateEmergencyContactByUserId } from "./emergencyContact";
import { getPhoneNumbersByUserId, updatePhoneNumberByUserId } from "./phoneNumber";

export const getUserCount = async (data: { where?: Prisma.UserWhereInput }) => {
  const count = await db.user.count({
    where: data?.where || {},
  });

  return count;
};

export const getAdminsCount = async () => {
  const count = await db.user.count({
    where: {
      role: Role.ADMIN
    }
  });

  return count;
};

export const getSuperAdminsCount = async () => {
  const count = await db.user.count({
    where: {
      role: Role.SUPER
    }
  });

  return count;
}

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
  const { id, ...updateData } = data as { id: string } & Prisma.UserUpdateInput;

  await updateAddressByUserId(id, updateData.address as Partial<{ street1: string; street2: string; city: string; state: string; zip: string; country: string; }>);

  await updateEmergencyContactByUserId(id, updateData.emergencyContact as Partial<{ firstName: string; lastName: string; relationship: string; phoneNumber?: Partial<{ areaCode: string; numberGrp1: string; numberGrp2: string; }> }>);

  await updatePhoneNumberByUserId(id, updateData.phoneNumber as Partial<{ areaCode: string; numberGrp1: string; numberGrp2: string; }>);

  await updatePhoneNumberByUserId(id, updateData.phoneNumber as Partial<{ areaCode: string; numberGrp1: string; numberGrp2: string; }>);

  const updatedUser = await db.user.update({
    where: { id },
    data: {
      firstName: updateData.firstName,
      lastName: updateData.lastName,
      email: updateData.email,
    },
  });

  return updatedUser;
};