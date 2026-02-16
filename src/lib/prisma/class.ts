import db from "@/lib/prisma";
import { Class, Prisma } from "../../../generated/prisma/client";

export type DayTimeCreateInput = Prisma.DayTimesCreateInput;

export type ClassCreateInput = Prisma.ClassCreateInput & {
  sessionId: string;
  daysTimes?: DayTimeCreateInput[];
  classDetails?: string;
};

export type ClassProps = Prisma.ClassGetPayload<{
  include: {
    classDetails: true;
  };
}>;

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

export async function getClassGroupByIds(classIds: string[]): Promise<ClassProps[]> {
  return db.class.findMany({
    where: {
      id: {
        in: classIds,
      },
    },
    include: {
      classDetails: true
    }
  });
}