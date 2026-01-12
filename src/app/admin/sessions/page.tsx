import { SessionForm } from "@/components/forms/SessionForm";

export default function AdminSessionsPage() {
  return (
    <div className="admin-sessions-page">
      <h1>Session Management</h1>
      <SessionForm />
    </div>
  );
}