import db from "@/lib/prisma";
import { Class, Prisma } from "../../../generated/prisma/client";

export type DayTimeCreateInput = Prisma.DayTimesCreateInput;

export type ClassTermDetailsCreateInput = Prisma.ClassTermDetailsCreateInput;

export type ClassCreateInput = Prisma.ClassCreateInput & {
  dayTimes?: DayTimeCreateInput[];
  classTermDetails?: ClassTermDetailsCreateInput[];
};