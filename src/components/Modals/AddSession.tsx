'use client';

import { useState } from "react";
import { Button } from "@/components/UI/Button";
import { Modal } from "@/components/UI/Modal";
import { Add as AddIcon } from "@mui/icons-material";
import { SessionForm } from "@/components/Forms/Session";

export const AddSessionModal = () => {  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button className="w-icon" onClick={handleOpen}>
        <AddIcon /> New Session
      </Button>
      <Modal open={open} handleClose={handleClose}>
        <>
          <h2>Add New Session</h2>
          <SessionForm />
        </>
      </Modal>
    </>
  );
}