"use client";

import Link from "next/link";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';

interface AdminBannerProps {
  userRole: "USER" | "ADMIN" | "SUPER" | undefined;
}

const AdminBanner = ({ userRole }: AdminBannerProps) => {
  return (
    <div className="is-admin-banner">
      <div className="navbar-content">
        <div className="admin-role">
          <div>
            <strong>
              {userRole}
            </strong>
          </div>
          {/* {!isMobile && (
            <>
              <div>
                •
              </div>
              <div>
                Viewing member portal
              </div>
            </>
          )} */}
        </div>
        <div>
          <Link href="/admin" className="admin-banner-link">
            <DashboardOutlinedIcon />
            Admin Panel        
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminBanner;