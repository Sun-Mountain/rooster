import { Role, TermStatus } from "@client";

export enum DayOfTheWeek {
  SUNDAY = "Sunday",
  MONDAY = "Monday",
  TUESDAY = "Tuesday",
  WEDNESDAY = "Wednesday",
  THURSDAY = "Thursday",
  FRIDAY = "Friday",
  SATURDAY = "Saturday"
}

export interface ClassProps {
  id: string;
  name: string;
  description?: string;
}

export interface ClassFormDataProps {
  name: string;
  description?: string;
}

export interface SessionFormDataProps {
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
}

export interface TermProps {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: TermStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ClassDetailFormDataProps {
  classId: string;
  price: number;
  capacity: number;
  dayOfTheWeek: DayOfTheWeek;
  startTime: string;
  endTime: string;
  termSpecificDescription?: string;
}

export interface ClassDetailProps {
  id: string;
  classId: string;
  termId: string;
  price: Float16Array;
  capacity: number;
  dayOfTheWeek: DayOfTheWeek;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserProps {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  firstName: string;
  lastName: string;
  role: Role;
  pronouns?: string;
  otherPronouns?: string;
  image?: string;
}