import db from "@/lib/prisma";
import { User, Prisma } from "@client";

export const getAllUsers = async (): Promise<User[]> => {
  return await db.user.findMany();
};