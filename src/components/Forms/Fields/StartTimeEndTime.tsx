import { TimePicker } from "@/components/UI/TimePicker";

interface StartDateEndDateProps {
  index: number;
  initialStartDate?: string;
  initialEndDate?: string;
}

export const StartTimeEndTimeFields = ({
  index,
  initialStartDate,
  initialEndDate
}: StartDateEndDateProps) => {
  return (
    <div className="field-group">
      <div className="flex-fields-container">
        <div className="field-label flex-column">
          <TimePicker name={`startTime-${index}`} label="Start Time" initialValue={initialStartDate} />
        </div>
        <div className="field-label flex-column">
          <TimePicker name={`endTime-${index}`} label="End Time" initialValue={initialEndDate} />
        </div>
      </div>
    </div>
  )
}