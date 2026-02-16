import { SessionForm } from "@/components/forms/SessionForm";
import { SessionList } from "@/components/content/SessionList";

export default function AdminSessionsPage() {
  return (
    <div className="admin-page">
      <div className="header-container">
        <h1>Session Management</h1>
      </div>
      <SessionForm />
      <SessionList />
    </div>
  );
}