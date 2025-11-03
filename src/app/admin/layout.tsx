import { ReactNode } from "react";
import { NavigationAdmin } from "@/components/NavigationAdmin";

export default function AdminLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <section className="admin-layout">
      <NavigationAdmin />
      <div className="page-content-container">
        {children}
      </div>
    </section>
  )
}