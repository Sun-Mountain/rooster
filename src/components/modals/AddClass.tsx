'use client';

import { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { Button } from "@/components/_ui/Button";
import { Modal } from "@/components/_ui/Modal";
import { TextField } from "@/components/_ui/TextField";
import { Close } from "@mui/icons-material";

interface dayTimeProps {
  weekDay: string;
  startTime: string;
  endTime: string;
}

interface ClassModalProps {
  sessionId?: string;
}

export const AddClassModal = ({ sessionId }: ClassModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    details: "",
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
    try {
      console.log(formData);
      console.log(dayTime);
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
          />
          <TextField
            label="Description"
            name="description"
            multiline
            rows={3}
            initialValue={formData.description}
            onChange={handleChange}
          />
          <div className="section-header">
            Session Specific Details:
          </div>
          <div className="info-text">
            This is for information that is specific to this class within the session, such as meeting times, location, or instructor details.
          </div>
          <TextField
            label="Session Details"
            name="details"
            multiline
            rows={3}
            initialValue={formData.details}
            onChange={handleChange}
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