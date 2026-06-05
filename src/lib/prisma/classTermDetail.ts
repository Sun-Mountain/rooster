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

export type ClassTermDetailSchedule = {
  id: string;
  class: {
    name: string;
  };
  classInstances: {
    dayOfTheWeek: string;
    startTime: string;
    endTime: string;
  }[];
};

export type ClassTermGetBySession = {
  id: string;
  class: {
    name: string;
  };
  classInstances: {
    dayOfTheWeek: string;
    startTime: string;
    endTime: string;
  }[];
};

const dayOrder: Record<string, number> = {
  "Sunday": 0,
  "Monday": 1,
  "Tuesday": 2,
  "Wednesday": 3,
  "Thursday": 4,
  "Friday": 5,
  "Saturday": 6
};

const sortClassInstances = (instances: ClassInstanceCreateInput[]) => {
  return instances.sort((a, b) => {
    if (dayOrder[a.dayOfTheWeek] !== dayOrder[b.dayOfTheWeek]) {
      return dayOrder[a.dayOfTheWeek] - dayOrder[b.dayOfTheWeek];
    }
    return a.startTime.localeCompare(b.startTime);
  })
};

// POST

export const createClassTermDetail = async (
  data: ClassTermDetailWithRelations,
): Promise<ClassTermDetails> => {
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

export const getClassTermDetailsBySession = async (termId: string): Promise<ClassTermGetBySession[]> => {
  const classDetails = await db.classTermDetails.findMany({
    where: {
      termId
    },
    select: {
      id: true,
      class: {
        select: {
          name: true,
        }
      },
      classInstances: {
        select: {
          dayOfTheWeek: true,
          startTime: true,
          endTime: true,
        }
      }
    },
    orderBy: {
      class: {
        name: "asc",
      }
    }
  });

  const sortedClassDetails = classDetails.map(detail => ({
    ...detail,
    classInstances: sortClassInstances(detail.classInstances)
  }));

  return sortedClassDetails;
}

export const getClassTermDetailById = async (id: string): Promise<ClassTermDetailWithRelations | null> => {
  const classTermDetail = await db.classTermDetails.findUnique({
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

  const sortedClassInstances = classTermDetail?.classInstances ? sortClassInstances(classTermDetail.classInstances) : [];

  return classTermDetail ? { ...classTermDetail, classInstances: sortedClassInstances } : null;
}

export const getClassTermDetailsScheduleBySession = async (termId: string): Promise<ClassTermDetailSchedule[]> => {
  const sortClassesByInstances = (classDetails: ClassTermDetailSchedule[]) => {
    return classDetails.sort((a, b) => {
      const aFirstInstance = a.classInstances ? a.classInstances[0] : null;
      const bFirstInstance = b.classInstances ? b.classInstances[0] : null;

      if (aFirstInstance && bFirstInstance) {
        if (dayOrder[aFirstInstance.dayOfTheWeek] !== dayOrder[bFirstInstance.dayOfTheWeek]) {
          return dayOrder[aFirstInstance.dayOfTheWeek] - dayOrder[bFirstInstance.dayOfTheWeek];
        }
        return aFirstInstance.startTime.localeCompare(bFirstInstance.startTime);
      } else if (aFirstInstance) {
        return -1; // a comes first
      } else if (bFirstInstance) {
        return 1; // b comes first
      } else {
        return 0; // maintain original order if no instances
      }
    });
  }

  const classDetails = await db.classTermDetails.findMany({
    where: {
      termId
    },
    select: {
      id: true,
      class: {
        select: {
          name: true,
        }
      },
      classInstances: {
        select: {
          dayOfTheWeek: true,
          startTime: true,
          endTime: true,
        }
      }
    },
    orderBy: {
      class: {
        name: "asc",
      }
    }
  });

  const sortedClassDetails = sortClassesByInstances(classDetails)

  return sortedClassDetails;
}

// UPDATE

export const updateClassTermDetail = async (
  id: string,
  data: Partial<ClassTermDetailWithRelations>
): Promise<ClassTermDetailWithRelations> => {
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
        classInstances: data.classInstances ? {
          deleteMany: {}, // Delete existing instances
          create: data.classInstances.map(instance => ({
            dayOfTheWeek: instance.dayOfTheWeek,
            startTime: instance.startTime,
            endTime: instance.endTime,
          })) // Create new instances
        } : undefined,
        class: classId ? { connect: { id: classId } } : undefined,
        term: termId ? { connect: { id: termId } } : undefined,
      },
      include: {
        classInstances: true,
      },
    });

    const sortedClassInstances = sortClassInstances(updatedClassTermDetail.classInstances);

    return {
      ...updatedClassTermDetail,
      classInstances: sortedClassInstances,
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Failed to update class term detail");
  }
}