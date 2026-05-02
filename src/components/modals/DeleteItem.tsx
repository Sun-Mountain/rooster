"use client";

import { useRouter } from "next/navigation";
import { Modal } from "@/components/_ui/Modal";
import { Button } from "@/components/_ui/Button";
import { deleteBtnContent } from "@/components/buttons/btnContent";

interface DeleteItemModalProps {
  itemId: string;
  type: "user" | "term" | "class";
  name?: string;
  modalBtnSize?: "small" | "medium" | "large";
}

export const DeleteItemModal = ({
  itemId,
  type,
  name,
  modalBtnSize = "medium",
}: DeleteItemModalProps) => {
  const router = useRouter();

  const deleteItem = async () => {
    try {
      const response = await fetch(`/api/admin/${type}/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        router.back();
        // Optionally, you can add further actions here, like refreshing the user list
      } else {
        console.error(`Failed to delete ${type}`);
      }
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
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
          <p>Are you sure you want to delete {name ? <strong>{name}</strong> : `this ${type === "user" ? "user" : "session"}`}?</p>
          <p>If deleted, this action cannot be undone and will erase all associated data.</p>
        </div>
      </Modal>
    </>
  )
}