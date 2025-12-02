import { db } from '@db/index';
import { Class, ClassDetails, ClassDayTime, Prisma } from '@prisma/client';
import { getSessionById } from './session';

export type ClassCreateInput = {
  title: string;
  details: Prisma.ClassDetailsCreateInput & {
    daysTimes: Prisma.ClassDayTimeCreateManyInput[];
    Session: string;
  };
}

export type ClassFull = Class & {
  details: ClassDetails & {
    dayTimes: ClassDayTime[];
  };
};

export const createClass = async (data: ClassCreateInput): Promise<ClassFull> => {
  const session = await getSessionById(data.details.Session);
  if (!session) {
    throw new Error(`Session with ID ${data.details.Session} not found`);
  }

  console.log("Creating class with data:", data.details.daysTimes);

  const newClass = await db.class.create({
    data: {
      title: data.title,
      details: {
        create: {
          description: data.details.description,
          workshop: data.details.workshop,
          location: data.details.location,
          Session: {
            connect: {id: session.id}
          },
          dayTimes: {
            createMany: {
              data: data.details.daysTimes,
            },
          },
        },
      },
    },
    include: {
      details: {
        include: {
          dayTimes: true,
        },
      },
    },
  });

  const newClassFull = {
    ...newClass,
    details: newClass.details![0]
  };

  console.log("Created class:", newClassFull);

  return newClassFull as ClassFull;
}

export const getAllClasses = async (): Promise<Class[]> => {
  const classes = await db.class.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });
  return classes;
};

export const getClassById = async (classId: string): Promise<ClassFull | null> => {
  const classData = await db.class.findUnique({
    where: {
      id: classId,
    },
    include: {
      details: {
        include: {
          dayTimes: true,
        },
      },
    },
  });

  if (!classData) {
    return null;
  }

  const classFull = {
    ...classData,
    details: classData.details![0]
  };

  return classFull as ClassFull;
};

export const deleteClass = async (classId: string): Promise<void> => {
  await db.class.delete({
    where: {
      id: classId,
    },
  });
};