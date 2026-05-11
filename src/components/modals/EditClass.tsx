"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Edit } from "@mui/icons-material";
import { Modal } from "@/components/_ui/Modal";
import { ClassFormDataProps } from "@/lib/props";
import { ClassForm } from "@/components/forms/ClassForm";
import { Button } from "@/components/_ui/Button";
import { ClassProps } from "@/lib/props";

interface EditClassModalProps {
  formData: ClassFormDataProps;
  classId: string;
  setClassData: Dispatch<SetStateAction<ClassProps>> | null;
}

export const EditClassModal = ({
  formData,
  classId,
  setClassData
}: EditClassModalProps) => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [classData, setClassDataState] = useState<ClassFormDataProps | null>(formData);
  const [closeOnAction, setCloseOnAction] = useState(false);

  const resetCloseOnAction = () => {
    setTimeout(() => {
      setCloseOnAction(false)
    }, 500);
  }

  const updateClass = async () => {
    try {
      setSubmitting(true);
      const response = await fetch(`/api/admin/class/${classId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(classData)
      });
      if (!response.ok) throw new Error("Failed to update class.");
      const data = await response.json();
      if (setClassData) setClassData(data);
      setCloseOnAction(true);
      resetCloseOnAction();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update class");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Modal
        modalBtnContent={<><Edit /> Edit</>}
        btnAction={<Button onClick={updateClass}>{submitting ? "Updating..." : "Update"}</Button>}
        modalBtnClassName="w-icon small"
        includeCancel={true}
        closeOnAction={closeOnAction}
      >
        <div className="modal-content">
          <ClassForm
            setIsLoading={setSubmitting}
            isEditing={true}
            isModal={true}
            formData={classData || undefined}
            setInitialFormData={setClassDataState}
          />
        </div>
      </Modal>
    </>
  )
}