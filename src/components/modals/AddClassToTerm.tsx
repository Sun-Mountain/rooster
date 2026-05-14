"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/_ui/Modal";
import { ClassDetailsForm } from "@/components/forms/ClassDetailsForm";
import { Button } from "@/components/_ui/Button";
import { ClassDetailFormDataProps } from "@/lib/props";

interface AddClassToTermModalProps {
  termId: string;
}

export const AddClassToTermModal = ({ termId }: AddClassToTermModalProps) => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<ClassDetailFormDataProps | null>(null);
  const [closeOnAction, setCloseOnAction] = useState(false);

  const resetCloseOnAction = () => {
    setTimeout(() => {
      setCloseOnAction(false)
    }, 500);
  }

  useEffect(() => {
    console.log({formData});
  }, [formData]);

  const addClassToTerm = async () => {
    try {
      setSubmitting(true);
      console.log("Adding class to term with data:", formData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add class to term");
    } finally {
      console.log("Finished adding class to term");
      setSubmitting(false);
    }
  };

  const submitButton = () => {
    return <Button onClick={addClassToTerm} disabled={submitting}>
      {submitting ? "Adding..." : "Add Class"}
    </Button>;
  }

  return (
    <div className="modal-btn-container">
      <Modal
        modalBtnContent="Add Class"
        btnAction={submitButton()}
        modalBtnClassName="primary"
        includeCancel={true}
      >
        <div className="modal-content">
          <ClassDetailsForm
            isLoading={submitting}
            formData={formData || undefined}
            setInitialFormData={setFormData}
          />
        </div>
      </Modal>
    </div>
  )
}