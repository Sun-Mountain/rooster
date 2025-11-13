'use client';

import Link from "next/link";
import { usePathname } from 'next/navigation';

export const AdminDashLinks = () => {
  const pathname = usePathname();

  return (
    <ul>
      <li>
        <Link href="/admin" className={pathname === "/admin" ? "active" : ""}>Dashboard</Link>
      </li>
      <li>
        <Link href="/admin/settings" className={pathname === "/admin/settings" ? "active" : ""}>Settings</Link>
      </li>
    </ul>
  )
}