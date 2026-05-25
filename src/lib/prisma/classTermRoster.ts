import db from "@/lib/prisma";
import { ClassTermRoster, Prisma } from "../../../generated/prisma/client";

export type ClassTermRosterCreateInput = Omit<
  Prisma.ClassTermRosterCreateInput,
  "classTermDetailsId" | "classTermDetails"
>

// POST

export const createClassTermRoster = async (
  data: ClassTermRosterCreateInput
): Promise<ClassTermRoster> => {
  console.log("Creating ClassTermRoster with data: ", data);
  const newClassTermRoster = await db.classTermRoster.create({
    data,
  });

  return newClassTermRoster;
};