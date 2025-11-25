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
  // const createData: Prisma.ClassDetailsCreateInput = {
  //   description: data.details.description,
  //   workshop: data.details.workshop,
  //   location: data.details.location || '',
  //   class: {
  //     connect: {
  //       id: data.details.class?.connect?.id || '',
  //     },
  //   },
  //   dayTimes: {
  //     createMany: {
  //       data: data.details.dayTimes,
  //     },
  //   },
  // };

  // if (data.details.Session?.connect?.id) {
  //   createData.Session = {
  //     connect: {
  //       id: data.details.Session.connect.id,
  //     },
  //   };
  // }

  // const newClass = await db.class.create({
  //   data: {
  //     title: data.title,
  //     details: {
  //       create: createData,
  //     },
  //   },
  //   include: {
  //     details: {
  //       include: {
  //         dayTimes: true,
  //       },
  //     },
  //   },
  // });

  // return newClass as ClassFull;
}

export const getAllClasses = async (): Promise<Class[]> => {
  const classes = await db.class.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });
  return classes;
};