'use client';

import { Dispatch, SetStateAction, useState } from "react";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { Modal } from "../_ui/Modal";
import { Button } from "../_ui/Button";

interface DeleteModalProps {
  item: 'session' | 'user' | 'class';
  itemName: string;
  itemId: string;
  isLoading?: boolean;
  setIsLoading?: Dispatch<SetStateAction<boolean>>;
}

export const DeleteModal = ({ item, itemName, itemId, isLoading, setIsLoading }: DeleteModalProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const handleDelete = async () => {
    try {
      if (setIsLoading) {
        setIsLoading(true);
      }
      await fetch(`/api/admin/${item}?id=${itemId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error(`Error deleting ${item}:`, error);
    } finally {
      if (setIsLoading) {
        setIsLoading(false);
      }
      handleModalClose();
    }
  };

  return (
    <Modal
      buttonContent={
        <DeleteIcon />
      }
      buttonClassName="icon transparent no-border danger"
      modalOpen={modalOpen}
      onOpen={handleModalOpen}
      onClose={handleModalClose}
    >
      <p>
        Are you sure you want to delete the {item}: <strong>{itemName}</strong>?
      </p>
      <p>Once deleted, this action cannot be undone.</p>
      <Button className="danger" onClick={handleDelete} disabled={isLoading}>
        Yes, delete
      </Button>
    </Modal>
  );
};