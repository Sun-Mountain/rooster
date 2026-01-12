'use client';

import { useEffect, useState } from "react";
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
  return (
    <div className="form-container no-border">
      <div className="form-header">
        <h2>New Session</h2>
        {/* {alertMsg && <Alert type={alertMsg.type} className="transparent no-margin no-padding">{alertMsg.message}</Alert>} */}
      </div>
      <form>
        <TextField
          label="Name"
          name="name"
        />
        <TextField
          label="Description"
          name="description"
          multiline
          rows={4}
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
        <Checkbox label="Live (Active Session)" />
        <div className="btn-container">
          <Button type="submit" className="btn btn-primary">Submit</Button>
        </div>
      </form>
    </div>
  )
}