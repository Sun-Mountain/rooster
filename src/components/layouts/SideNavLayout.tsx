import { ReactNode } from "react";
import { SideNavMenu } from "../SideNavMenu";
import { AccountSettingsLinks } from "../content/AccountLinks";

export function SideNavLayout({ children }: { children: ReactNode }) {
  return (
    <section className="side-nav-layout">
      <SideNavMenu>
        <div className="side-nav-link-container">
          <AccountSettingsLinks />
        </div>
      </SideNavMenu>
      <div className="content-container">
        {children}
      </div>
    </section>
  )
};