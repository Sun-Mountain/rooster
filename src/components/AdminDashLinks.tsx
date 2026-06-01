'use client';

import Link from "next/link";
import { usePathname } from 'next/navigation';

export const AdminDashLinks = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname.includes(path) ? "active" : "";

  return (
    <ul>
      <li>
        <Link href="/admin" className={pathname === "/admin" ? "active" : ""}>
          Dashboard
        </Link>
      </li>
      <li>
        <Link href="/admin/classes" className={isActive("/admin/class/")}>
          Classes
        </Link>
      </li>
      <li>
        <Link href="/admin/sessions" className={isActive("/admin/session")}>
          Sessions
        </Link>
      </li>
      <li>
        <Link href="/admin/users" className={isActive("/admin/user")}>
          Users
        </Link>
      </li>
    </ul>
  )
}