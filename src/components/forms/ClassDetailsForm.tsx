"use client";

import { TextField } from "@/components/_ui/TextField";

interface ClassDetailsFormProps {
  termId: string;
}

export const ClassDetailsForm = ({ termId }: ClassDetailsFormProps) => {
  return (
    <div className="form-container no-border">
      <div className="form-header">
        <h2>Add Class to Session</h2>
      </div>
      <form>
        <div className="flex-fields-container">
          <TextField
            label="Price"
            name="price"
            type="number"
          />
          <TextField
            label="Capacity"
            name="capacity"
            type="number"
          />
        </div>
      </form>
    </div>
  )
}