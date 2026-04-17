import db from "@/lib/prisma";
import { User, Prisma, Role } from "@client";

export const getAllUsers = async (): Promise<User[]> => {
  return await db.user.findMany();
};

export const getUserById = async (id: string): Promise<User | null> => {
  return await db.user.findUnique({
    where: { id },
  });
};

export const deleteUserById = async (id: string): Promise<User> => {
  return await db.user.delete({
    where: { id },
  });
};