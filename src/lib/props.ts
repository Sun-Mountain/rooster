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
  weeks: number;
  classDetails: ClassDetailProps[];
}

export interface ClassInstanceProps {
  id: string;
  classTermDetailId: string;
  daysOfTheWeek: string[];
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

export interface UserInfoProps {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  contact: {
    street1?: string;
    street2?: string;
    city?: string;
    state?: string;
    zip?: string;
    phone?: string;
  };
  emergency: {
    name?: string;
    relationship?: string;
    phone?: string;
  }
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