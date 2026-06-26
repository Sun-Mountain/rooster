"use client";

import { useSession } from "@/lib/auth-client";
import { usePathname } from "next/navigation";
import { useWindowSize } from "@/helpers/useWindowSize";
import { UserProps } from "@/lib/props";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import Link from "next/link";
import Drawer from "@/components/.ui/Drawer";
import MainNavLinks from "@/components/content/MainNavLinks";
import SignOutButton from "@/components/SignOutBtn";

const NavBar = () => {
  const { width } = useWindowSize();
  const isMobile = width && width <= 768;
  const { data: session } = useSession();
  const user = session?.user as UserProps | undefined;
  const pathname = usePathname();

  const pathnameDoesNotInclude = (paths: string[]) => {
    return !paths.some((path) => pathname?.includes(path));
  };

  return (
    <nav id="navbar" className={user ? "logged-in" : "no-user"}>
      {user?.role != "USER" && pathnameDoesNotInclude(["/admin"]) && (
        <div className="is-admin-banner">
          <div className="navbar-content">
            <div className="admin-role">
              <div>
                <strong>
                  {user?.role}
                </strong>
              </div>
              {!isMobile && (
                <>
                  <div>
                    •
                  </div>
                  <div>
                    Viewing member portal
                  </div>
                </>
              )}
            </div>
            <div>
              <Link href="/admin" className="admin-banner-link">
                <DashboardOutlinedIcon />
                Admin Panel        
              </Link>
            </div>
          </div>
        </div>
      )}
      <div className="navbar-content-container">
        <div className="navbar-content">
          <div id="logo-container">
            <Link href="/" id="logo-link"></Link>
          </div>
          {user ? (
            <div>
              <SignOutButton />
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