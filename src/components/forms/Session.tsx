'use client';

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Add as AddIcon, EditSquare as EditIcon } from "@mui/icons-material";
import { Modal } from "@/components/_ui/Modal";
import { Button } from "@/components/_ui/Button";
import { TextField } from "@/components/_ui/TextField";
import { DatePicker } from "@/components/_ui/DatePicker";
import * as z from 'zod';

interface SessionFormProps {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  editId?: string;
}

const sessionSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
}).refine((data) => {
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);
    return end > start;
  }, "End date must be after start date");

interface FormErrorProps {
  title?: {
    errors: string[];
  };
  startDate?: {
    errors: string[];
  };
  endDate?: {
    errors: string[];
  };
}

export const SessionForm = ({ setIsLoading, isLoading, editId }: SessionFormProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
  });
  const [formErrors, setFormErrors] = useState<FormErrorProps>({});

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
    }}, [editId, isLoading]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const sessionData = {
      title: formData.get('title') as string || '',
      description: formData.get('description') as string,
      startDate: formData.get('startDate') as string,
      endDate: formData.get('endDate') as string,
    };

    try {
      const validationResult = sessionSchema.safeParse(sessionData);
      if (!!editId) {
        if (!validationResult.success) {
          const errorTree = z.treeifyError(validationResult.error);
          setFormErrors(errorTree.properties || {});
          setIsLoading(false);
          return;
        }
        const response = await fetch(`/api/admin/session?id=${editId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sessionData),
        });

        if (!response.ok) {
          throw new Error('Failed to update session');
        }

        const result = await response.json();
        console.log('Session updated:', result);
      } else {
        if (!validationResult.success) {
          const errorTree = z.treeifyError(validationResult.error);
          setFormErrors(errorTree.properties || {});
          setIsLoading(false);
          return;
        }
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

        const result = await response.json();
        console.log('Session created:', result);
      }
      setIsLoading(false);
      handleModalClose();
    } catch (error) {
      console.error('Error creating session:', error);
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
              errorMsg={formErrors.title?.errors[0]}
            />
            <TextField
              label="Description (optional)"
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
                errorMsg={formErrors.startDate?.errors[0]}
              />
              <DatePicker
                label="End Date"
                name="endDate"
                disabled={isLoading}
                initialDate={!!editId ? formData.endDate : undefined}
                errorMsg={formErrors.endDate?.errors[0]}
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