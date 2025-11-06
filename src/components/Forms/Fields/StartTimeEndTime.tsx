import { TimePicker } from "@/components/UI/TimePicker";

interface StartDateEndDateProps {
  index: number;
  initialStartDate?: Date;
  initialEndDate?: Date;
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
          <TimePicker name={`startTime-${index}`} />
        </div>
        <div className="field-label flex-column">
          <TimePicker name={`endTime-${index}`} />
        </div>
      </div>
    </div>
  )
}