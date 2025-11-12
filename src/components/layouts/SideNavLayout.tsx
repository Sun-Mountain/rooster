import { ReactNode } from "react";
import { SideNavMenu } from "../SideNavMenu";

export function SideNavLayout({ children }: { children: ReactNode }) {
  return (
    <section className="side-nav-layout">
      <SideNavMenu />
      <div className="page-content-container">
        {children}
      </div>
    </section>
  )
};