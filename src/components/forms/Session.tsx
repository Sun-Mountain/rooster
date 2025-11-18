'use client';

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Add as AddIcon, EditSquare as EditIcon } from "@mui/icons-material";
import { Modal } from "../_ui/Modal";
import { Button } from "../_ui/Button";
import { TextField } from "../_ui/TextField";
import { DatePicker } from "../_ui/DatePicker";

interface SessionFormProps {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  editId?: string;
}

export const SessionForm = ({ setIsLoading, isLoading, editId }: SessionFormProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
  });
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  useEffect(() => {
    if (editId) {
      fetch(`/api/admin/session?id=${editId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(response => response.json())
      .then(data => {
        setFormData({
          title: data.session.title,
          description: data.session.description,
          startDate: new Date(data.session.startDate).toISOString().split('T')[0],
          endDate: new Date(data.session.endDate).toISOString().split('T')[0],
        });
      })
      .catch(error => {
        console.error('Error fetching session data:', error);
      });
    }}, [editId]);

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
          !!editId ? (
            <>
              <EditIcon />
            </>
          ) : (
          <>
            <AddIcon /> Session
          </>
        )}
        buttonClassName={!!editId ? "icon transparent no-border" : "with-icon"}
        modalOpen={modalOpen}
        onOpen={handleModalOpen}
        onClose={handleModalClose}
      >
        <h2>{!!editId ? 'Edit' : 'Add'} Session</h2>
        <div className="form-container full-page in-modal">
          <form onSubmit={handleSubmit}>
            <TextField
              label="Session
              Name"
              name="title"
              disabled={isLoading}
              initialValue={!!editId ? formData.title : undefined}
            />
            <TextField
              label="Description"
              name="description"
              multiline
              rows={2}
              disabled={isLoading}
              initialValue={!!editId ? formData.description : undefined}
            />
            <div className="flex-fields-container">
              <DatePicker
                label="Start Date"
                name="startDate"
                disabled={isLoading}
                initialDate={!!editId ? formData.startDate : undefined}
              />
              <DatePicker
                label="End Date"
                name="endDate"
                disabled={isLoading}
                initialDate={!!editId ? formData.endDate : undefined}
              />
            </div>
            <div className="two-thirds-group reverse">
              <Button ariaLabel={!!editId ? "Update Session" : "Create Session"} type="submit" disabled={isLoading}>{!!editId ? 'Update' : 'Create'} Session</Button>
              <Button ariaLabel="Cancel Changes" className="text-style-btn danger" type="button" onClick={handleModalClose} disabled={isLoading}>Cancel</Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}