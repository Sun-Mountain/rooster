import { ReactNode } from "react";
import { SideNavLayout } from "@/components/_layouts/SideNavLayout";
import { AdminDashLinks } from "@/components/content/AdminDashLinks";
import { getServerSession } from "@/lib/get-session";
import { forbidden, unauthorized } from "next/navigation";
import { Role } from "../../../generated/prisma/enums";

export default async function AdminDashLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession();
  const user = session?.user;

  if (!user) unauthorized();
  if (user.role !== Role.ADMIN && user.role !== Role.SUPER) forbidden();

  return (
    <SideNavLayout linkNode={<AdminDashLinks />}>
      {children}
    </SideNavLayout>
  );
}