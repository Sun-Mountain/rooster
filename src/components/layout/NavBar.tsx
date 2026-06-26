"use client";

import Link from "next/link";
import { useWindowSize } from "@/helpers/useWindowSize";
import Drawer from "@/components/.ui/Drawer";
import { MainNavLinks } from "@/components/content/MainNavLinks";

const NavBar = () => {
  const { width } = useWindowSize();
  const isMobile = width && width <= 768;

  return (
    <nav id="navbar">
      <div id="navbar-content">
        <div id="logo-container">
          <Link href="/" id="logo-link"></Link>
        </div>
        {!isMobile && (
          <div className="navbar-links">
            <MainNavLinks />
          </div>
        )}
        <div className="sign-in-btn-container ">
          <Link href="/sign-in" id="sign-in-link">Sign In</Link>
          {isMobile && (
            <Drawer anchor="top" btnClassName="medium icon main-nav">
              <MainNavLinks showHomeLink />
            </Drawer>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;