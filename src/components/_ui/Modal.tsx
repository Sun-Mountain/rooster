
import { ReactNode, useEffect, useState } from 'react';
import { Modal as ModalComponent } from '@mui/material';
import { Button } from '@/components/_ui/Button';

interface ModalProps {
  children: ReactNode;
  modalBtnContent?: ReactNode;
  btnAction?: ReactNode;
  modalBtnClassName?: string;
  includeCancel?: boolean;
  open?: boolean;
  danger?: boolean;
  closeOnAction?: boolean;
}

export const Modal =({
  children,
  modalBtnContent,
  btnAction,
  modalBtnClassName,
  includeCancel = true,
  danger = false,
  closeOnAction = false
}: ModalProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false)
  };

  useEffect(() => {
    if (closeOnAction) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      handleClose();
    }
  }, [open, closeOnAction])

  const cancelBtn = includeCancel ? (
    <Button onClick={handleClose} className="transparent no-border">
      Cancel
    </Button>
  ) : null;

  return (
    <div>
      <Button onClick={handleOpen} className={modalBtnClassName}>
        <>
          {modalBtnContent}
        </>
      </Button>
      <ModalComponent
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modal-container">
          <div className={`modal-content-container${danger ? ' danger' : ''}`}>
            <div>
              {children}
            </div>
            {btnAction || cancelBtn ? (
              <div className="btn-group">
                {btnAction}
                {cancelBtn}
              </div>
            ) : null}
          </div>
        </div>
      </ModalComponent>
    </div>
  );
}