import db from "@/lib/prisma";
import { Class, Prisma } from "../../../generated/prisma/client";

export type DayTimeCreateInput = Prisma.DayTimesCreateInput;

export type ClassCreateInput = Prisma.ClassCreateInput & {
  sessionId: string;
  daysTimes?: DayTimeCreateInput[];
  classDetails?: string;
};

export async function createClass(data: ClassCreateInput): Promise<Class> {
  const { daysTimes, classDetails, sessionId, ...classData } = data;

  console.log('Creating class with data:', data);

  const createdClass = await db.class.create({
    data: {
      ...classData,
      classDetails: {
        create: [
          { details: classDetails, term: { connect: { id: sessionId } } }
        ]
      }
    }
  });

  console.log('Created class:', createdClass);

  return createdClass;
}