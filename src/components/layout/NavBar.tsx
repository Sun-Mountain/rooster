"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { usePathname } from "next/navigation";
import { useWindowSize } from "@/helpers/useWindowSize";
import { UserProps } from "@/lib/props";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Link from "next/link";
import Drawer from "@/components/.ui/Drawer";
import MainNavLinks from "@/components/content/MainNavLinks";
import SignOutButton from "@/components/SignOutBtn";
import AdminBanner from "./AdminBanner";

const NavBar = () => {
  const { width } = useWindowSize();
  const isMobile = width && width <= 768;
  const { data: session } = useSession();
  const user = session?.user as UserProps | undefined;
  const pathname = usePathname();

  const [userRole, setUserRole] = useState<"USER" | "ADMIN" | "SUPER" | undefined>(undefined);
  const [styling, setStyling] = useState<string>("no-user");

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole") as "USER" | "ADMIN" | "SUPER" | undefined | null;

    const recordRole = () => {
      setUserRole(storedRole as "USER" | "ADMIN" | "SUPER" | undefined);
    }

    if (!storedRole && user?.role) {
      localStorage.setItem("userRole", user.role);
      recordRole();
    } else if (storedRole && user?.role && storedRole !== userRole) {
      localStorage.setItem("userRole", user.role);
      recordRole();
    }
  }, [user?.role, userRole]);

  useEffect(() => {
    const setNavbarStyling = () => {
      if (user) {
        setStyling("logged-in");
      } else {
        setStyling("no-user");
      }
    };

    setNavbarStyling();
  }, [user]);

  return (
    <nav id="navbar" className={styling}>
      {user && <AdminBanner userRole={userRole} />}
      <div className="navbar-content-container">
        <div className="navbar-content">
          <div id="logo-container">
            <Link href="/" id="logo-link"></Link>
          </div>
          {user ? (
            <div className="logged-in-links">
              {user?.role != "USER" && pathname.includes("/admin") && (
                <div className="dashboard-link-container">
                  <Link href="/" className="dashboard-link">
                    <AccountCircleIcon /> Student Dashboard
                  </Link>
                </div>
              )}
              <div>
                <SignOutButton />
              </div>
            </div>
          ) : (
            <>
              {!isMobile && (
                <div className="navbar-links">
                  <MainNavLinks />
                </div>
              )}
              <div className="sign-in-btn-container">
                <Link href="/sign-in" id="sign-in-link">Sign In</Link>
                {isMobile && (
                  <Drawer anchor="top" btnClassName="medium icon main-nav">
                    <MainNavLinks showHomeLink />
                  </Drawer>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;