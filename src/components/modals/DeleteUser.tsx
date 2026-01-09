"use client";

import { useRouter } from "next/navigation";
import { Modal } from "@/components/_ui/Modal";
import { Button } from "@/components/_ui/Button";

interface DeleteUserModalProps {
  userId: string;
}

export const DeleteUserModal = ({
  userId,
}: DeleteUserModalProps) => {
  const router = useRouter();

  const deleteUser = async () => {
    try {
      const response = await fetch(`/api/admin/user/${userId}`, {
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

  return (
    <>
      <Modal
        btnContent="Delete User"
        btnClassName="danger w-icon"
      >
        <div className="modal-content">
          <h2>Confirm Delete User</h2>
          <p>Are you sure you want to delete this user? If deleted, this action cannot be undone and will erase all associated data.</p>
          <div className="btn-group">
            <Button className="danger" onClick={deleteUser}>
              Confirm Delete
            </Button>
            <Button className="transparent no-border">
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}