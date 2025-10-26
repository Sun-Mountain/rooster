import { db } from "@db/index";

export const getAddressesByUserId = async (userId: string) => {
  return db.address.findMany({
    where: { userId },
  });
};