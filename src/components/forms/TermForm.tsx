"use client";

import { Dispatch, SetStateAction, useState  } from "react";
import { TextField } from "@/components/_ui/TextField";
import { Button } from "@/components/_ui/Button";
import ErrorIcon from '@mui/icons-material/Error';

export const TermForm = ({
  setIsLoading
}: {
  setIsLoading: Dispatch<SetStateAction<boolean>>
}) => {
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
    setIsLoading(true)
    setError(null);

    try {
      const response = await fetch("/api/admin/term", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "failed to create term");
      }
      setFormData({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        live: false
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create term");
    } finally {
      setSubmitting(false);
      setIsLoading(false)
    }
  }

  return (
    <div className="form-container no-border">
      <div className="form-header">
        <h2>Create New Session</h2>
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
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          initialValue={formData.name}
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
            initialValue={formData.startDate}
            onChange={handleChange}
          />
          <TextField
            label="End Date"
            name="endDate"
            type="date"
            InputLabelProps={{
              shrink: true, // Forces the label to move to the top
            }}
            initialValue={formData.endDate}
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