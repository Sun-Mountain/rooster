import { ReactNode } from "react";
import { SideNavLayout } from "@/components/layouts/SideNavLayout";
import { AdminDashLinks } from "@/components/content/AdminDashLinks";
import { isAdmin } from "@/helpers/isSignedIn";

export default async function AdminDashLayout({ children }: { children: ReactNode }) {
  await isAdmin();

  return (
    <SideNavLayout linkNode={<AdminDashLinks />}>
      {children}
    </SideNavLayout>
  );
}