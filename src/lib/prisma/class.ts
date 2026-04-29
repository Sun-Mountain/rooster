import db from "@/lib/prisma";
import { Class, Prisma } from "../../../generated/prisma/client";

// POST
export const createClass = async (
  data: Prisma.ClassCreateInput,
): Promise<Class> => {
  return await db.class.create({
    data
  });
};

// DELETE

export const deleteClass = async (id: string): Promise<Class> => {
  return await db.class.delete({
    where: {
      id
    }
  })
};

// GET

export const getAllClasses = async (): Promise<Class[]> => {
  return await db.class.findMany();
}

export const getClassById = async (id: string): Promise<Class | null> => {
  return await db.class.findUnique({
    where: {
      id
    }
  })
}

// PUT

export const updateClass = async (
  id: string,
  data: Class
): Promise<Class> => {
  return await db.class.update({
    where: {
      id
    },
    data
  })
}