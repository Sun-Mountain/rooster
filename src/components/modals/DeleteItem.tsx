"use client";

import { useRouter } from "next/navigation";
import { Modal } from "@/components/_ui/Modal";
import { Button } from "@/components/_ui/Button";

interface DeleteItemModalProps {
  itemId: string;
  type: "user" | "session";
  name?: string;
}

export const DeleteItemModal = ({
  itemId,
  type,
  name
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
        console.log(`${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully`);
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
        btnContent={`Delete ${type === "user" ? "User" : "Term"}`}
        btnAction={confirmDelete()}
        btnClassName="danger w-icon"
        includeCancel={true}
        danger={true}
      >
        <div className="modal-content">
          <h2>Confirm Delete {type === "user" ? "User" : "Term"}</h2>
          <p>Are you sure you want to delete {name ? <strong>{name}</strong> : `this ${type}`}?</p>
          <p>If deleted, this action cannot be undone and will erase all associated data.</p>
        </div>
      </Modal>
    </>
  )
}