import { db } from "@db/index";
import { PhoneNumber, Prisma } from "@prisma/client";

export const getPhoneNumbersByUserId = async (userId: string) => {
  return db.phoneNumber.findUnique({
    where: { userId },
  });
};