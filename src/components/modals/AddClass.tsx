'use client';

import { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { Button } from "@/components/_ui/Button";
import { Modal } from "@/components/_ui/Modal";
import { TextField } from "@/components/_ui/TextField";

export const AddClassModal = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    details: "",
    weekDay: "",
    startTime: "",
    endTime: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => prev ? { ...prev, [name]: value } : prev);
  }

  const handleWeekdayChange = (event: SelectChangeEvent) => {
    setFormData(prev => prev ? { ...prev, weekDay: event.target.value as string } : prev);
  }

  const addClass = async () => {
    try {
      console.log(formData);
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
          <div>
            <FormControl fullWidth className="text-field-container">
              <InputLabel id="weekday-label">Week Day</InputLabel>
              <Select
                labelId="weekday-label"
                id="weekday-select"
                label="Week Day"
                value={formData.weekDay}
                onChange={handleWeekdayChange}
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
              initialValue={formData.startTime}
              onChange={handleChange}
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
            />
          </div>
          {/* <div className="modal-actions">
            <Button>
              Add Day/Time
            </Button>
          </div> */}
        </form>
      </div>
    </Modal>
  )
}