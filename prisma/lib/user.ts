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

export const updateUser = async (id: string, data: Prisma.UserUpdateInput): Promise<User> => {
  const user = await db.user.update({
    where: { id },
    data: {
      ...data,
      updatedAt: new Date(),
    }
  });
  return user;
};