import db from "@/lib/prisma";
import { User } from "@client";

// DELETE

export const deleteUserById = async (id: string): Promise<User> => {
  return await db.user.delete({
    where: { id },
  });
};

// GET

export const getAllUsers = async (): Promise<User[]> => {
  return await db.user.findMany();
};

export const getUserById = async (id: string): Promise<User | null> => {
  return await db.user.findUnique({
    where: { id },
  });
};