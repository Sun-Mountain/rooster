'use client';

import Link from "next/link";
import { useSession } from "next-auth/react";
import { AccountMenu } from "./content/AccountMenu";

const NavBar = () => {
  const { data: session } = useSession();
  const isAuthenticated = !!session;
  return (
    <nav>
      <div id="nav-container">
        <Link href="/" className="nav-link">
          Home
        </Link>

        <div>
          {isAuthenticated ? (
            <AccountMenu />
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