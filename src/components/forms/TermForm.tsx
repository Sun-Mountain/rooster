"use client";

import { Dispatch, SetStateAction, useState  } from "react";
import { TextField } from "@/components/_ui/TextField";
import { Button } from "@/components/_ui/Button";
import ErrorIcon from '@mui/icons-material/Error';
import { createNewTerm } from "@/lib/api/term";
import { SessionFormDataProps } from "@/lib/props";


interface TermFormProps {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isEditing?: boolean;
  isModal?: boolean;
  formData?: SessionFormDataProps;
  setInitialFormData?: Dispatch<SetStateAction<SessionFormDataProps | null>>;
}

export const TermForm = ({
  setIsLoading,
  isEditing = false,
  isModal = false,
  formData: initialFormData,
  setInitialFormData,
}: TermFormProps) => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<SessionFormDataProps>({
    name: initialFormData?.name || "",
    description: initialFormData?.description || "",
    startDate: initialFormData?.startDate ? new Date(initialFormData.startDate).toISOString().split("T")[0] : "",
    endDate: initialFormData?.endDate ? new Date(initialFormData.endDate).toISOString().split("T")[0] : "",
  })

  const handleChange=(e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => prev ? { ...prev, [name]: value } : prev);
    if (setInitialFormData) {
      setInitialFormData(prev => prev ? { ...prev, [name]: value } : prev);
    }
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    if (isEditing || isModal ) return; // For now, only handle create action. Edit and modal actions will be implemented later.
    e.preventDefault();
    setSubmitting(true);
    setIsLoading(true)
    setError(null);

    if (!isEditing) {
      createNewTerm(formData, setFormData, setError, setSubmitting)
    }
  }

  return (
    <div className="form-container no-border">
      <div className="form-header">
        <h2>{isEditing ? "Edit Session" : "Create New Session"}</h2>
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
        {isEditing && (
          <TextField
            label="Description"
            name="description"
            multiline
            rows={4}
            initialValue={formData.description}
            onChange={handleChange}
          />
        )}
        {!isEditing && !isModal && (
          <div className="btn-container">
            <Button type="submit" className="btn btn-primary">
              {submitting ? "Creating..." : "Create Session"}
            </Button>
          </div>
        )}
      </form>
    </div>
  )
}