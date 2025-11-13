'use client';

import Link from "next/link";
import { usePathname } from 'next/navigation';

export const AdminDashLinks = () => {
  const pathname = usePathname();

  return (
    <ul>
      <li>
        <Link href="/admin" className={pathname === "/admin" ? "active" : ""}>
          Dashboard
        </Link>
      </li>
      <li>
        <Link href="/admin/sessions" className={pathname === "/admin/sessions" ? "active" : ""}>
          Sessions
        </Link>
      </li>
      <li>
        <Link href="/admin/classes" className={pathname === "/admin/classes" ? "active" : ""}>
          Classes
        </Link>
      </li>
      <li>
        <Link href="/admin/students" className={pathname === "/admin/students" ? "active" : ""}>
          Students
        </Link>
      </li>
    </ul>
  )
}