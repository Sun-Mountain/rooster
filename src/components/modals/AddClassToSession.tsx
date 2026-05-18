"use client";

import { useState } from "react";
import { AttachMoney } from "@mui/icons-material";
import { Modal } from "@/components/_ui/Modal";
import { TextField } from "@/components/_ui/TextField";
import { DayOfTheWeekSelect } from "@/components/fields/dayOfTheWeek";

export const AddClassToSessionModal = () => {
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    price: 0,
    capacity: 0,
    dayOfTheWeek: "",
    termSpecificDescription: "",
    startTime: "",
    endTime: "",
  })

  const handleChange=(e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => prev ? { ...prev, [name]: value } : prev);
  };

  const onSubmit = async () => {
    setSubmitting(true);
    try {
      console.log(formData);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Modal
        modalBtnContent="Add Class to Session"
        modalBtnClassName="primary"
        btnAction={<button onClick={onSubmit}>{submitting ? "Adding..." : "Add Class"}</button>}
        includeCancel={true}
      >
        <div className="form-container no-border">
          <form>
            <div className="flex-fields-container">
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
            <DayOfTheWeekSelect
              initialValue={formData.dayOfTheWeek}
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
                initialValue={formData.startTime}
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
                initialValue={formData.endTime}
                onChange={handleChange}
                disabled={submitting}
              />
            </div>
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
      </Modal>
    </>
  )
}