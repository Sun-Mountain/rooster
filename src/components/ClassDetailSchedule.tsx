"use client";

import { ClassDetailScheduleProps } from "@/lib/props";

export const ClassDetailSchedule = ({
  classSchedule
}: ClassDetailScheduleProps) => {

  const sortedByTime = classSchedule.reduce((acc, schedule) => {
    if (!acc[schedule.dayOfTheWeek]) {
      acc[schedule.dayOfTheWeek] = [];
    }
    acc[schedule.dayOfTheWeek].push(schedule);
    return acc;
  }, {} as Record<string, typeof classSchedule >);
  
  const groupedByDay = Object.entries(sortedByTime).reduce((acc, [day, schedules]) => {
    acc[day] = schedules.sort((a, b) => a.startTime.localeCompare(b.startTime));
    return acc;
  }, {} as Record<string, typeof classSchedule>);

  return (
    <div className="class-schedule">
      {Object.entries(groupedByDay).map(([day, schedules]) => (
        <div key={day} className="schedule-day-group">
          <h3>{day}</h3>
          {schedules.map((schedule, idx) => (
            <div key={idx}>
              <strong>{schedule.className}</strong>: {schedule.startTime} - {schedule.endTime}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
