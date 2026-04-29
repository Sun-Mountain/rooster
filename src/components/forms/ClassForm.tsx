"use client";

import { Dispatch, SetStateAction, useState  } from "react";
import { TextField } from "@/components/_ui/TextField";
import { Button } from "@/components/_ui/Button";
import ErrorIcon from '@mui/icons-material/Error';

interface ClassFormProps {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isEditing?: boolean;
  isModal?: boolean;
}

export const ClassForm = ({
  setIsLoading
}: ClassFormProps) => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  })

  const handleChange=(e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => prev ? { ...prev, [name]: value } : prev);
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/class", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "failed to create class");
      }

      setFormData({
        name: "",
        description: "",
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create class");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="form-container no-border">
      <div className="form-header">
        <h2>Create New Class</h2>
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
          disabled={submitting}
        />
        <TextField
          label="Description"
          name="description"
          multiline
          rows={4}
          onChange={handleChange}
          disabled={submitting}
        />
        <div>
          <Button
            type="submit"
            className="btn btn-primary"
            disabled={submitting}
          >
            {submitting ? "Creating..." : "Create Class"}
          </Button>
        </div>
      </form>
    </div>
  )
}