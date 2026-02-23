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