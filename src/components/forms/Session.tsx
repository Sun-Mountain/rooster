import { Add as AddIcon } from "@mui/icons-material";
import { Modal } from "../_ui/Modal";
import { TextField } from "../_ui/TextField";

export const SessionForm = () => {
  return (
    <>
      <Modal buttonContent={
        <div className="with-icon">
          <AddIcon /> Session
        </div>
      }>
        <h2>Add Session</h2>
        <div className="form-container full-page in-modal">
          <form>
            <TextField label="Session Name" name="title" />
            <TextField label="Description" name="description" multiline rows={2} />
          </form>
        </div>
      </Modal>
    </>
  );
}