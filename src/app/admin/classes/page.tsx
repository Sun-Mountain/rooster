import { ClassList } from "@/components/content/ClassList";

export default function AdminClassesPage() {
  return (
    <div className="admin-page">
      <div className="header-container">
        <h1>Class Management</h1>
      </div>
      <ClassList />
    </div>
  );
}