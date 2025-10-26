import { db } from "@db/index";
import { EmergencyContact, Prisma } from "@prisma/client";

export const getEmergencyContactsByUserId = async (userId: string) => {
  return db.emergencyContact.findMany({
    where: { userId },
  });
};