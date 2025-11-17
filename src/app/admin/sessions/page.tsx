import { SessionForm } from "@/components/forms/Session";

export default function AdminSessionsPage() {
  return (
    <div>
      <h1>Admin Sessions Page</h1>
      <p>This is where you can manage sessions.</p>
      <SessionForm />
      <div className="divider-top" />
    </div>
  );
}