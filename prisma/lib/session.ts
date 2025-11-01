import { Prisma, Session } from "@prisma/client";
import { db } from "@db/index";

export const createSession = async (data: Prisma.SessionCreateInput): Promise<Session> => {
  const session = await db.session.create({
    data,
  });

  return session;
}