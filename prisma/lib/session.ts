import { db } from '@db/index';
import { Session, Prisma } from '@prisma/client';

export const createSession = async (data: Prisma.SessionCreateInput): Promise<Session> => {
  console.log(data)

  const session = await db.session.create({
    data: {
      title: data.title,
      description: data.description,
      startDate: data.startDate,
      endDate: data.endDate,
    },
  });

  return session;
}

export const getAllSessions = async (): Promise<Session[]> => {
  const sessions = await db.session.findMany({
    orderBy: {
      startDate: 'desc'
    }
  });
  return sessions;
};

export const getSessionById = async (sessionId: string): Promise<Session | null> => {
  const session = await db.session.findUnique({
    where: {
      id: sessionId,
    },
  });
  return session;
};

export const deleteSession = async (sessionId: string): Promise<void> => {
  await db.session.delete({
    where: {
      id: sessionId,
    },
  });
};

export const updateSession = async (sessionId: string, data: Prisma.SessionUpdateInput): Promise<Session> => {
  const updatedSession = await db.session.update({
    where: {
      id: sessionId,
    },
    data: {
      title: data.title,
      description: data.description,
      startDate: data.startDate,
      endDate: data.endDate,
    },
  });
  return updatedSession;
};