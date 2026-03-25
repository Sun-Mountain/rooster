import { Role } from "@client";

export interface TermProps {
  id: string;
  name: string;
  description: string | null;
  startDate: string;
  endDate: string;
  live: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TermFormProps {
  name: string,
  description: string,
  startDate: string,
  endDate: string
  live: boolean
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