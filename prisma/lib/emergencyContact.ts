import { db } from "@db/index";
import { EmergencyContact, Prisma } from "@prisma/client";
import { updatePhoneNumberByContactId } from "./phoneNumber";

export const createEmergencyContactPhoneNumber = async (data: Prisma.PhoneNumberCreateInput) => {
  return db.phoneNumber.create({
    data,
  });
};

export const createEmergencyContact = async (data: Prisma.EmergencyContactCreateInput): Promise<EmergencyContact> => {
  return db.emergencyContact.create({
    data,
  });
}

export const getEmergencyContactByUserId = async (userId: string) => {
  if (!userId) return null;

  const emergencyContact = await db.emergencyContact.findUnique({
    where: { userId },
  });

  if (!emergencyContact) {
    return null;
  }

  const phoneNumber = await db.phoneNumber.findUnique({
    where: { contactId: emergencyContact.id },
  });

  (emergencyContact as EmergencyContact & { phoneNumber: typeof phoneNumber }).phoneNumber = phoneNumber;

  return emergencyContact;
};

export const updateEmergencyContactByUserId = async (userId: string, data: Partial<{ firstName: string; lastName: string; relationship: string; phoneNumber?: Partial<{ areaCode: string; numberGrp1: string; numberGrp2: string; }>; }>) => {
  const contact = await db.emergencyContact.findUnique({
    where: { userId },
  });

  if (!contact) {
    throw new Error(`Emergency contact not found for userId: ${userId}`);
  }

  const contactId = contact.id;

  if (data.phoneNumber) {
    await updatePhoneNumberByContactId(contactId, data.phoneNumber);
  }

  return db.emergencyContact.update({
    where: { id: contactId },
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      relationship: data.relationship,
    },
  });
}