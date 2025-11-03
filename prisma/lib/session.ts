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

  console.log("Fetched sessions:", sessions);

  return sessions;
}
