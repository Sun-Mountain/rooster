import { ReactNode } from "react";
import { SideNavLayout } from "@/components/layouts/SideNavLayout";
import { AccountSettingsLinks } from "@/components/content/AccountSettingsLinks";

export default function UserAccountLayout({ children }: { children: ReactNode }) {
  return (
    <SideNavLayout linkNode={<AccountSettingsLinks />}>
      {children}
    </SideNavLayout>
  );
}