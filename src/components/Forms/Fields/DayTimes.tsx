import { SelectField } from "@/components/UI/SelectField";
import { StartTimeEndTimeFields } from "@/components/Forms/Fields/StartTimeEndTime";
import { WeekDayNames } from "@/lib/datesTimes";
import { Weekday } from "@prisma/client";

export const DayTimesFields = () => {
  return (
    <>
      <SelectField
        label="Weekday"
        name="weekday"
        options={WeekDayNames.map((day, index) => ({
          value: Object.values(Weekday)[index],
          label: day
        }))}
      />
      <StartTimeEndTimeFields />
    </>
  );
}