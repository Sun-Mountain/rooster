import db from "@/lib/prisma";
import { Term, Prisma } from "../../../generated/prisma/client";

export const getAllTerms = async (): Promise<Term[]> => {
  return await db.term.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getTermById = async (id: string): Promise<Term | null> => {
  return await db.term.findUnique({
    where: {
      id,
    },
  });
};

export const createTerm = async (
  data: Prisma.TermCreateInput,
): Promise<Term> => {
  return await db.term.create({
    data,
  });
};

export const updateTerm = async (
  id: string,
  data: Prisma.TermUpdateInput,
): Promise<Term> => {
  console.log(data);
  return await db.term.update({
    where: {
      id,
    },
    data,
  });
};

export const deleteTerm = async (id: string): Promise<Term> => {
  return await db.term.delete({
    where: {
      id,
    },
  });
};
