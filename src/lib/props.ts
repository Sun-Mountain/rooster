import { Role, TermStatus } from "@client";

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

export interface ClassInstanceProps {
  id: string;
  classTermDetailId: string;
  dayOfTheWeek: string;
  startTime: string;
  endTime: string;
}

export interface ClassDetailProps {
  id: string;
  classId: string;
  termId: string;
  termSpecificDescription?: string;
  class: {
    name: string;
  };
  classInstances: ClassInstanceProps[];
  price: number;
  capacity: number;
  dayOfTheWeek: string;
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

export interface ClassDetailScheduleProps {
  classSchedule: {
    id: string;
    className: string;
    dayOfTheWeek: string;
    startTime: string;
    endTime: string;
  }[];
}