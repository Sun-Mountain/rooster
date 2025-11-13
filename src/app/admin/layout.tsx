import { ReactNode } from "react";
import { SideNavLayout } from "@/components/layouts/SideNavLayout";
import { AdminDashLinks } from "@/components/content/AdminDashLinks";

export default function AdminDashLayout({ children }: { children: ReactNode }) {
  return (
    <SideNavLayout linkNode={<AdminDashLinks />}>
      {children}
    </SideNavLayout>
  );
}