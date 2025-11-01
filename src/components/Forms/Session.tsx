import { DatePicker } from "../UI/DatePicker";
import { TextField } from "../UI/TextField";

export const SessionForm = () => {
  return (
    <div className="form-container">
      <h2>New Session</h2>
      <form>
        <TextField label="Session Name" name="sessionName" initialValue="" />
        <TextField label="Description" name="description" initialValue="" />
        <DatePicker />
        <DatePicker />
        <button type="submit">Create Session</button>
      </form>
    </div>
  );
}