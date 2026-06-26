import Link from "next/link";

interface MainNavLinksProps {
  showHomeLink?: boolean;
}

export const MainNavLinks = ({
  showHomeLink = false
}: MainNavLinksProps) => {
  return (
    <>
      <ul>
        {showHomeLink && (
          <li>
            <Link href="/" className="navbar-link">Home</Link>
          </li>
        )}
        <li>
          <Link href="/classes" className="navbar-link">Classes</Link>
        </li>
        <li>
          <Link href="/events" className="navbar-link">Events</Link>
        </li>
        <li>
          <Link href="/about" className="navbar-link">About</Link>
        </li>
        <li>
          <Link href="/contact" className="navbar-link">Contact</Link>
        </li>
      </ul>
    </>
  );
};