import { db } from "@db/index";
import { User, Prisma } from "@prisma/client";

export const getUserById = async (id: string) => {
  return db.user.findUnique({
    where: { id },
  });
};

export const getUserByEmail = async (email: string) => {
  return db.user.findUnique({
    where: { email },
  });
};

export const createUser = async (data: Prisma.UserCreateInput): Promise<User> => {
  return db.user.create({
    data,
  });
};

export const updateUser = async (data: Prisma.UserUpdateInput) => {
  console.log("Update user data:", data);
};