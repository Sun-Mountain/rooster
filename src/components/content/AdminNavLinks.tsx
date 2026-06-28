"use client";

import { usePathname } from "next/navigation";
import {
  CalendarToday,
  DashboardOutlined,
  ImportContacts,
  PeopleAltOutlined,
  SettingsOutlined
} from '@mui/icons-material';

const AdminNavLinks = () => {
  const pathname = usePathname();

  return (
    <ul>
      <li>
        <a href="/admin" className={pathname === "/admin" ? "active" : ""}>
          <DashboardOutlined />
          <div>
            Dashboard
          </div>
        </a>
      </li>
      <li>
        <a href="/admin/classes" className={pathname === "/admin/classes" ? "active" : ""}>
          <ImportContacts />
          <div>
            Classes
          </div>
        </a>
      </li>
      <li>
        <a href="/admin/sessions" className={pathname === "/admin/sessions" ? "active" : ""}>
          <CalendarToday />
          <div>
            Sessions
          </div>
        </a>
      </li>
      <li>
        <a href="/admin/students" className={pathname === "/admin/students" ? "active" : ""}>
          <PeopleAltOutlined />
          <div>
            Students
          </div>
        </a>
      </li>
      <li>
        <a href="/admin/settings" className={pathname === "/admin/settings" ? "active" : ""}>
          <SettingsOutlined />
          <div>
            Settings
          </div>
        </a>
      </li>
    </ul>
  );
};

export default AdminNavLinks;