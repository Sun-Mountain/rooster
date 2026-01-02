'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";


export const AuthLinks = () => {
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
      {pathname !== "/forgot-password" && (
        <li>
          <Link href="/forgot-password">Forgot Password?</Link>
        </li>
      )}
    </ul>
  );
};