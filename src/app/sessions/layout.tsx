import { ReactNode } from "react";
import UserDashboard from "@/components/layout/UserDashboard";

export default async function UserDashLayout({ children }: { children: ReactNode }) {
  return (
    <UserDashboard>
      {children}
    </UserDashboard>
  );
}