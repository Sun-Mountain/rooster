"use client";

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { Avatar } from '@mui/material';
import { UserProps } from "@/lib/props";

interface MainNavLinksProps {
  user?: UserProps;
  inDrawer?: boolean;
}

export const MainNavLinks = ({ user, inDrawer = false }: MainNavLinksProps) => {
  const pathname = usePathname();

  function stringAvatar(name: string) {
    return {
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

  const linkClass = (path: string, exact: boolean = false) => {
    if (inDrawer) {
      return "nav-link";
    }

    if (exact ? pathname === path : pathname.includes(path)) {
      return "nav-link active";
    }

    return "nav-link";
  }

  return (
    <ul className="nav-links">
      <li>
        <Link href="/" className={linkClass("/", true)}>
          Home
        </Link>
      </li>
      <li>
        <Link href="/classes" className={linkClass("/classes", false)}>
          Classes
        </Link>
      </li>
      <li>
        <Link href="/about" className={linkClass("/about", true)}>
          About Us
        </Link>
      </li>
      {user ? (
        <>
          {user.role === 'ADMIN' || user.role === 'SUPER' && (
            <li>
              <Link href="/admin" className={linkClass("/admin", false)}>
                Admin Panel
              </Link>
            </li>
          )}
          <li>
            <Link href="/profile" className={linkClass("/profile", true) + " avatar-link"}>
              {inDrawer ? 'Profile' : (
                <Avatar alt={user.name || ''} src={user.image || ''} {...stringAvatar(user.name || '')} />
              )}
            </Link>
          </li>
        </>
      ) : (
        <li>
          <Link href="/sign-in" className="nav-link">
            Sign In
          </Link>
        </li>
      )}
    </ul>
  )
}