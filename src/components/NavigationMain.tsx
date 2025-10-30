'use client';

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { MenuItem } from "@mui/material";
import { Menu } from "./UI/Menu";
import { Button } from "./UI/Button";

export const NavigationMain = () => {
  const { data: session } = useSession();
  const isAuthenticated = !!session?.user;

  const userRole = session?.user?.role;

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <nav>
      <div className="nav-container">
        <div className="nav-link-container">
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              {isAuthenticated ? (
                <Menu
                  buttonText='Account'
                >
                  <MenuItem>
                    <Link href="/account">Settings</Link>
                  </MenuItem>
                  {(userRole === 'ADMIN' || userRole === 'SUPER') && (
                    <MenuItem>
                      <Link href="/admin">Admin Dashboard</Link>
                    </MenuItem>
                  )}
                  <MenuItem>
                    <Button onClick={handleSignOut}>Sign Out</Button>
                  </MenuItem>
                </Menu>
              ) : (
                <Link href="/sign-in">Sign In</Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};