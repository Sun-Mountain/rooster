import { db } from '@db/index';
import { EmergencyContact, Phone, Prisma } from '@prisma/client';
import { createPhone, getPhone } from './phone';

export const createEmergencyContact = async (userId: string, data: Prisma.EmergencyContactCreateInput & { phoneNumber?: { areaCode?: string; prefix?: string; lineNum?: string } }): Promise<EmergencyContact> => {
  const contact = await db.emergencyContact.create({
    data: {
      userId,
      firstName: data.firstName,
      lastName: data.lastName,
      relationship: data.relationship,
    },
  });

  await createPhone({userId: undefined, contactId: contact.id, data:{
    areaCode: data.phoneNumber?.areaCode || '',
    prefix: data.phoneNumber?.prefix || '',
    lineNum: data.phoneNumber?.lineNum || '',
  }});

  return contact;
}

export const getEmergencyContact = async (userId: string): Promise<Omit<EmergencyContact & { phoneNumber: Omit<Phone, 'userId' | 'contactId' | 'createdAt' | 'updatedAt'>}, 'userId' | 'createdAt' | 'updatedAt'> | null> => {
  const contact = await db.emergencyContact.findUnique({
    where: { userId },
  });

  if (!contact) {
    return null;
  }

  const phoneNumber = await getPhone(undefined, contact.id);

  const { userId: _, createdAt: __, updatedAt: ___, ...contactWithoutMeta } = contact;

  const result = { 
    ...contactWithoutMeta,
    phoneNumber: {
      id: phoneNumber?.id || '',
      areaCode: phoneNumber?.areaCode || '',
      prefix: phoneNumber?.prefix || '',
      lineNum: phoneNumber?.lineNum || ''
    }
  };

  return result;
};

export const updateEmergencyContact = async (userId: string, data: Prisma.EmergencyContactUpdateInput & { phoneNumber?: { areaCode?: string; prefix?: string; lineNum?: string } }): Promise<EmergencyContact> => {
  const contact = await db.emergencyContact.update({
    where: { userId },
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      relationship: data.relationship,
    },
  });

  if (data.phoneNumber) {
    await createPhone({userId: undefined, contactId: contact.id, data:{
      areaCode: data.phoneNumber.areaCode || '',
      prefix: data.phoneNumber.prefix || '',
      lineNum: data.phoneNumber.lineNum || '',
    }});
  }

  return contact;
};