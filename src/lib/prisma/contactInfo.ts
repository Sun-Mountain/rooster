import db from "@/lib/prisma";
import { ContactAddress, Prisma } from "@client";

export const getContactInfoByUserId = async (userId: string): Promise<ContactAddress | null> => {
  let info;
  info = await db.contactAddress.findUnique({
    where: {
      userId: userId,
    },
  });

  if (!info) {
    info = await createContactInfo(
      { user: { connect: { id: userId } } },
    );
  }

  return info;
};

export const createContactInfo = async (data: Prisma.ContactAddressCreateInput): Promise<ContactAddress> => {
  return await db.contactAddress.create({
    data,
  });
};

export const updateContactInfo = async (userId: string, data: Prisma.ContactAddressUpdateInput): Promise<ContactAddress> => {
  return await db.contactAddress.update({
    where: {
      userId: userId,
    },
    data,
  });
};