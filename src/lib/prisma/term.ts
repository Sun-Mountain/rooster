import db from "@/lib/prisma";
import { Term, Prisma, TermStatus } from "../../../generated/prisma/client";

type UpdateTermWithoutStatus = Omit<Prisma.TermUpdateInput, "status">;

type TermsWithClassInstances = Prisma.TermGetPayload<{
  select: {
    id: true;
    name: true;
    startDate: true;
    endDate: true;
    status: true;
    weeks: true;
    classes: {
      select: {
        classInstances: true;
      };
    };
  };
}>;

// POST

export const createTerm = async (
  data: Prisma.TermCreateInput,
): Promise<Term> => {
  const { name } = data;
  const linkName = name.replace(/\s+/g, '-').toLowerCase();

  return await db.term.create({
    data: {
      ...data,
      name: linkName,
    },
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

export const getTermByNameAndDate = async (name: string, date: string): Promise<Term | null> => {
  return await db.term.findFirst({
    where: {
      name,
      startDate: date,
    },
  });
};

export const getLiveTerms = async (): Promise<TermsWithClassInstances[]> => {
  return await db.term.findMany({
    where: {
      status: "LIVE",
    },
    select: {
      id: true,
      name: true,
      startDate: true,
      endDate: true,
      status: true,
      weeks: true,
      classes: {
        select: {
          classInstances: true,
        },
      },
    },
    orderBy: [
      { startDate: "asc" }
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
  const findTerm = await getTermById(id);
  if (!findTerm) {
    throw new Error("Term not found");
  }

  const updatedTerm = await db.term.update({
    where: {
      id,
    },
    data: {
      ...data,
    },
  });

  return updatedTerm;
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
