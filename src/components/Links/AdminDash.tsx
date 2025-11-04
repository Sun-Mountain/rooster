'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const AdminDashLinks = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div className="admin-dash-links">
      <ul>
        <li>
          <Link href="/admin" className={isActive('/admin') ? 'active' : ''}>Dashboard</Link>
        </li>
        <li>
          <Link href="/admin/classes" className={isActive('/admin/classes') ? 'active' : ''}>Classes</Link>
        </li>
        <li>
          <Link href="/admin/sessions" className={isActive('/admin/sessions') ? 'active' : ''}>Sessions</Link>
        </li>
        <li>
          <Link href="/admin/users" className={isActive('/admin/users') ? 'active' : ''}>Users</Link>
        </li>
      </ul>
    </div>
  );
}