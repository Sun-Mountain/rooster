import { AutoComplete } from "@/components/_ui/AutoComplete";
import { DayOfTheWeek } from "@/lib/props";

interface DayOfTheWeekSelectProps {
  initialValue?: DayOfTheWeek;
  disabled?: boolean;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const DayOfTheWeekSelect = ({
  initialValue,
  disabled = false,
  handleChange
}: DayOfTheWeekSelectProps) => {
  const daysOfTheWeek = Object.values(DayOfTheWeek);

  return (
    <>
      <AutoComplete
        options={daysOfTheWeek.map(day => ({ id: day, name: day }))}
        label="Day of the Week"
        name="dayOfTheWeek"
        initialValue={initialValue}
        disabled={disabled}
        handleChange={handleChange}
      />
    </>
  )
}