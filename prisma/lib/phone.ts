import { db } from '@db/index';
import { Phone } from '@prisma/client';

export const createPhone = async (userId: string, data: { areaCode: string; prefix: string; lineNum: string }): Promise<Phone> => {
  const phone = await db.phone.create({
    data: {
      userId,
      areaCode: data.areaCode,
      prefix: data.prefix,
      lineNum: data.lineNum,
    },
  });

  return phone;
};

export const getPhone = async (userId: string): Promise<Omit<Phone, 'userId' | 'createdAt' | 'updatedAt'> | null> => {
  const phone = await db.phone.findUnique({
    where: { userId },
  });

  if (!phone) {
    return null;
  }

  const { userId: _, createdAt: __, updatedAt: ___, ...phoneWithoutMeta } = phone;

  return phoneWithoutMeta;
};

export const updatePhone = async (userId: string, data: { areaCode?: string; prefix?: string; lineNum?: string }): Promise<Phone> => {
  const phone = await db.phone.update({
    where: { userId },
    data: {
      areaCode: data.areaCode,
      prefix: data.prefix,
      lineNum: data.lineNum,
    },
  });

  return phone;
};