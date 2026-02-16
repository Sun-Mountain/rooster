
export interface TermProps {
  id: string;
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  live: boolean;
  classes: Array<{
    classId: string;
  }>;
}

export interface ClassProps {
  classId: string;
  name: string;
  description?: string;
  classDetails: ClassTermDetails[];
}

export interface ClassTermDetails {
  id: string;
  classId: string;
  termId: string;
  price: number;
  capacity: number;
  details?: string;
  daysTimes: ClassDayTimes[];
}

export interface ClassDayTimes {
  id: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  classDetailId: string;
}