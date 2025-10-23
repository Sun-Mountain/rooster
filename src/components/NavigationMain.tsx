'use client';

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "./UI/Button";

export const NavigationMain = () => {
  const { data: session } = useSession();
  const isAuthenticated = !!session?.user;

  return (
    <nav>
      <div className="nav-link-container">
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            {isAuthenticated ? (
              <Button>Account</Button>
            ) : (
              <Link href="/sign-in">Sign In</Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};