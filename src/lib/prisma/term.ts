import db from "@/lib/prisma";
import { Term, Prisma, TermStatus } from "../../../generated/prisma/client";

type UpdateTermWithoutStatus = Omit<Prisma.TermUpdateInput, "status">;

// POST

export const createTerm = async (
  data: Prisma.TermCreateInput,
): Promise<Term> => {
  return await db.term.create({
    data,
  });
};

// DELETE

export const deleteTerm = async (id: string): Promise<Term> => {
  return await db.term.delete({
    where: {
      id,
    },
  });
};

// GET

export const getAllTerms = async (): Promise<Term[]> => {
  return await db.term.findMany({
    orderBy: [
      { startDate: "desc" },
      { createdAt: "desc" },
    ],
  });
};

export const getTermById = async (id: string): Promise<Term | null> => {
  return await db.term.findUnique({
    where: {
      id,
    },
  });
};

// PUT

export const updateTermById = async (
  id: string,
  data: UpdateTermWithoutStatus,
): Promise<Term> => {
  return await db.term.update({
    where: {
      id,
    },
    data,
  });
};

export const updateTermStatus = async (
  id: string,
  newStatus: TermStatus
): Promise<Term> => {
  return await db.term.update({
    where: {
      id,
    },
    data: {
      status: newStatus,
    },
  });
};
