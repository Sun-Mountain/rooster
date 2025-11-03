'use client';

import { useState } from "react";
import { Button } from "@/components/UI/Button";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { Modal } from "@/components/UI/Modal";

interface ConfirmDeleteModalProps {
  id: string;
  itemType: 'session' | 'class' | 'user';
  handleSuccess?: () => void;
}

export const ConfirmDeleteModal = ({ id, itemType, handleSuccess }: ConfirmDeleteModalProps) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleConfirmDelete = async () => {
    const response = await fetch(`/api/admin/${itemType}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      if (handleSuccess) handleSuccess();
      handleClose();
    } else {
      console.log(`Failed to delete ${itemType}.`);
    }
  };

  return (
    <>
      <Button className="icon danger" onClick={handleOpen}>
        <DeleteIcon />
      </Button>
      <Modal open={open} handleClose={handleClose}>
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this item?</p>
        <Button className="danger" onClick={handleConfirmDelete}>
          Confirm
        </Button>
      </Modal>
    </>
  )
}