import DatePickerProvider from "@/components/Providers/DatePickerProvider";
import { DatePicker as DatePickerUI} from '@mui/x-date-pickers/DatePicker';

interface DatePickerProps {
  label: string;
  name: string;
}

export const DatePicker = ({ label, name }: DatePickerProps) => {
  return (
    <DatePickerProvider>
      <DatePickerUI label={label} name={name} />
    </DatePickerProvider>
  );
}