"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { TextField } from "@/components/_ui/TextField";
import { DayOfTheWeekSelect } from "@/components/fields/dayOfTheWeekSelect";
import { ClassSelection } from "@/components/fields/classSelection";
import { ClassDetailFormDataProps, DayOfTheWeek } from "@/lib/props";
interface ClassDetailsFormProps {
  isLoading?: boolean;
  formData?: ClassDetailFormDataProps;
  setInitialFormData?: Dispatch<SetStateAction<ClassDetailFormDataProps | null>>;
}

export const ClassDetailsForm = ({
  isLoading = false,
  formData: initialFormData,
  setInitialFormData
}: ClassDetailsFormProps) => {
  const [formData, setFormData] = useState<ClassDetailFormDataProps>({
    classId: initialFormData?.classId || "",
    price: initialFormData?.price || 0,
    capacity: initialFormData?.capacity || 0,
    dayOfTheWeek: initialFormData?.dayOfTheWeek || "" as DayOfTheWeek,
    startTime: initialFormData?.startTime || "",
    endTime: initialFormData?.endTime || "",
    termSpecificDescription: initialFormData?.termSpecificDescription || "",
  });

  const handleChange=(e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (setInitialFormData) {
      setInitialFormData(formData => ({ ...formData!, [name]: value }));
    }
  };

  return (
    <div className="form-container no-border no-margin">
      <div className="form-header">
        <h2>Add Class to Session</h2>
      </div>
      <form>
        <ClassSelection
          initialClassId={formData.classId}
          disabled={isLoading}
          handleChange={handleChange}
        />
        <div className="flex-fields-container">
          <TextField
            label="Price"
            name="price"
            type="number"
            initialValue={formData.price}
            onChange={handleChange}
            disabled={isLoading}
          />
          <TextField
            label="Capacity"
            name="capacity"
            type="number"
            initialValue={formData.capacity}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>
        <TextField
          label="Session Specific Information"
          name="termSpecificDescription"
          multiline
          rows={4}
          initialValue={formData.termSpecificDescription}
          onChange={handleChange}
          disabled={isLoading}
        />
        <div className="flex-fields-container">
          <DayOfTheWeekSelect
            initialValue={formData.dayOfTheWeek}
            disabled={isLoading}
            handleChange={handleChange}
          />
        </div>
        <div className="flex-fields-container">
          <TextField
            label="Start Time"
            name="startTime"
            type="time"
            InputLabelProps={{
              shrink: true, // Forces the label to move to the top
            }}
            initialValue={formData.startTime}
            onChange={handleChange}
            disabled={isLoading}
          />
          <TextField
            label="End Time"
            name="endTime"
            type="time"
            InputLabelProps={{
              shrink: true, // Forces the label to move to the top
            }}
            initialValue={formData.endTime}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  )
}