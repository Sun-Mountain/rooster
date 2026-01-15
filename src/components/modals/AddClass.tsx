'use client';

import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { Modal } from "@/components/_ui/Modal";
import { TextField } from "@/components/_ui/TextField";

export const AddClassModal = () => {

  return (
    <Modal
      btnContent="+ Add Class"
      bigModal
      includeCancel
    >
      <div className="modal-form-container">
        <h2>Add Class to Session</h2>
        <form>
          <TextField
            label="Class Name"
            name="name"
          />
          <TextField
            label="Description"
            name="description"
            multiline
            rows={3}
          />
          <div className="section-header">
            Session Specific Details:
          </div>
          <div className="info-text">
            This is for information that is specific to this class within the session, such as meeting times, location, or instructor details.
          </div>
          <TextField
            label="Session Details"
            name="details"
            multiline
            rows={3}
          />
          
        </form>
      </div>
    </Modal>
  )
}