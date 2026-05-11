import db from "@/lib/prisma";
import { ClassTermDetails, Prisma } from "../../../generated/prisma/client";

// POST

// DELETE

// GET

export const getClassTermDetailsBySession = async (termId: string): Promise<ClassTermDetails[]> => {
  return await db.classTermDetails.findMany({
    where: {
      termId
    },
    orderBy: {
      createdAt: "desc"
    }
  });
}

// UPDATE