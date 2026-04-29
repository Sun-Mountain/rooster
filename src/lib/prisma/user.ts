import db from "@/lib/prisma";
import { User, Prisma, Role } from "@client";

// Get a list of all users
export const getAllUsers = async (): Promise<User[]> => {
  return await db.user.findMany();
};

// Get a list of all active users
export const getAllActiveUsers = async (): Promise<User[]> => {
	return await db.user.findMany({
		where { active: true }
	});
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

// Udate info for a single user based on a user id. The user id will remain the same but all other fields may be changed
export const updateUserInfo = async (userId: string, data: Prisma.UserUpdateInput): Promise<User> => {
  return await db.contactAddress.update({
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