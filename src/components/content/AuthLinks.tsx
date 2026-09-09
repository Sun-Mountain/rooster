"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const AuthLinks = () => {
  const pathname = usePathname();

  return (
    <ul className="links-container">
      {pathname !== "/sign-in" && (
        <li>
          Already have an account?{' '}
          <Link href="/sign-in">
            Sign In
          </Link>
        </li>
      )}
      {pathname !== "/sign-up" && (
        <li>
          Don&apos;t have an account?{' '}
          <Link href="/sign-up">
            Sign Up Here
          </Link>
        </li>
      )}
      {pathname !== "/password" && (
        <li>
          <Link href="/password">Forgot Password?</Link>
        </li>
      )}
    </ul>
  );
};

export default AuthLinks;