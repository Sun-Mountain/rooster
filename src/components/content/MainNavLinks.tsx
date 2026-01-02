
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { Avatar } from '@mui/material';
import { User } from "@/lib/auth";

interface MainNavLinksProps {
  user?: User;
  inDrawer?: boolean;
}

export const MainNavLinks = ({ user, inDrawer = false }: MainNavLinksProps) => {
  const pathname = usePathname();

  function stringAvatar(name: string) {
    return {
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

  return (
    <ul className="nav-links">
      <li>
        <Link href="/" className={`nav-link ${pathname === "/" ? "active" : ""}`}>
          Home
        </Link>
      </li>
      <li>
        <Link href="/classes" className={`nav-link ${pathname === "/classes" ? "active" : ""}`}>
          Classes
        </Link>
      </li>
      <li>
        <Link href="/about" className={`nav-link ${pathname === "/About" ? "active" : ""}`}>
          About Us
        </Link>
      </li>
      {user ? (
        <>
          {user.role === 'ADMIN' || user.role === 'SUPER' && (
            <li>
              <Link href="/admin" className={`nav-link ${pathname === "/admin" ? "active" : ""}`}>
                Admin Panel
              </Link>
            </li>
          )}
          <li>
            <Link href="/profile" className={`nav-link avatar-link ${pathname === "/profile" ? "active" : ""}`}>
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