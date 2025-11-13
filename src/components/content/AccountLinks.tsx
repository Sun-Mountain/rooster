'use client';

import Link from "next/link";
import { usePathname } from 'next/navigation';

export const AccountSettingsLinks = () => {
  const pathname = usePathname();
  return (
    <ul>
      <li>
        <Link href="/account" className={pathname === "/account" ? "active" : ""}>Account Info</Link>
      </li>
      <li>
        <Link href="/account/settings" className={pathname === "/account/settings" ? "active" : ""}>Settings</Link>
      </li>
      <li>
        <Link href="/account/privacy" className={pathname === "/account/privacy" ? "active" : ""}>Privacy</Link>
      </li>
    </ul>
  )
}