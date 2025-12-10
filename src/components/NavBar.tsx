'use client';

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useSession } from "@/lib/auth-client";
import { Avatar } from '@mui/material';

const NavBar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user;

    function stringAvatar(name: string) {
      return {
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
      };
    }

  return (
    <nav>
      <div id="nav-container">
        <div>
          <h1 className="nav-logo">Rooster</h1>
        </div>
        <div className="nav-links">
          <Link href="/" className={`nav-link ${pathname === "/" ? "active" : ""}`}>
            Home
          </Link>
          {user ? (
            <>
              <Link href="/admin" className={`nav-link ${pathname === "/dashboard" ? "active" : ""}`}>
                Admin Panel
              </Link>
              <Link href="/profile" className={`nav-link avatar-link ${pathname === "/profile" ? "active" : ""}`}>
                <Avatar alt={user.name || ''} src={user.image || ''} {...stringAvatar(user.name || '')} />
              </Link>
            </>
          ) : (
            <Link href="/sign-in" className="nav-link">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;