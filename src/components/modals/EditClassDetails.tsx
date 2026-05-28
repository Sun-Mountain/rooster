"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Edit } from "@mui/icons-material";
import { ClassDetailProps } from "@/lib/props";
import { Modal } from "@/components/_ui/Modal";
import { ClassDetailsForm } from "@/components/forms/ClassDetailsForm";

interface EditClassDetailsModalProps {
  formData: ClassDetailProps;
  // termId: string;
  // setTermData: Dispatch<SetStateAction<TermProps>>;
}

export const EditClassDetailsModal = ({
  formData
}: EditClassDetailsModalProps) => {
  const [classDetailsData, setClassDetailsData] = useState<ClassDetailProps | null>(formData);

  console.log(formData)

  return (
    <>
      <Modal
        modalBtnContent={<><Edit /> Edit</>}
        // btnAction={<Button onClick={updateClass}>{submitting ? "Updating..." : "Update"}</Button>}
        modalBtnClassName="w-icon small"
        // includeCancel={true}
        // closeOnAction={closeOnAction}
      >
        <div className="modal-content">
          <ClassDetailsForm />
        </div>
      </Modal>
    </>
  )
}