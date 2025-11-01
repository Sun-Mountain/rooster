
interface BuildSessionProps {
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
}

export const buildSessionData = (session: BuildSessionProps) => {
  return {
    title: session.title,
    description: session.description,
    startDate: new Date(session.startDate),
    endDate: new Date(session.endDate),
  };
};