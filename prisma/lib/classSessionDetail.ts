import { db } from "@db/index";
import { Prisma, Weekday } from "@prisma/client";
import { createClassDayTime } from "./classDayTime";

export const createClassSessionDetails = async (data: Prisma.ClassSessionDetailsCreateInput, dayTimesData: {
  weekday: Weekday;
  startTime: string;
  endTime: string;
  classId: string;
  sessionId: string;
}[]) => {
  const createdClassSessionDetails = await db.classSessionDetails.create({
    data: {
      class: data.class,
      session: data.session,
      description: data.description,
      capacity: data.capacity,
      price: data.price
      }
    });

  const createdDayTimes = await Promise.all(
    dayTimesData.map(dayTime => createClassDayTime({
      classId: createdClassSessionDetails.id,
      sessionId: createdClassSessionDetails.sessionId,
      weekday: dayTime.weekday,
      startTime: dayTime.startTime,
      endTime: dayTime.endTime,
      classDetails: { connect: { id: createdClassSessionDetails.id } },
      session: { connect: { id: createdClassSessionDetails.sessionId } }
    }))
  );

  return {  ...createdClassSessionDetails, dayTimes: createdDayTimes };
}