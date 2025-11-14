import { db } from '@db/index';
import { EmergencyContact, Prisma } from '@prisma/client';

export const createEmergencyContact = async (userId: string, data: Prisma.EmergencyContactCreateInput ): Promise<EmergencyContact> => {
  const contact = await db.emergencyContact.create({
    data: {
      userId,
      firstName: data.firstName,
      lastName: data.lastName,
      relationship: data.relationship || '',
      phoneNum: data.phoneNum || '',
    },
  });

  return contact;
}

export const getEmergencyContact = async (userId: string): Promise<Omit<EmergencyContact, 'userId' | 'createdAt' | 'updatedAt'> | null> => {
  const contact = await db.emergencyContact.findUnique({
    where: { userId },
  });

  if (!contact) {
    return null;
  }

  const { userId: _, createdAt: __, updatedAt: ___, ...contactWithoutMeta } = contact;


  return contactWithoutMeta;
};

export const updateEmergencyContact = async (userId: string, data: Prisma.EmergencyContactUpdateInput): Promise<EmergencyContact> => {
  const contact = await db.emergencyContact.update({
    where: { userId },
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      relationship: data.relationship,
      phoneNum: data.phoneNum,
    },
  });

  return contact;
};