import { db } from '@db/index';
import { Address } from '@prisma/client';

export const createAddress = async (userId: string, data: { street: string; street2?: string; city: string; state: string; zipCode: string; country: string }): Promise<Address> => {
  const address = await db.address.create({
    data: {
      userId,
      street: data.street,
      street2: data.street2,
      city: data.city,
      state: data.state,
      zipCode: data.zipCode,
      country: data.country,
    },
  });

  return address;
};

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