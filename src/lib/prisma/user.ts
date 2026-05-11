import db from "@/lib/prisma";
import { User } from "@client";

// DELETE

export const deleteUserById = async (id: string): Promise<User> => {
  return await db.user.delete({
    where: { id },
  });
};

// GET

// Get a list of all users
export const getAllUsers = async (): Promise<User[]> => {
  return await db.user.findMany();
};

// Get user by a specified user id
export const getUserById = async (id: string): Promise<User | null> => {
  return await db.user.findUnique({
    where: { id },
  });
};

// Delete a user from the database
export const deleteUserById = async (id: string): Promise<User> => {
  return await db.user.delete({
    where: { id },
  });
};

// Update info for a single user based on a user id. The user id will remain the same but all other fields may be changed
export const updateUserById = async (userId: string, data: Prisma.UserUpdateInput): Promise<User> => {
  return await db.user.update({
    where: {
      id: userId,
    },
    data,
  });
};

// Create a new user in the database
export const createUser = async (data: Prisma.UserCreateInput): Promise<User> => {
  return await db.user.create({
    data,
  });
};