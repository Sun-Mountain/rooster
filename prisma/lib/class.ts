import { Prisma, Class, ClassSessionDetails, ClassDayTime } from "@prisma/client";
import { createClassSessionDetails } from "./classSessionDetail";
import { db } from "@db/index";

export const createClass = async (data: Prisma.ClassCreateInput & { sessionDetails: ClassSessionDetails & { classDayTimes: ClassDayTime[] } }) => {
  console.log(data)

  const createdClass = await db.class.create({
    data: {
      title: data.title
    },
  });

  const sessionDetailsData: Prisma.ClassSessionDetailsCreateInput = {
    class: { connect: { id: createdClass.id } },
    session: { connect: { id: data.sessionDetails.sessionId } },
    description: data.sessionDetails.description || "",
    capacity: data.sessionDetails.capacity,
    price: data.sessionDetails.price
  };

  const dayTimesData = data.sessionDetails.classDayTimes.map(dayTime => ({
    classId: createdClass.id,
    sessionId: data.sessionDetails.sessionId,
    weekday: dayTime.weekday,
    startTime: dayTime.startTime,
    endTime: dayTime.endTime
  }));

  const createdSessionDetails = await createClassSessionDetails(sessionDetailsData, dayTimesData);

  return { ...createdClass, sessionDetails: createdSessionDetails };
}

export const getAllClasses = async (): Promise<Class[]> => {
  const classes = await db.class.findMany();

  const classesWithDetails = await Promise.all(
    classes.map(async (cls) => {
      const sessionDetails = await db.classSessionDetails.findFirst({
        where: { class: { id: cls.id } },
        include: { classDayTimes: true }
      });

      return {
        ...cls,
        sessionDetails
      };
    })
  );

  return classesWithDetails;
};

export const getClassCount = async (data: { where?: Prisma.ClassWhereInput }) => {
  const count = await db.class.count({
    where: data?.where || {},
  });

  return count;
};

export const deleteClass = async (id: string) => {
  await db.class.delete({
    where: { id },
  });
};