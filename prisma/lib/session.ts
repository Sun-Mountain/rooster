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

export const deleteSession = async (sessionId: string): Promise<void> => {
  await db.session.delete({
    where: {
      id: sessionId,
    },
  });
};