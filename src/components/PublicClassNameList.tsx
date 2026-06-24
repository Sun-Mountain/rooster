import { ClassDetailScheduleProps } from "@/lib/props";

interface PublicClassNameListProps {
  classSchedule: ClassDetailScheduleProps["classSchedule"];
  gridView?: boolean;
}

export const PublicClassNameList = ({
  classSchedule,
  gridView = false }: PublicClassNameListProps) => {

  return (
    <div className="class-name-list-container">
      {classSchedule.length === 0 ? (
        <p>No classes scheduled for this term.</p>
      ) : (
        <div className={gridView ? "class-name-grid" : "class-name-list"}>
          {classSchedule.map((schedule, index) => (
            <div key={index} className="class-name-item">
              <strong>{schedule.className}</strong>
              <div>
                {schedule.dayOfTheWeek}: {schedule.startTime} - {schedule.endTime}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};