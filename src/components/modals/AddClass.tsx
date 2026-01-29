'use client';

import { useState } from "react";
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { Button } from "@/components/_ui/Button";
import { Modal } from "@/components/_ui/Modal";
import { TextField } from "@/components/_ui/TextField";
import { Close } from "@mui/icons-material";
import * as z from 'zod';

const dayTimeSchema = z.object({
  weekDay: z.string().min(1, "Week day is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
}).refine((data) => {
  return data.startTime < data.endTime;
}, {
  message: "End time must be after start time",
  path: ["endTime"],
});

const classFormSchema = z.object({
  name: z.string().min(1, "Class name is required").max(200),
  description: z.string().max(1000).optional(),
  classTermDetails: z.string().max(2000).optional(),
  sessionId: z.string().min(1, "Session ID is required"),
  daysTimes: z.array(dayTimeSchema).min(1, "At least one day/time is required"),
});

interface ClassFormErrorProps {
  name?: {
    errors: string[];
  };
  description?: {
    errors: string[];
  };
  classTermDetails?: {
    errors: string[];
  };
  sessionId?: {
    errors: string[];
  };
  daysTimes?: {
    errors?: string[];
    items?: {
      errors?: string[];
      properties?: {
        weekDay?: {
          errors: string[];
        };
        startTime?: {
          errors: string[];
        };
        endTime?: {
          errors: string[];
        };
      };
    }[];
  };
}

interface dayTimeProps {
  weekDay: string;
  startTime: string;
  endTime: string;
}

interface ClassModalProps {
  sessionId?: string;
}

export const AddClassModal = ({ sessionId }: ClassModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ClassFormErrorProps>({});
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    classTermDetails: "",
    sessionId: sessionId || ""
  });
  const [dayTime, setDayTime] = useState<dayTimeProps[]>([
    { weekDay: "", startTime: "", endTime: "" }
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => prev ? { ...prev, [name]: value } : prev);
  }
  
  const handleWeekdayChange = (event: SelectChangeEvent, index: number) => {
    const { name, value } = event.target;
    const updatedDayTime = [...dayTime];
    updatedDayTime[index] = {
      ...updatedDayTime[index],
      [name]: value,
    };
    setDayTime(updatedDayTime);
  }

  const addClass = async () => {
    setErrors({});
    setIsLoading(true);

    const validation = classFormSchema.safeParse({ ...formData, daysTimes: dayTime });
    if (!validation.success) {
      setErrors(z.treeifyError(validation.error).properties || {});
      setIsLoading(false);
      return;
    }
    try {
      const response = await fetch('/api/admin/class', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, daysTimes: dayTime }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create term");
      }
    } catch (error) {
      console.error('Error adding class:', error);
    }
  }

  const addClassBtn = () => {
    return (
      <Button onClick={addClass}>
        Add Class
      </Button>
    )
  }

  const addDayTime = () => {
    setDayTime(prev => ([...prev, { weekDay: "", startTime: "", endTime: "" }]));
  }

  return (
    <Modal
      btnContent="+ Add Class"
      btnAction={addClassBtn()}
      bigModal
      includeCancel
    >
      <div className="modal-form-container form-container no-border">
        <h2>Add Class to Session</h2>
        <form>
          <TextField
            label="Class Name"
            name="name"
            initialValue={formData.name}
            onChange={handleChange}
            disabled={isLoading}
            errorMsg={errors.name?.errors[0]}
          />
          <TextField
            label="Description"
            name="description"
            multiline
            rows={3}
            initialValue={formData.description}
            onChange={handleChange}
            disabled={isLoading}
          />
          <div className="section-header">
            Session Specific Details:
          </div>
          <div className="info-text">
            This is for information that is specific to this class within the session, such as meeting times, location, or instructor details.
          </div>
          <TextField
            label="Session Details"
            name="classTermDetails"
            multiline
            rows={3}
            initialValue={formData.classTermDetails}
            onChange={handleChange}
            disabled={isLoading}
          />
          {dayTime.map((dt, index) => (
            <div key={index} className="repeatable-section">
              <div>
                <div>
                  <FormControl fullWidth className="text-field-container">
                    <InputLabel id={`weekday-label-${index}`}>Week Day</InputLabel>
                    <Select
                      labelId={`weekday-label-${index}`}
                      id={`weekday-select-${index}`}
                      label="Week Day"
                      name="weekDay"
                      value={dt.weekDay}
                      onChange={(event) => handleWeekdayChange(event, index)}
                      disabled={isLoading}
                      error={!!errors.daysTimes && !!errors.daysTimes.items && !!errors.daysTimes.items[index]?.properties?.weekDay?.errors?.length}
                    >
                      <MenuItem value="">-</MenuItem>
                      <MenuItem value="Sunday">Sunday</MenuItem>
                      <MenuItem value="Monday">Monday</MenuItem>
                      <MenuItem value="Tuesday">Tuesday</MenuItem>
                      <MenuItem value="Wednesday">Wednesday</MenuItem>
                      <MenuItem value="Thursday">Thursday</MenuItem>
                      <MenuItem value="Friday">Friday</MenuItem>
                      <MenuItem value="Saturday">Saturday</MenuItem>
                    </Select>
                    {errors.daysTimes && errors.daysTimes.items && errors.daysTimes.items[index]?.properties?.weekDay?.errors?.length && (
                      <FormHelperText error>
                        {errors.daysTimes.items[index].properties?.weekDay?.errors[0]}
                      </FormHelperText>
                    )}
                  </FormControl>
                </div>
                <div className="flex-fields-container">
                  <TextField
                    label="Start Time"
                    name="startTime"
                    type="time"
                    InputLabelProps={{
                      shrink: true, // Forces the label to move to the top
                    }}
                    initialValue={dt.startTime}
                    onChange={(event) => handleWeekdayChange(event, index)}
                    disabled={isLoading}
                    errorMsg={errors.daysTimes && errors.daysTimes.items && errors.daysTimes.items[index]?.properties?.startTime?.errors?.[0]}
                  />
                  <TextField
                    label="End Time"
                    name="endTime"
                    type="time"
                    InputLabelProps={{
                      shrink: true, // Forces the label to move to the top
                    }}
                    initialValue={dt.endTime}
                    onChange={(event) => handleWeekdayChange(event, index)}
                    disabled={isLoading}
                    errorMsg={errors.daysTimes && errors.daysTimes.items && errors.daysTimes.items[index]?.properties?.endTime?.errors?.[0]}
                  />
                </div>
              </div>
              {dayTime.length > 1 && (
                <div className="remove-section-btn-container">
                  <Button
                    className="danger small icon circle"
                    onClick={() => {
                      const updatedDayTime = dayTime.filter((_, i) => i !== index);
                      setDayTime(updatedDayTime);
                    }}
                  >
                    <Close />
                  </Button>
                </div>
              )}
            </div>
          ))}
          <div className="modal-actions">
            <Button onClick={addDayTime}>
              Add Day/Time
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  )
}