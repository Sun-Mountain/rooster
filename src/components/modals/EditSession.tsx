import { Edit } from "@mui/icons-material";
import { Modal } from "@/components/_ui/Modal";

export const EditSessionModal = () => {
  return (
    <>
      <Modal
        modalBtnContent={
          <>
            <Edit /> Edit
          </>
        }
        btnAction={<div>Edit form goes here</div>}
        modalBtnClassName="w-icon small"
        includeCancel={true}
      >
        <div className="modal-content">
          <h2>Edit Session</h2>
          <p>Form to edit session details will go here.</p>
        </div>
      </Modal>
    </>
  );
}