import db from "@/lib/prisma";
import { EmergencyContact, Prisma } from "@client";

export const getEmergencyContactByUserId = async (userId: string): Promise<EmergencyContact | null> => {
  return await db.emergencyContact.findUnique({
    where: {
      userId: userId,
    },
  });
};

export const createEmergencyContact = async (data: Prisma.EmergencyContactCreateInput): Promise<EmergencyContact> => {
  return await db.emergencyContact.create({
    data,
  });
};

export const updateEmergencyContact = async (
  userId: string,
  data: Prisma.EmergencyContactUpdateInput
): Promise<EmergencyContact> => {
  return await db.emergencyContact.update({
    where: {
      userId: userId,
    },
    data,
  });
};