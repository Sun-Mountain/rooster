import { db } from "@db/index";

export const getAddressByUserId = async (userId: string) => {
  return db.address.findUnique({
    where: { userId },
  });
};

export const updateAddressByUserId = async (userId: string, data: Partial<{ street1: string; street2: string; city: string; state: string; zip: string; country: string; }>) => {
  return await db.address.update({
    where: { userId },
    data: {
      ...data,
      updatedAt: new Date(),
    },
  });
};