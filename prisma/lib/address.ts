import { db } from "@db/index";

export const getAddressByUserId = async (userId: string) => {
  return db.address.findUnique({
    where: { userId },
  });
};