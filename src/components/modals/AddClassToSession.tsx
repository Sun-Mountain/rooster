"use client";

import { useEffect, useState } from "react";
import { AttachMoney } from "@mui/icons-material";
import { Modal } from "@/components/_ui/Modal";
import { TextField } from "@/components/_ui/TextField";
import { Autocomplete } from "@/components/_ui/Autocomplete";
// import { DayOfTheWeekSelect } from "@/components/fields/dayOfTheWeek";

export const AddClassToSessionModal = () => {
  const [classOptions, setClassOptions] = useState<{ id: string; name: string }[]>([]);
  const [errors, setErrors] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    classId: "",
    className: "",
    price: 0,
    capacity: 0,
    dayOfTheWeek: "",
    termSpecificDescription: "",
    startTime: "",
    endTime: "",
  })

  useEffect(() => {
    const fetchClassOptions = async () => {
      try {
        const response = await fetch("/api/admin/classes");
        const data = await response.json();
        setClassOptions(data);
      } catch (error) {
        setErrors(`Failed to fetch class options: ${error instanceof Error ? error.message : "An unexpected error occurred"}`);
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
    if (name === "classId") {
      const selectedClass = classOptions.find(option => option.id === value);
      setFormData(prev => prev ? { ...prev, classId: value, className: selectedClass ? selectedClass.name : "" } : prev);
    }
  };

  const onSubmit = async () => {
    setSubmitting(true);
    try {
      const response = await fetch("/api/admin/classDetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add class to session");
      }

      // Optionally, you can handle success (e.g., show a success message, refresh data, etc.)
    } catch (err) {
      setErrors(`Failed to add class to session: ${err instanceof Error ? err.message : "An unexpected error occurred"}`);
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
            <Autocomplete
              options={classOptions}
              label="Select Class"
              name="classId"
              initialValue={formData.className}
              disabled={submitting}
              handleChange={handleChange}
            />
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
            <Autocomplete
              options={daysOfTheWeek()}
              label="Day of the Week"
              name="dayOfTheWeek"
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