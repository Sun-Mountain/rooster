import db from "@/lib/prisma";
import { EmergencyContact, Prisma } from "@client";

export const getEmergencyContactByUserId = async (userId: string): Promise<EmergencyContact | null> => {
  let contact;
  contact = await db.emergencyContact.findUnique({
    where: {
      userId: userId,
    },
  });

  if (!contact) {
    contact = await createEmergencyContact(
      { 
        firstName: "",
        lastName: "",
        relationship: "",
        phone: "",
        user: { connect: { id: userId } }
      },
    );
  }

  return contact;
};

export const createEmergencyContact = async (data: Prisma.EmergencyContactCreateInput): Promise<EmergencyContact> => {
  return await db.emergencyContact.create({
    data,
  });
};