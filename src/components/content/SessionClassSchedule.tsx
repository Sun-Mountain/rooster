"use client";

import { ClassDetailProps } from "@/lib/props";
import { orderClassInstancesByDayAndTime } from "@/helpers/orderClassInstances";

interface SessionClassScheduleViewProps {
  classDetails: ClassDetailProps[];
}

const SessionClassScheduleView = ({
  classDetails
}: SessionClassScheduleViewProps) => {
  const orderedByDayAndTime = orderClassInstancesByDayAndTime(classDetails);

  return (
    <div>
      {Object.entries(orderedByDayAndTime).map(([day, schedules]) => (
        <div key={day} className="schedule-day-group">
          <h3>{day}</h3>
          {schedules.map((schedule, idx) => (
            <div key={idx} className="schedule-item">
              {schedule.startTime} - {schedule.endTime}: <strong>{schedule.className}</strong>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default SessionClassScheduleView;