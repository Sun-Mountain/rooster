
import { ReactNode, useEffect, useState } from 'react';
import { Modal as ModalComponent } from '@mui/material';
import { Button } from '@/components/_ui/Button';

interface ModalProps {
  children: ReactNode;
  btnContent: ReactNode;
  btnClassName?: string;
  open?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

export const Modal =({
  children,
  btnContent,
  btnClassName,
  onOpen: propOnOpen,
  onClose: propOnClose,
}: ModalProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    if (propOnOpen) propOnOpen();
  };

  const handleClose = () => {
    setOpen(false);
    if (propOnClose) propOnClose();
  };

  return (
    <div>
      <Button onClick={handleOpen} className={btnClassName}>
        <>
          {btnContent}
        </>
      </Button>
      <ModalComponent
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modal-container">
          <div className="modal-content">
            {children}
          </div>
        </div>
      </ModalComponent>
    </div>
  );
}