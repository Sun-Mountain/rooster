"use client";

import { Modal } from "@/components/_ui/Modal";
import { ClassDetailsForm } from "@/components/forms/ClassDetailsForm";

interface AddClassToTermModalProps {
  termId: string;
}

export const AddClassToTermModal = ({ termId }: AddClassToTermModalProps) => {
  return (
    <div className="modal-btn-container">
      <Modal
        modalBtnContent="Add Class"
        btnAction={<button>Add Class</button>}
        modalBtnClassName="primary"
      >
        <div className="modal-content">
          <ClassDetailsForm termId={termId} />
        </div>
      </Modal>
    </div>
  )
}