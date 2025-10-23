import Link from "next/link";

export const NavigationMain = () => {

  return (
    <nav>
      <div className="nav-link-container">
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/sign-in">Sign In</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};