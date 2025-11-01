import { DatePicker } from "@/components/UI/DatePicker";

// interface StartDateEndDateProps {
// }

export const StartDateEndDateFields = ({
}) => {
  return (
    <div className="field-group">
      <div className="flex-fields-container">
        <div className="field-label flex-column">
          <DatePicker label="Start Date" name="startDate" />
        </div>
        <div className="field-label flex-column">
          <DatePicker label="End Date" name="endDate" />
        </div>
      </div>
    </div>
  )
}