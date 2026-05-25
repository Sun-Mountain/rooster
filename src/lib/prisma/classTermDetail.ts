import db from "@/lib/prisma";
import { ClassTermDetails, Prisma } from "../../../generated/prisma/client";

export type ClassTermDetailWithRelations = ClassTermDetails & {
  classId: string;
  termId: string;
  dayOfTheWeek: string;
  startTime: string;
  endTime: string;
  className?: string; // Optional, can be used for display purposes
};

export type ClassTermRosterCreateInput = Omit<
  Prisma.ClassTermRosterCreateInput,
  "classTermDetailsId" | "classTermDetails"
>

// POST

export const createClassTermDetail = async (
  data: ClassTermDetailWithRelations,
): Promise<ClassTermDetails> => {
  console.log("ClassTermDetails: ", data);

  const { price,
          capacity,
          termSpecificDescription,
          classId,
          termId,
          dayOfTheWeek,
          startTime,
          endTime
        } = data;

  // const classTermRoster = [{
  //   dayOfTheWeek: dayOfTheWeek as string,
  //   startTime: startTime as string,
  //   endTime: endTime as string
  // }];

  // const createClassTermRoster = async (
  //   classTermRoster: ClassTermRosterCreateInput[] | undefined
  // ) => {
  //   let rosterDataConnect = undefined;

  //   if (classTermRoster && classTermRoster.length > 0) {
  //     rosterDataConnect = await db.classTermRoster.createMany({
  //       data: classTermRoster.map((roster) => ({
  //         dayOfTheWeek: roster.dayOfTheWeek,
  //         startTime: roster.startTime,
  //         endTime: roster.endTime,
  //       })),
  //     });
  //   }

  //   return rosterDataConnect;
  // }

  const newClassTermDetail = await db.classTermDetails.create({
    data: {
      price,
      capacity,
      termSpecificDescription,
      class: {
        connect: {
          id: classId,
        },
      },
      term: {
        connect: {
          id: termId,
        },
      },
    },
  });

  console.log("Created ClassTermDetail: ", newClassTermDetail);

  return newClassTermDetail;
};

// DELETE

// GET

export const getClassTermDetailsBySession = async (termId: string): Promise<ClassTermDetails[]> => {
  return await db.classTermDetails.findMany({
    where: {
      termId
    },
    orderBy: {
      createdAt: "desc"
    },
    include: {
      class: {
        select: {
          name: true
        }
      }
    }
  });
}

// UPDATE