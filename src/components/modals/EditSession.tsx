"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Edit } from "@mui/icons-material";
import { Modal } from "@/components/_ui/Modal";
import { TermForm } from "@/components/forms/TermForm";
import { SessionFormDataProps } from "@/lib/props";
import { Button } from "@/components/_ui/Button";
import { updateTermById } from "@/lib/api/term";
import { TermProps } from "@/lib/props";

interface EditSessionModalProps {
  formData: SessionFormDataProps;
  termId: string;
  setTermData: Dispatch<SetStateAction<TermProps>> | null;
}

export const EditSessionModal = ({
  formData,
  termId,
  setTermData
}: EditSessionModalProps) => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionData, setSessionData] = useState<SessionFormDataProps | null>(formData);
  const [closeOnAction, setCloseOnAction] = useState(false);

  const resetCloseOnAction = () => {
    setTimeout(() => {
      setCloseOnAction(false)
    }, 500);
  }

  const updateSession = async () => {
    try {
      setSubmitting(true);
      const response = await updateTermById(termId, sessionData!, setError, setSubmitting);
      if (response && (!response.ok || response.status === 400)) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update session");
      }
      if (response && response.ok) {
        if (setTermData && sessionData) {
          setTermData(sessionData as TermProps);
        }
        setCloseOnAction(true);
        resetCloseOnAction()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update session");
    } finally {
      setSubmitting(false);
    }
  };

  const editBtnContent = () => {
    return (
      <>
        <Edit /> Edit
      </>
    )
  }

  const confirmUpdate = () => {
    return (
      <Button onClick={updateSession}>
        {submitting ? "Updating..." : "Update"}
      </Button>
    )
  }

  return (
    <>
      <Modal
        modalBtnContent={editBtnContent()}
        btnAction={confirmUpdate()}
        modalBtnClassName="w-icon small"
        includeCancel={true}
        closeOnAction={closeOnAction}
      >
        <div className="modal-content">
          <TermForm
            setIsLoading={setSubmitting}
            isEditing={true}
            isModal={true}
            formData={formData}
            setInitialFormData={setSessionData}
          />
        </div>
      </Modal>
    </>
  );
}