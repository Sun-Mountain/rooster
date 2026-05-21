import { Autocomplete } from "@/components/_ui/Autocomplete";

interface DayOfTheWeekSelectProps {
  initialValue?: string;
  disabled?: boolean;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const DayOfTheWeekSelect = ({
  initialValue,
  disabled = false,
  handleChange
}: DayOfTheWeekSelectProps) => {
  const daysOfTheWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    <>
      Hello
    </>
  )
}