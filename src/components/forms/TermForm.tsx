"use client";

import { useEffect, useState  } from "react";
import { TextField } from "@/components/_ui/TextField";

export const TermForm = () => {
  const [submitting, setSubmitting] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    live: false
  })

  const handleChange=(e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => prev ? { ...prev, [name]: value } : prev);
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Create New Session</h2>
      </div>
      <form>
        <TextField
          label="Name"
          name="name"
          onChange={handleChange}
        />
        <div className="flex-fields-container">
          <TextField
            label="Start Date"
            name="startDate"
            type="date"
            InputLabelProps={{
              shrink: true, // Forces the label to move to the top
            }}
          />
          <TextField
            label="End Date"
            name="endDate"
            type="date"
            InputLabelProps={{
              shrink: true, // Forces the label to move to the top
            }}
          />
        </div>
      </form>
    </div>
  )
}