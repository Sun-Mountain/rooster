import StudentsPage from "@/components/pages/admin/StudentsPage";

export const metadata = {
  title: "Admin - Students",
  description: "Manage students in the admin dashboard",
};

export default async function AdminStudentsPage() {
  return <StudentsPage />;
};