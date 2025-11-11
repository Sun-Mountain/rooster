import Link from "next/link";

const NavBar = () => {
  return (
    <nav>
      <div id="nav-container">
        <Link href="/" className="nav-link">
          Home
        </Link>

        <div>
          <Link href="/sign-up" className="nav-link">
            Sign Up
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