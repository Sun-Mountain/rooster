import DatePickerProvider from "@/components/Providers/DatePickerProvider";
import { DatePicker as DatePickerUI} from '@mui/x-date-pickers/DatePicker';

export const DatePicker = async () => {
  return (
    <DatePickerProvider>
      <DatePickerUI />
    </DatePickerProvider>
  );
}