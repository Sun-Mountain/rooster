'use client';

import Link from "next/link";

const NavBar = () => {
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
          <Link href="/sign-in" className="nav-link">
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;