"use client";

import { usePathname } from "next/navigation";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';

const AdminNavLinks = () => {
  const pathname = usePathname();

  return (
    <ul>
      <li>
        <a href="/admin" className={pathname === "/admin" ? "active" : ""}>
          <DashboardOutlinedIcon />
          <div>
            Dashboard
          </div>
        </a>
      </li>
      <li>
        <a href="/admin/classes" className={pathname === "/admin/classes" ? "active" : ""}>
          <ImportContactsIcon />
          <div>
            Classes
          </div>
        </a>
      </li>
      <li>
        <a href="/admin/sessions" className={pathname === "/admin/sessions" ? "active" : ""}>
          <CalendarTodayIcon />
          <div>
            Sessions
          </div>
        </a>
      </li>
      <li>
        <a href="/admin/students" className={pathname === "/admin/students" ? "active" : ""}>
          <PeopleAltOutlinedIcon />
          <div>
            Students
          </div>
        </a>
      </li>
    </ul>
  );
};

export default AdminNavLinks;