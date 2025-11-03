import { Prisma, Class, ClassSessionDetails } from "@prisma/client";
import { db } from "@db/index";

export const getAllClasses = async (): Promise<Class[]> => {
  const classes = await db.class.findMany();

  const classDetails = await Promise.all(
    classes.map(async (classItem) => {
      const sessions = await db.classSessionDetails.findMany({
        where: { classId: classItem.id },
      });
      return { ...classItem, sessions };
    })
  );

  return classDetails;
};

export const getClassCount = async (data: { where?: Prisma.ClassWhereInput }) => {
  const count = await db.class.count({
    where: data?.where || {},
  });

  return count;
};