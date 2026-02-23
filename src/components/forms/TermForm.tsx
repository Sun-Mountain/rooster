"use client";

import { useEffect, useState  } from "react";
import { TextField } from "@/components/_ui/TextField";
import { Button } from "@/components/_ui/Button";
import { createNewTerm } from "@/lib/api/term";

export const TermForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    createNewTerm(formData, setFormData, setError, setSubmitting)
  }

  return (
    <div className="form-container no-border">
      <div className="form-header">
        <h2>Create New Session</h2>
      </div>
      <form onSubmit={handleSubmit}>
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
            onChange={handleChange}
          />
          <TextField
            label="End Date"
            name="endDate"
            type="date"
            InputLabelProps={{
              shrink: true, // Forces the label to move to the top
            }}
            onChange={handleChange}
          />
        </div>
        <div className="btn-container">
          <Button type="submit" className="btn btn-primary">
            {submitting ? "Creating..." : "Create Session"}
          </Button>
        </div>
      </form>
    </div>
  )
}