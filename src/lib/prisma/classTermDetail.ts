import db from "@/lib/prisma";
import { ClassTermDetails, Prisma } from "../../../generated/prisma/client";

export type ClassTermRosterCreateInput = Omit<
  Prisma.ClassTermRosterCreateInput,
  "classTermDetailsId" | "classTermDetails"
>
export type ClassTermDetailWithRelations = ClassTermDetails & {
  classId: string;
  termId: string;
  dayOfTheWeek: string;
  startTime: string;
  endTime: string;
  classTermRoster?: ClassTermRosterCreateInput[]; // Optional, can be used for creating related roster entries
  className?: string; // Optional, can be used for display purposes
};

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

  try {
    const createClassTermRoster = (
      classTermRosterData: ClassTermRosterCreateInput[]
    ) => {
      const classTermRosterCreate = { create: classTermRosterData.map(roster => ({
        dayOfTheWeek: roster.dayOfTheWeek,
        startTime: roster.startTime,
        endTime: roster.endTime,
      }))};
      return classTermRosterCreate;
    }

    const newClassTermDetail = await db.classTermDetails.create({
      data: {
        price,
        capacity,
        termSpecificDescription,
        classTermRoster: createClassTermRoster([{
          dayOfTheWeek,
          startTime,
          endTime
        }]),
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
      include: {
        classTermRoster: true,
      },
    });

    console.log("Created ClassTermDetail: ", newClassTermDetail);

    return newClassTermDetail;
  } catch (error) {
    console.error("Error creating ClassTermDetail: ", error);
    throw new Error(error instanceof Error ? error.message : "Failed to create class term detail");
  }
};

// DELETE

export const deleteClassTermDetail = async (id: string): Promise<ClassTermDetails> => {
  return await db.classTermDetails.delete({
    where: {
      id
    }
  });
}

// UPDATE

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
      },
    }
  });
}

export const getClassTermDetailById = async (id: string): Promise<ClassTermDetails | null> => {
  return await db.classTermDetails.findUnique({
    where: {
      id
    },
    include: {
      class: {
        select: {
          name: true,
          description: true,
        }
      },
    }
  });
}

// UPDATE

export const updateClassTermDetail = async (
  id: string,
  data: Partial<ClassTermDetailWithRelations>
): Promise<ClassTermDetails> => {
  try {

  const { price,
          capacity,
          termSpecificDescription,
          classId,
          termId,
          dayOfTheWeek,
          startTime,
          endTime
        } = data;
    const updatedClassTermDetail = await db.classTermDetails.update({
      where: { id },
      data: {
        price,
        capacity,
        termSpecificDescription,
        class: classId ? { connect: { id: classId } } : undefined,
        term: termId ? { connect: { id: termId } } : undefined,
      },
      include: {
        classTermRoster: true,
      },
    });

    return updatedClassTermDetail;
  } catch (error) {
    console.error("Error updating ClassTermDetail: ", error);
    throw new Error(error instanceof Error ? error.message : "Failed to update class term detail");
  }
}