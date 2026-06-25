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
  return await db.class.findMany({
    orderBy: {
      name: "asc"
    }
  });
}

export const getClassById = async (id: string): Promise<Class | null> => {
  return await db.class.findUnique({
    where: {
      id
    }
  })
}

export const getClassNamesAndIds = async (): Promise<{ id: string; name: string }[]> => {
  const classes = await db.class.findMany({
    select: {
      id: true,
      name: true
    },
    orderBy: {
      name: "asc"
    }
  });
  return classes.map(c => ({ id: c.id, name: c.name }));
}

// PUT

export const updateClass = async (
  id: string,
  data: Prisma.ClassUpdateInput
): Promise<Class> => {
  return await db.class.update({
    where: {
      id
    },
    data
  })
}