import { Dispatch, ReactNode, SetStateAction } from "react";
import { Close as CloseIcon } from "@mui/icons-material";
import { Modal as ModalUI } from '@mui/material';
import { Button } from "./Button";

interface ModalProps {
  children: ReactNode;
  open: boolean;
  handleClose: Dispatch<SetStateAction<boolean>>;
  className?: string;
}

export const Modal = ({ children, open, handleClose, className }: ModalProps) => {

  return (
    <>
      <ModalUI open={open} onClose={handleClose}>
        <div className={`modal-container ${className || ''}`}>
          <div className="close-button-container">
            <Button className="icon transparent" onClick={() => handleClose(false)}>
              <CloseIcon />
            </Button>
          </div>
          <div className="modal-content">

            {children}
          </div>
        </div>
      </ModalUI>
    </>
  )
};
