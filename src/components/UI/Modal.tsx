import { Dispatch, ReactNode, SetStateAction } from "react";
import { Close as CloseIcon } from "@mui/icons-material";
import { Modal as ModalUI } from '@mui/material';
import { Button } from "./Button";

interface ModalProps {
  children: ReactNode;
  open: boolean;
  handleClose: Dispatch<SetStateAction<boolean>>;
}

export const Modal = ({ children, open, handleClose }: ModalProps) => {

  return (
    <>
      <ModalUI open={open} onClose={handleClose}>
        <div className="modal-container">
          <div className="close-button-container">
            <Button className="icon transparent" onClick={() => handleClose(false)}>
              <CloseIcon />
            </Button>
          </div>
          {children}
        </div>
      </ModalUI>
    </>
  )
};
