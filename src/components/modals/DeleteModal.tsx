"use client";

import { useRouter } from "next/navigation";
import { Modal } from "@/components/_ui/Modal";
import { Button } from "@/components/_ui/Button";

interface DeleteUserModalProps {
  id: string;
  type: "user" | "term";
  altType?: "session";
  name?: string;
}

export const DeleteModal = ({
  id,
  type,
  altType,
  name
}: DeleteUserModalProps) => {
  const router = useRouter();

  const deleteUser = async () => {
    try {
      const response = await fetch(`/api/admin/${type}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('User deleted successfully');
        router.back();
        // Optionally, you can add further actions here, like refreshing the user list
      } else {
        console.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }

  const confirmDelete = () => {
    return (
      <Button className="danger" onClick={deleteUser}>
        Confirm Delete
      </Button>
    )
  }

  return (
    <>
      <Modal
        btnContent={`Delete ${ altType ? altType.charAt(0).toUpperCase() + altType.slice(1) : type.charAt(0).toUpperCase() + type.slice(1)}`}
        btnAction={confirmDelete()}
        btnClassName="danger w-icon"
        includeCancel={true}
        danger={true}
      >
        <div className="modal-content">
          <h2>Confirm Delete {type.charAt(0).toUpperCase() + type.slice(1)}</h2>
          <p>Are you sure you want to delete {name ? <strong>{name}</strong> : `this ${type}`}?</p>
          <p>If deleted, this action cannot be undone and will erase all associated data.</p>
        </div>
      </Modal>
    </>
  )
}