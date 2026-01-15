'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TextField } from "@/components/_ui/TextField";
import { Button } from "@/components/_ui/Button";
import { Alert } from "@/components/_ui/Alert";
import { Checkbox } from "@/components/_ui/Checkbox";

interface TermProps {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  live: boolean;
  createdAt: string;
  updatedAt: string;
  description?: string;
}

export const SessionForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    live: false,
  });

  const handleChange=(e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => prev ? { ...prev, [name]: value } : prev);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    console.log("Checkbox changed:", name, checked);
    setFormData(prev => prev ? { ...prev, [name]: checked } : prev);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
        throw new Error(errorData.error || "Failed to create term");
      }

      setFormData({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        live: false,
      });
    } catch (err) {
      console.error(err);
    } finally {
      router.refresh();
    }
    
  };

  return (
    <div className="form-container no-border">
      <div className="form-header">
        <h2>New Session</h2>
        {/* {alertMsg && <Alert type={alertMsg.type} className="transparent no-margin no-padding">{alertMsg.message}</Alert>} */}
      </div>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          initialValue={formData.name}
          onChange={handleChange}
        />
        <TextField
          label="Description"
          name="description"
          multiline
          rows={4}
          initialValue={formData.description}
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
        <Checkbox
          label="Live (Active Session)"
          name="live" checked={formData.live} onChange={handleCheckboxChange} />
        <div className="btn-container">
          <Button type="submit" className="btn btn-primary">Submit</Button>
        </div>
      </form>
    </div>
  )
}