import { Role, TermStatus } from "@client";

export interface TermProps {
  id: string;
  name: string;
  description: string | null;
  startDate: string;
  endDate: string;
  status: TermStatus;
  createdAt: string;
  updatedAt: string;
}

export interface TermFormProps {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
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