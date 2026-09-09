"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  CalendarToday,
  DashboardOutlined,
  AutoAwesomeOutlined,
  Air,
  PersonOutlineOutlined
} from '@mui/icons-material';

const UserDashLinks = () => {
  const pathname = usePathname();

  return (
    <ul>
      <li>
        <Link href="/dashboard" className={pathname === "/dashboard" ? "user-dashboard-link active" : "user-dashboard-link"}>
          <DashboardOutlined />
          <div>
            Dashboard
          </div>
        </Link>
      </li>
      <li>
        <Link href="/sessions" className={pathname === "/sessions" ? "user-dashboard-link active" : "user-dashboard-link"}>
          <CalendarToday />
          <div>
            Sessions
          </div>
        </Link>
      </li>
      <li>
        <Link href="/events" className={pathname === "/events" ? "user-dashboard-link active" : "user-dashboard-link"}>
          <AutoAwesomeOutlined />
          <div>
            Events
          </div>
        </Link>
      </li>
      <li>
        <Link href="/open-hang" className={pathname === "/open-hang" ? "user-dashboard-link active" : "user-dashboard-link"}>
          <Air />
          <div>
            Open Hang /<br />Point Rental
          </div>
        </Link>
      </li>
      <li className="hide-on-mobile">
        <Link href="/profile" className={pathname === "/profile" ? "user-dashboard-link active" : "user-dashboard-link"}>
          <PersonOutlineOutlined />
          <div>
            Profile
          </div>
        </Link>
      </li>
    </ul>
  )
}

export default UserDashLinks;