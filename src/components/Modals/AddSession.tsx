'use client';

import { useState } from "react";
import { Button } from "@/components/UI/Button";
import { Modal } from "@/components/UI/Modal";
import { Add as AddIcon } from "@mui/icons-material";
import { SessionForm } from "@/components/Forms/Session";

interface AddSessionModalProps {
  onSuccess: () => void;
}

export const AddSessionModal = ({ onSuccess }: AddSessionModalProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSuccess = () => {
    onSuccess();
    handleClose();
  };

  return (
    <>
      <Button className="w-icon" onClick={handleOpen}>
        <AddIcon /> New Session
      </Button>
      <Modal open={open} handleClose={handleClose}>
        <>
          <h2>Add New Session</h2>
          <SessionForm onSuccess={handleSuccess} />
        </>
      </Modal>
    </>
  );
}