"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/_ui/Modal";
import { Button } from "@/components/_ui/Button";
import { deleteBtnContent } from "@/components/buttons/btnContent";
import { Alert, AlertMsgProps } from "@/components/_ui/Alert";

interface DeleteItemModalProps {
  itemId: string;
  type: "user" | "term" | "class" | "classDetails";
  name?: string;
  modalBtnSize?: "small" | "medium" | "large";
}

export const DeleteItemModal = ({
  itemId,
  type,
  name,
  modalBtnSize = "medium",
}: DeleteItemModalProps) => {
  const [alertMsg, setAlertMsg] = useState<AlertMsgProps | null>(null);
  const router = useRouter();

  const deleteItem = async () => {
    try {
      const response = await fetch(`/api/admin/${type}?id=${itemId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        router.back();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to delete ${type}`);
      }
    } catch (error) {
      setAlertMsg({ message: `Failed to delete ${type}: ${error instanceof Error ? error.message : "An unexpected error occurred"}`, type: 'error' });
    }
  }

  const confirmDelete = () => {
    return (
      <Button className="danger" onClick={deleteItem}>
        Confirm Delete
      </Button>
    )
  }

  return (
    <>
      <Modal
        modalBtnContent={deleteBtnContent()}
        btnAction={confirmDelete()}
        modalBtnClassName={`danger w-icon ${modalBtnSize}`}
        includeCancel={true}
        danger={true}
      >
        <div className="modal-content danger-modal">
          <h2>Confirm Delete {type === "user" ? "User" : type === "term" ? "Session" : "Class"}</h2>
          {alertMsg && <Alert type={alertMsg.type} className="transparent no-margin no-padding">{alertMsg.message}</Alert>}
          <p>Are you sure you want to delete {name ? <strong>{name}</strong> : `this ${type === "user" ? "user" : "session"}`}?</p>
          <p>If deleted, this action cannot be undone and will erase all associated data.</p>
        </div>
      </Modal>
    </>
  )
}