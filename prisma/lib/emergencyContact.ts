import { db } from "@db/index";
import { EmergencyContact, Prisma } from "@prisma/client";

export const getEmergencyContactByUserId = async (userId: string) => {
  return db.emergencyContact.findUnique({
    where: { userId },
  });
};