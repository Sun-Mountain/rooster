import { ReactNode } from "react";
import { SideNavLayout } from "@/components/layouts/SideNavLayout";

export default function UserAccountLayout({ children }: { children: ReactNode }) {
  return (
    <SideNavLayout>
      {children}
    </SideNavLayout>
  );
}