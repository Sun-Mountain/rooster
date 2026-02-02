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

  const createdClass = await db.class.create({
    data: {
      ...classData,
      classDetails: {
        create: [
          { details:
            classDetails,
            daysTimes: {
              create: daysTimes || []
            },
            term: { connect: { id: sessionId } }
          }
        ]
      }
    }
  });

  return createdClass;
}

export async function getAllClasses(): Promise<Class[]> {
  return db.class.findMany({
    include: {
      classDetails: {
        include: {
          daysTimes: true,
          term: true,
        }
      }
    }
  });
}