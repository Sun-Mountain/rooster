"use client";

import { Dispatch, SetStateAction, SubmitEvent, useEffect, useState } from "react";
import { Add, AttachMoney, Clear } from '@mui/icons-material';
import { FormHelperText } from "@mui/material";
import Autocomplete from "@/components/.ui/Autocomplete";
import TextField from "@/components/.ui/TextField";
import Button from "@/components/.ui/Button";

const daysOfTheWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

interface SessionClassProps {
  classId: string;
  className: string;
  price: number;
  capacity: number;
  termSpecificDescription: string;
  classInstances: {
    instanceId: string;
    daysOfTheWeek: string[];
    startTime: string;
    endTime: string;
  }[];
  termId: string;
}

interface AddEditSessionClassModalProps {
  sessionId: string;
  submitting: boolean;
  setFormData: Dispatch<SetStateAction<SessionClassProps>>;
  formData: SessionClassProps;
}

const SessionClassForm = ({
  submitting,
  formData,
  setFormData
}: AddEditSessionClassModalProps) => {
  const [classOptions, setClassOptions] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    const fetchClassOptions = async () => {
      try {
        const response = await fetch("/api/admin/classNames");
        const data = await response.json();
        setClassOptions(data);
      } catch (error) {
        console.error(`Failed to fetch class options: ${error instanceof Error ? error.message : "An unexpected error occurred"}`);
      }
    };

    fetchClassOptions();
  }, []);

  const handleChange=(e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => prev ? { ...prev, [name]: value } : prev);
  };

  const handleClassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const selectedClass = classOptions.find(option => option.id === value);
    setFormData(prev => prev ? { ...prev, [name]: value, className: selectedClass ? selectedClass.name : "" } : prev);
  };

  const handleAddDayTime = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFormData(prev => prev ? {
      ...prev,
      classInstances: [...prev.classInstances, { instanceId: "", daysOfTheWeek: [], startTime: "", endTime: "" }]
    } : prev);
  };

  const handleRemoveDayTime = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
    e.preventDefault();
    const updatedInstances = formData.classInstances.filter((_, i) => i !== index);
    setFormData(prev => prev ? { ...prev, classInstances: updatedInstances } : prev);
  };

  const handleDayToggle = (index: number, dayId: string) => {
    setFormData(prev => {
      if (!prev) return prev;
      const updatedInstances = [...prev.classInstances];
      const currentDays = updatedInstances[index].daysOfTheWeek as string[];
      updatedInstances[index] = {
        ...updatedInstances[index],
        daysOfTheWeek: currentDays.includes(dayId)
          ? currentDays.filter(d => d !== dayId)
          : [...currentDays, dayId]
      };
      return { ...prev, classInstances: updatedInstances };
    });
  };

  const handleInstanceChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      if (!prev) return prev;
      const updatedRoster = [...prev.classInstances];
      updatedRoster[index] = { ...updatedRoster[index], [name]: value };
      return { ...prev, classInstances: updatedRoster };
    });
  };

  return (
    <>
      <div className="form-container">
        <form className="add-session-class-form">
          <Autocomplete
            options={classOptions}
            label="Class"
            name="classId"
            initialValue={formData.className}
            disabled={submitting}
            handleChange={handleClassChange}
          />
          <div className="form-row">
            <TextField
              label="Price"
              name="price"
              type="number"
              initialValue={formData.price}
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
          {formData.classInstances.map((instance, index) => (
            <div key={index} className="roster-entry">
              <div className="instance-fields">
                <div className="class-instance-days-header">
                  <FormHelperText>
                    Days
                  </FormHelperText>

                  {formData.classInstances.length > 1 && (
                    <Button
                      className="icon small transparent no-border"
                      handleClick={(e) => handleRemoveDayTime(e, index)}
                    >
                      <Clear />
                    </Button>
                  )}
                </div>
                <div className="class-instance-days">
                  <div className="form-row">
                    {daysOfTheWeek.map((day, i) => (
                      <div key={i} className="pill-container">
                        <Button
                          className={`pill ${instance.daysOfTheWeek.includes(day) ? "selected" : ""}`}
                          handleClick={() => handleDayToggle(index, day)}
                        >
                          {day.slice(0, 3)}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="form-row">
                  <TextField
                    label="Start Time"
                    name="startTime"
                    type="time"
                    InputLabelProps={{
                      shrink: true, // Forces the label to move to the top
                    }}
                    initialValue={instance.startTime}
                    resetInitialValue={true}
                    onChange={(e) => handleInstanceChange(index, e)}
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
                    resetInitialValue={true}
                    onChange={(e) => handleInstanceChange(index, e)}
                    disabled={submitting}
                  />
                </div>
              </div>
            </div>
          ))}
          <div>
            <Button
              className="primary"
              handleClick={handleAddDayTime}
              disabled={formData.classInstances.length >= 7 || submitting}
            >
              <Add /> &nbsp; {formData.classInstances.length < 7 ? "Add Another Day / Time" : "Max Days Added"}
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}

export default SessionClassForm;