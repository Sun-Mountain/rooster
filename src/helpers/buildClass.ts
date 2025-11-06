
export const buildClassData = (values: Record<string, FormDataEntryValue>, classNumber: number) => {
  const classDayTimes = [...Array(classNumber)].map((_, index) => ({
      weekday: values[`weekday-${index}`],
      startTime: values[`startTime-${index}`],
      endTime: values[`endTime-${index}`]
  }));
  
  return {
    title: values.title,
    description: values.description,
    capacity: Number(values.capacity),
    price: Number(values.price),
    sessionId: values.session,
    dayTimes: classDayTimes
  };
};