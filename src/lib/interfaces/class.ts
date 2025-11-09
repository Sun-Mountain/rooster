export interface DayTimesProps {
  classId: string;
  id: string;
  sessionId: string;
  weekday: string;
  startTime: string;
  endTime: string;
};

export interface ClassProps {
  id: string;
  title: string;
  sessionDetails: {
    capacity: number;
    price: number;
    description: string;
    sessionId: string;
    classDayTimes: DayTimesProps[];
  };
}