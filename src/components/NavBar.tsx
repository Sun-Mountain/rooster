'use client';

import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";

const NavBar = () => {
  const { data: session } = useSession();
  const user = session?.user;
  return (
    <nav>
      <div id="nav-container">
        <div>
          <h1 className="nav-logo">Rooster</h1>
        </div>
        <div className="nav-links">
          <Link href="/" className="nav-link">
            Home
          </Link>
          {user ? (
            <>
              <Link href="/profile" className="nav-link">
                Profile
              </Link>
              <Link href="/" className="nav-link" onClick={() => signOut()}>
                Sign Out
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