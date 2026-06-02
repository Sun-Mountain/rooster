import db from "@/lib/prisma";
import { TermSignUp, Prisma } from "../../../generated/prisma/client";

// POST

// DELETE

// GET

export const getTermSignUpDetailsByTermId = async (termId: string): Promise<ClassTermDetails[]> => {
  return await db.termSignUp.findMany({
    where: {
      termId
    }
  });
}

// UPDATE