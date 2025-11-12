import { db } from '@db/index';
import { User, Prisma } from '@prisma/client';

export const createUser = async (data: Prisma.UserCreateInput): Promise<User> => {
  const user =await db.user.create({
    data,
  });
  return user;
};

export const getUser = async ({email, id}: {email?: string, id?: string}): Promise<User | null> => {
  const user = await db.user.findFirst({
    where: { OR: [{ email }, { id }] },
  });
  return user;
};