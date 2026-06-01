"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Edit } from "@mui/icons-material";
import { ClassDetailProps } from "@/lib/props";
import { Button } from "@/components/_ui/Button";
import { Modal } from "@/components/_ui/Modal";
import { ClassDetailsForm } from "@/components/forms/ClassDetailsForm";

interface EditClassDetailsModalProps {
  formData: ClassDetailProps;
  termName: string;
  // termId: string;
  // setTermData: Dispatch<SetStateAction<TermProps>>;
}

export const EditClassDetailsModal = ({
  formData,
  termName,
}: EditClassDetailsModalProps) => {
  const [classDetailsData, setClassDetailsData] = useState<ClassDetailProps>(formData);

  const onSubmit = async () => {
    console.log("Submitting updated class details:", classDetailsData);
  }

  return (
    <>
      <Modal
        modalBtnContent={<><Edit /> Edit</>}
        btnAction={<Button onClick={onSubmit}>Update</Button>}
        modalBtnClassName="w-icon small"
        includeCancel={true}
        // closeOnAction={closeOnAction}
      >
        <div className="modal-content">
          <ClassDetailsForm
            formData={classDetailsData || formData}
            termName={termName}
            setInitialFormData={setClassDetailsData}
          />
        </div>
      </Modal>
    </>
  )
}