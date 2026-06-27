import { ReactNode } from "react";
import AdminDashboard from "@/components/layout/AdminDashboard";
import { isAdmin } from "@/helpers/isSignedIn";

export default async function AdminDashLayout({ children }: { children: ReactNode }) {
  await isAdmin();

  return (
    <AdminDashboard>
      {children}
    </AdminDashboard>
  );
}