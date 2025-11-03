'use client';

import { useState } from "react";
import { Button } from "@/components/UI/Button";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { Modal } from "@/components/UI/Modal";

export const ConfirmDeleteModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Button className="icon danger" onClick={handleOpen}>
        <DeleteIcon />
      </Button>
      <Modal open={open} handleClose={handleClose}>
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this item?</p>
        <Button className="danger" onClick={handleClose}>
          Confirm
        </Button>
      </Modal>
    </>
  )
}