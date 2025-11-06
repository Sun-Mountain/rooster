import { SelectField } from "@/components/UI/SelectField";
import { StartTimeEndTimeFields } from "@/components/Forms/Fields/StartTimeEndTime";
import { WeekDayNames } from "@/lib/datesTimes";
import { Weekday } from "@prisma/client";

interface DayTimesFieldsProps {
  index: number;
}

export const DayTimesFields = ({ index }: DayTimesFieldsProps) => {
  return (
    <>
      <SelectField
        label="Weekday"
        name={`weekday-${index}`}
        options={WeekDayNames.map((day, idx) => ({
          value: Object.values(Weekday)[idx],
          label: day
        }))}
      />
      <StartTimeEndTimeFields index={index} />
    </>
  );
}