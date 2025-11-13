import { db } from '@db/index';
import { Address } from '@prisma/client';

export const getAddress = async (userId: string): Promise<Omit<Address, 'userId' | 'createdAt' | 'updatedAt'> | null> => {
  const address = await db.address.findUnique({
    where: { userId },
  });

  if (!address) {
    return null;
  }

  const { userId: _, createdAt: __, updatedAt: ___, ...addressWithoutMeta } = address;

  return addressWithoutMeta;
};