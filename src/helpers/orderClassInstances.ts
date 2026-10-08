import { ClassDetailProps } from "@/lib/props";

export const orderClassInstancesByDayAndTime = (classDetails: ClassDetailProps[]) => {
  const consolidatedSchedule = classDetails.flatMap(detail =>
    detail.classInstances.map(instance => ({
      id: detail.id,
      className: detail.class.name,
      daysOfTheWeek: instance.daysOfTheWeek,
      startTime: instance.startTime,
      endTime: instance.endTime,
    }))
  );

  const daysOrder = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const sortedByTime = consolidatedSchedule.reduce((acc, schedule) => {
    schedule.daysOfTheWeek.forEach(day => {
      if (!acc[day]) {
        acc[day] = [];
      }
      acc[day].push(schedule);
    });
    return acc;
  }, {} as Record<string, typeof consolidatedSchedule >);
  
    const groupedAndOrderedByDay = Object.entries(sortedByTime).reduce((acc, [day, schedules]) => {
      acc[day] = schedules;
      return acc;
    }, {} as Record<string, typeof consolidatedSchedule>);

    const orderedByDay = Object.fromEntries(
      daysOrder.filter(day => day in groupedAndOrderedByDay).map(day => [day, groupedAndOrderedByDay[day]])
    );

    const orderedByDayAndTime = Object.fromEntries(
      Object.entries(orderedByDay).map(([day, schedules]) => [
        day,
        schedules.sort((a, b) => a.startTime.localeCompare(b.startTime))
      ])
    );

    return orderedByDayAndTime;
}