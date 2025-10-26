import { db } from "@db/index";
import { Address, Prisma } from "@prisma/client";

export const createOrUpdateAddress = async (data: Prisma.AddressCreateInput): Promise<Address> => {
  const existingAddress = await db.address.findUnique({
    where: { id: data.id },
  });

  if (existingAddress) {
    return db.address.update({
      where: { id: data.id },
      data,
    });
  }

  return db.address.create({
    data,
  });
}