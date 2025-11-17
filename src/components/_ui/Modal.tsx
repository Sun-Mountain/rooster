'use client';

import { ReactNode, useState } from 'react';
import { Modal as ModalUI } from '@mui/material';
import { Close } from '@mui/icons-material';
import { Button } from '@/components/_ui/Button';

interface ModalProps {
  buttonContent: ReactNode;
  children: ReactNode;
}

export const Modal = ({ buttonContent, children }: ModalProps) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button onClick={handleOpen}>
        {buttonContent}
      </Button>
      <ModalUI
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modal-container">
          <div className="modal-content-container">
            <Button onClick={handleClose} aria-label="Close modal" className="close-button icon transparent">
              <Close />
            </Button>
            <div className="modal-content">
              {children}
            </div>
          </div>
        </div>
      </ModalUI>
    </>
  );
};