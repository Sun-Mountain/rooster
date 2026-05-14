import db from "@/lib/prisma";
import { ClassTermDetails, Prisma } from "../../../generated/prisma/client";

// POST

// DELETE

// GET

export const getClassTermDetailsBySession = async (termId: string): Promise<ClassTermDetails[]> => {
  const termIdExists = await db.term.findUnique({
    where: {
      id: termId
    }
  });

  if (!termIdExists) {
    throw new Error(`Term with id ${termId} does not exist.`);
  }

  const classTermDetails = await db.classTermDetails.findMany({
    where: {
      termId
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  return classTermDetails;
}

// UPDATE