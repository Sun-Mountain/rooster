'use client';

import { useState } from "react";
import { Button } from "@/components/UI/Button";
import { Modal } from "@/components/UI/Modal";
import { Add as AddIcon } from "@mui/icons-material";
import { SessionForm } from "@/components/Forms/Session";
import { EditSquare } from "@mui/icons-material";
import { SessionProps } from "@/lib/interfaces/session";

interface AddEditSessionModalProps {
  onSuccess: () => void;
  editSessionId?: string;
  sessionData?: SessionProps;
}

export const AddEditSessionModal = ({ onSuccess, editSessionId, sessionData }: AddEditSessionModalProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSuccess = () => {
    onSuccess();
    handleClose();
  };

  return (
    <>
      <Button className={editSessionId ? "icon transparent" : "w-icon"} onClick={handleOpen}>
        {editSessionId ? <EditSquare /> : <><AddIcon /> New Session</> }
      </Button>
      <Modal open={open} handleClose={handleClose}>
        <>
          <h2>{editSessionId ? "Edit Session" : "Add New Session"}</h2>
          <SessionForm onSuccess={handleSuccess} editSessionId={editSessionId} sessionData={sessionData} />
        </>
      </Modal>
    </>
  );
}