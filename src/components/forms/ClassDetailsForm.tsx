"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Error as ErrorIcon, AttachMoney} from '@mui/icons-material';
import { ClassDetailProps } from "@/lib/props";
import { Autocomplete } from "@/components/_ui/Autocomplete";
import { TextField } from "@/components/_ui/TextField";

interface ClassDetailFormProps {
  formData: ClassDetailProps;
  termName: string;
  setInitialFormData: Dispatch<SetStateAction<ClassDetailProps>>;
}

export const ClassDetailsForm = ({
  formData: initialFormData,
  termName,
  setInitialFormData
}: ClassDetailFormProps) => {
  const [classOptions, setClassOptions] = useState<{ id: string; name: string }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<ClassDetailProps>(initialFormData);
  const [submitting, setSubmitting] = useState(false);
  
  useEffect(() => {
    const fetchClassOptions = async () => {
      try {
        const response = await fetch("/api/admin/classNames");
        const data = await response.json();
        setClassOptions(data);
      } catch (error) {
        setError(`Failed to fetch class options: ${error instanceof Error ? error.message : "An unexpected error occurred"}`);
      }
    };

    fetchClassOptions();
  }, []);

  function daysOfTheWeek(): { id: string; name: string }[] {
    return ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => ({ id: day, name: day }));
  }


  const handleChange=(e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => prev ? { ...prev, [name]: value } : prev);
    if (setInitialFormData) {
      setInitialFormData(prev => prev ? { ...prev, [name]: value } : prev);
    }
    if (name === "classId") {
      const selectedClass = classOptions.find(option => option.id === value);
      setFormData(prev => prev ? { ...prev, classId: value, className: selectedClass ? selectedClass.name : "" } : prev);
      if (setInitialFormData) {
        setInitialFormData(prev => prev ? { ...prev, classId: value, className: selectedClass ? selectedClass.name : "" } : prev);
      }
    }
  };

  return (
    <div className="form-container no-border">
      <div className="form-header">
        <h2>Details for {formData?.class?.name || "Class"} in {termName}</h2>
        {error && (
          <div className="form-error">
            <div className="alert-icon">
              <ErrorIcon />
            </div>
            <div className="alert-text">
              {error}
            </div>
          </div>
        )}
      </div>
      <div className="form-container no-border">
        <form>
          <Autocomplete
            options={classOptions}
            label="Select Class"
            name="classId"
            initialValue={formData.class.name}
            disabled={submitting}
            handleChange={handleChange}
          />
          <div className="flex-fields-container">
            <TextField
              label="Price"
              name="price"
              type="number"
              initialValue={formData.price as unknown as number}
              onChange={handleChange}
              disabled={submitting}
              slotAdornment={
                <AttachMoney />
              }
            />
            <TextField
              label="Capacity"
              name="capacity"
              type="number"
              initialValue={formData.capacity}
              onChange={handleChange}
              disabled={submitting}
            />
          </div>
          {formData.classInstances && formData.classInstances.length > 0 && formData.classInstances.map((instance, index) => (
            <div key={index} className="roster-entry">
              <Autocomplete
                options={daysOfTheWeek()}
                label="Day of the Week"
                name="dayOfTheWeek"
                initialValue={instance.dayOfTheWeek}
                disabled={submitting}
                handleChange={handleChange}
              />
              <div className="flex-fields-container">
                <TextField
                  label="Start Time"
                  name="startTime"
                  type="time"
                  InputLabelProps={{
                    shrink: true, // Forces the label to move to the top
                  }}
                  initialValue={instance.startTime}
                  onChange={handleChange}
                  disabled={submitting}
                />
                <TextField
                  label="End Time"
                  name="endTime"
                  type="time"
                  InputLabelProps={{
                    shrink: true, // Forces the label to move to the top
                  }}
                  initialValue={instance.endTime}
                  onChange={handleChange}
                  disabled={submitting}
                />
              </div>
            </div>
          ))}
          <TextField
            label="Additional Notes"
            name="termSpecificDescription"
            type="text"
            multiline
            rows={4}
            onChange={handleChange}
            disabled={submitting}
          />
        </form>
      </div>
    </div>
  )
}