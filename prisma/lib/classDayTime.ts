import { db } from "@db/index";
import { Prisma, ClassDayTime } from "@prisma/client";

export const createClassDayTime = async (data: Prisma.ClassDayTimeCreateInput & { classId: string; sessionId: string }) => {
  const createdClassDayTime = await db.classDayTime.create({
    data: {
      classDetails: { connect: { id: data.classId } },
      session: { connect: { id: data.sessionId } },
      weekday: data.weekday,
      startTime: data.startTime,
      endTime: data.endTime
    }
  });

  return createdClassDayTime;
};