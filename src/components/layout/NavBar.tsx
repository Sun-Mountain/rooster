"use client";

import Link from "next/link";

const NavBar = () => {
  return (
    <nav id="navbar">
      <div id="navbar-content">
        <div id="logo-container">
          <Link href="/" id="logo-link"></Link>
        </div>
        <div className="navbar-links">
          <Link href="/classes" className="navbar-link">Classes</Link>
          <Link href="/events" className="navbar-link">Events</Link>
          <Link href="/about" className="navbar-link">About</Link>
          <Link href="/contact" className="navbar-link">Contact</Link>
        </div>
        <div className="sign-in-btn-container ">
          <Link href="/login" id="sign-in-link">Sign In</Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;