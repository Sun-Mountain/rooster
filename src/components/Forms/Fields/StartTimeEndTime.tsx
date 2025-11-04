import { TimePicker } from "@/components/UI/TimePicker";

interface StartDateEndDateProps {
  initialStartDate?: Date;
  initialEndDate?: Date;
}

export const StartTimeEndTimeFields = ({
  initialStartDate,
  initialEndDate
}: StartDateEndDateProps) => {
  return (
    <div className="field-group">
      <div className="flex-fields-container">
        <div className="field-label flex-column">
          <TimePicker name="startTime" />
        </div>
        <div className="field-label flex-column">
          <TimePicker name="endTime" />
        </div>
      </div>
    </div>
  )
}