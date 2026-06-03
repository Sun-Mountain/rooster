import db from "@/lib/prisma";
import { TermSignUp, Prisma } from "../../../generated/prisma/client";

// POST

// DELETE

// GET

export const getTermSignUpDetailsByTermId = async (termid: string): Promise<TermSignUp[]> => {
  return await db.termSignUp.findMany({
    where: {
      termid
    }
  });
}

// UPDATE