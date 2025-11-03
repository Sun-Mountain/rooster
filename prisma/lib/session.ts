import { Prisma, Session } from "@prisma/client";
import { db } from "@db/index";

export const createSession = async (data: Prisma.SessionCreateInput): Promise<Session> => {
  const session = await db.session.create({
    data,
  });

  return session;
}

export const deleteSession = async (sessionId: string): Promise<void> => {
  await db.session.delete({
    where: {
      id: sessionId,
    },
  });
};

export const getAllSessions = async (): Promise<Session[]> => {
  const sessions = await db.session.findMany({
    orderBy: {
      startDate: "desc",
    },
  });

  return sessions;
}

export const getCurrentSession = async (): Promise<Session | null> => {
  const now = new Date();

  const session = await db.session.findFirst({
    where: {
      startDate: {
        lte: now,
      },
      endDate: {
        gte: now,
      },
    },
    orderBy: {
      startDate: "asc",
    },
  });

  return session;
}

export const getFutureSessions = async (): Promise<Session[]> => {
  const now = new Date();

  const sessions = await db.session.findMany({
    where: {
      startDate: {
        gt: now,
      },
    },
    orderBy: {
      startDate: "asc",
    },
  });

  return sessions;
}

export const updateSession = async (sessionId: string, data: Prisma.SessionUpdateInput): Promise<Session> => {
  const session = await db.session.update({
    where: {
      id: sessionId,
    },
    data: {
      ...data,
      updatedAt: new Date(),
    },
  });

  return session;
}
