import { db } from '@db/index';
import { EmergencyContact, Prisma } from '@prisma/client';

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