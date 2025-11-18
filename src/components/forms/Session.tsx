'use client';

import { Dispatch, SetStateAction, useState } from "react";
import { Add as AddIcon, EditSquare as EditIcon } from "@mui/icons-material";
import { Modal } from "../_ui/Modal";
import { Button } from "../_ui/Button";
import { TextField } from "../_ui/TextField";
import { DatePicker } from "../_ui/DatePicker";

interface SessionFormProps {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  editMode?: boolean;
}

export const SessionForm = ({ setIsLoading, isLoading, editMode }: SessionFormProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const sessionData = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      startDate: formData.get('startDate') as string,
      endDate: formData.get('endDate') as string,
    };

    try {
      const response = await fetch ('/api/admin/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sessionData),
      });

      if (!response.ok) {
        throw new Error('Failed to create session');
      }

      // Optionally, you can handle the response data here
      const result = await response.json();
      console.log('Session created:', result);

    } catch (error) {
      console.error('Error creating session:', error);
    } finally {
      setIsLoading(false);
      handleModalClose();
    }
  };

  return (
    <>
      <Modal
        buttonContent={
          editMode ? (
            <>
              <EditIcon />
            </>
          ) : (
          <>
            <AddIcon /> Session
          </>
        )}
        buttonClassName={editMode ? "icon transparent no-border" : "with-icon"}
        modalOpen={modalOpen}
        onOpen={handleModalOpen}
        onClose={handleModalClose}
      >
        <h2>Add Session</h2>
        <div className="form-container full-page in-modal">
          <form onSubmit={handleSubmit}>
            <TextField label="Session Name" name="title" disabled={isLoading} />
            <TextField label="Description" name="description" multiline rows={2} disabled={isLoading} />
            <div className="flex-fields-container">
              <DatePicker label="Start Date" name="startDate" disabled={isLoading} />
              <DatePicker label="End Date" name="endDate" disabled={isLoading} />
            </div>
            <div className="two-thirds-group reverse">
              <Button ariaLabel="Update Account" type="submit" disabled={isLoading}>Create Session</Button>
              <Button ariaLabel="Cancel Changes" className="text-style-btn danger" type="button" onClick={handleModalClose} disabled={isLoading}>Cancel</Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}