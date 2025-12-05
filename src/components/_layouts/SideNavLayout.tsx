import { ReactNode } from "react";
import { SideNavMenu } from "@/components/SideNavMenu";

interface SideNavLayoutProps {
  children: ReactNode;
  linkNode: ReactNode;
}

export function SideNavLayout({ children, linkNode }: SideNavLayoutProps) {
  return (
    <section className="side-nav-layout">
      <SideNavMenu>
        <div className="side-nav-link-container">
          {linkNode}
        </div>
      </SideNavMenu>
      <div className="content-container">
        {children}
      </div>
    </section>
  )
};