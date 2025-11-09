'use client';

import { useState } from "react";
import { Button } from "@/components/UI/Button";
import { Modal } from "@/components/UI/Modal";
import { Add as AddIcon } from "@mui/icons-material";
import { ClassForm } from "@/components/Forms/Class";
import { EditSquare } from "@mui/icons-material";
import { ClassProps } from "@/lib/interfaces/class";

interface AddEditClassModalProps {
  onSuccess: () => void;
  editClassId?: string;
  classData?: ClassProps;
  initialSessionId?: string | null;
}

export const AddEditClassModal = ({
  onSuccess,
  editClassId
}: AddEditClassModalProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSuccess = () => {
    onSuccess();
    handleClose();
  };

  return (
    <>
      <Button className={editClassId ? "icon transparent" : "w-icon"} onClick={handleOpen}>
        {editClassId ? <EditSquare /> : <><AddIcon /> New Class</> }
      </Button>
      <Modal open={open} handleClose={handleClose}>
        <>
          <h2>{editClassId ? "Edit Class" : "Add New Class"}</h2>
          <ClassForm onSuccess={handleSuccess} editClassId={editClassId} />
        </>
      </Modal>
    </>
  );
}