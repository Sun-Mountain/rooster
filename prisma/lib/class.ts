import { db } from '@db/index';
import { Class, Prisma } from '@prisma/client';

export const getAllClasses = async (): Promise<Class[]> => {
  const classes = await db.class.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });
  return classes;
};