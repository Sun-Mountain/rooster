'use client';

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "./_ui/Button";

const NavBar = () => {
  const { data: session } = useSession();
  const isAuthenticated = !!session;

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  }
  return (
    <nav>
      <div id="nav-container">
        <Link href="/" className="nav-link">
          Home
        </Link>

        <div>
          {isAuthenticated ? (
            <>
              <Button onClick={handleSignOut}>Sign Out</Button>
            </>
          ) : (
            <>
              <Link href="/sign-in" className="nav-link">
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;