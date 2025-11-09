import { SelectField } from "@/components/UI/SelectField";
import { StartTimeEndTimeFields } from "@/components/Forms/Fields/StartTimeEndTime";
import { WeekDayNames } from "@/lib/datesTimes";
import { Weekday } from "@prisma/client";

interface DayTimesFieldsProps {
  index: number;
  details?: {
    weekday: string;
    startTime: string;
    endTime: string;
  }
}

export const DayTimesFields = ({ index, details }: DayTimesFieldsProps) => {
  return (
    <>
      <SelectField
        label="Weekday"
        name={`weekday-${index}`}
        initialValue={details?.weekday}
        options={WeekDayNames.map((day, idx) => ({
          value: Object.values(Weekday)[idx],
          label: day
        }))}
      />
      <StartTimeEndTimeFields index={index} initialStartDate={details?.startTime} initialEndDate={details?.endTime} />
    </>
  );
}