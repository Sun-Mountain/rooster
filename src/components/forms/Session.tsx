'use client';

import { Add as AddIcon } from "@mui/icons-material";
import { Modal } from "../_ui/Modal";
import { Button } from "../_ui/Button";
import { TextField } from "../_ui/TextField";
import { DatePicker } from "../_ui/DatePicker";

export const SessionForm = () => {
  return (
    <>
      <Modal buttonContent={
        <div className="with-icon">
          <AddIcon /> Session
        </div>
      }>
        <h2>Add Session</h2>
        <div className="form-container full-page in-modal">
          <form>
            <TextField label="Session Name" name="title" />
            <TextField label="Description" name="description" multiline rows={2} />
            <div className="flex-fields-container">
              <DatePicker label="Start Date" name="startDate" />
              <DatePicker label="End Date" name="endDate" />
            </div>
            <div className="two-thirds-group reverse">
              <Button ariaLabel="Update Account" type="submit">Create Session</Button>
              <Button ariaLabel="Cancel Changes" className="text-style-btn danger" type="button">Cancel</Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}