
import { ReactNode, useEffect, useState } from 'react';
import { Modal as ModalComponent } from '@mui/material';
import { Button } from '@/components/_ui/Button';

interface ModalProps {
  children: ReactNode;
  btnContent: ReactNode;
  btnAction?: ReactNode;
  btnClassName?: string;
  includeCancel?: boolean;
  open?: boolean;
  danger?: boolean;
  bigModal?: boolean;
}

export const Modal =({
  children,
  btnContent,
  btnAction,
  btnClassName,
  includeCancel = false,
  danger = false,
  bigModal: big = false,
}: ModalProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false)
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
          <div className={`modal-content-container${danger ? ' danger' : ''}${big ? ' bigger-modal' : ''}`}>
            <div>
              {children}
            </div>
            <div className="btn-group">
              {btnAction}
              {includeCancel && ( 
                <Button onClick={handleClose} className="transparent no-border">
                  Cancel
                </Button>
              )}
            </div>
          </div>
        </div>
      </ModalComponent>
    </div>
  );
}