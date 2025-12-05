'use client';

import Link from "next/link";
import { Circle as CircleIcon } from "@mui/icons-material";
import { useSession, signOut } from "@/lib/auth-client";
import { Drawer } from "@/components/_ui/Drawer";
import { useWindowSize } from "@/helpers/useWindowSize";

import { Button } from "./_ui/Button";

export const NavMain = () => {
  const size = useWindowSize();
  const isMobile = (size.width ?? 0) < 768;
  const { data: session } = useSession();

  const user = session?.user;
  const isAdmin = session?.user?.role?.includes("ADMIN") || session?.user?.role?.includes("SUPER");

  const links = () => {
    return (
      <>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/classes">Classes</Link>
        </li>
        {user ? (
          <>
            <li>
              <Link href="/settings">Settings</Link>
            </li>
            <li>
              <Button onClick={() => signOut()}>Sign Out</Button>
            </li>
          </>
        ) : (
          <li>
            <Link href="/sign-in">Sign In</Link>
          </li>
        )}
      </>
    )
  };

  return (
    <nav>
      <div className="navigation-content">
        <div className="logo-and-title">
          <div className="logo-container">
            <CircleIcon />
          </div>
          {!isMobile && (
            <>
              {isAdmin ? <Link href="/admin/dashboard">Admin</Link> : <Link className="title" href="/">In The Dark Circus Arts</Link>}
            </>
          )}
        </div>
        <ul>
          {isMobile ? (
            <Drawer>
              <ul className="drawer-links">
                {isAdmin && (
                  <li>
                    <Link href="/admin/dashboard">Admin Dashboard</Link>
                  </li>
                )}
                {links()}
              </ul>
            </Drawer>
          ) : (
            <ul>{links()}</ul>
          )}
        </ul>
      </div>
    </nav>
  );
}