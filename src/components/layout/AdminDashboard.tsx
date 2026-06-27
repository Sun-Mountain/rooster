"use client";

import { ReactNode } from "react";
import AdminNavLinks from "@/components/content/AdminNavLinks";

const AdminDashboard = ({ children }: { children: ReactNode }) => {

  return (
    <div id="admin-dashboard-container">
      <div className="admin-dashboard-nav">
        <AdminNavLinks />
      </div>
      <div className="main-content-container">
        {children}
      </div>
    </div>
  );
};

export default AdminDashboard;