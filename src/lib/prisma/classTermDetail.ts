import db from "@/lib/prisma";
import { ClassTermDetails, Prisma } from "../../../generated/prisma/client";

export type ClassInstanceCreateInput = Omit<
  Prisma.ClassInstanceCreateInput,
  "classTermDetailsId" | "classTermDetails"
>
export type ClassTermDetailWithRelations = ClassTermDetails & {
  classId: string;
  termId: string;
  classInstances?: ClassInstanceCreateInput[]; // Optional, can be used for creating related roster entries
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
          classInstances
        } = data;

  try {
    const createClassInstances = (
      classInstancesData: ClassInstanceCreateInput[]
    ) => {
      const classInstancesCreate = { create: classInstancesData.map(instance => ({
        dayOfTheWeek: instance.dayOfTheWeek,
        startTime: instance.startTime,
        endTime: instance.endTime,
      }))};
      return classInstancesCreate;
    }

    const newClassTermDetail = await db.classTermDetails.create({
      data: {
        price,
        capacity,
        termSpecificDescription,
        classInstances: createClassInstances(classInstances || []),
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
        classInstances: true,
      },
    });
    return newClassTermDetail;
  } catch (error) {
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
      }
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
      classInstances: true,
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
        classInstances: true,
      },
    });

    return updatedClassTermDetail;
  } catch (error) {
    console.error("Error updating ClassTermDetail: ", error);
    throw new Error(error instanceof Error ? error.message : "Failed to update class term detail");
  }
}