"use client";

import { ReactNode } from "react";
import UserDashLinks from "@/components/content/UserDashLinks";

const UserDashboard = ({ children }: { children: ReactNode }) => {
  return (
    <div id="user-dashboard-container">
      <div className="user-dashboard-nav">
        <div className="user-nav-content">
          <UserDashLinks />
        </div>
      </div>
      <div className="main-content-container">
        {children}
      </div>
    </div>
  );
};

export default UserDashboard;