'use client';

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

export const AdminDashLinks = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  if (!session || !session.user || session.user.role === 'USER') {
    return null; // Return null if the user is not an admin
  }

  return (
    <ul>
      <li>
        <Link href="/admin" className={pathname === "/admin" ? "active" : ""}>
          Dashboard
        </Link>
      </li>
      <li>
        <Link href="/admin/classes" className={pathname === "/admin/classes" ? "active" : ""}>
          Classes
        </Link>
      </li>
      <li>
        <Link href="/admin/sessions" className={pathname === "/admin/sessions" ? "active" : ""}>
          Sessions
        </Link>
      </li>
      <li>
        <Link href="/admin/students" className={pathname === "/admin/students" ? "active" : ""}>
          Students
        </Link>
      </li>
      {session.user.role === 'SUPER' && (
        <div className="divider-top">
          <li>
            <h4>Super Dash Links</h4>
          </li>
          <li>
            <Link href="/super/users" className={pathname === "/super/users" ? "active" : ""}>
              Users
            </Link>
          </li>
        </div>
      )}
    </ul>
  )
}