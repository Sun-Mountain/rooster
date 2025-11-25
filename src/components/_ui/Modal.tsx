'use client';

import { ReactNode, useState } from 'react';
import { Modal as ModalUI } from '@mui/material';
import { Close } from '@mui/icons-material';
import { Button } from '@/components/_ui/Button';

interface ModalProps {
  buttonContent: ReactNode;
  children: ReactNode;
  modalOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  buttonClassName?: string;
  danger?: boolean;
}

export const Modal = ({
  buttonContent,
  children,
  modalOpen = false,
  onOpen,
  onClose,
  buttonClassName,
  danger
}: ModalProps) => {

  return (
    <>
      <Button onClick={onOpen} className={buttonClassName}>
        {buttonContent}
      </Button>
      <ModalUI
        open={modalOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={`modal-container${danger ? ' danger-modal' : ''}`}>
          <div className={`modal-content-container${danger ? ' danger-modal' : ''}`}>
              <Button onClick={onClose} aria-label="Close modal" className="close-button icon transparent">
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