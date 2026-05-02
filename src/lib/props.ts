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