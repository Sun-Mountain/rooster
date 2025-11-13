import Link from "next/link";

interface AccountFormLinksProps {
  signUp?: boolean;
}


export const AccountFormLinks = ({ signUp }: AccountFormLinksProps) => {
  return (
    <div className="links-container">
      {signUp ? (
        <>
          Already have an account?{' '}
          <Link href="/sign-in" className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </>
      ) : (
        <>
          Don&apos;t have an account?{' '}
          <Link href="/sign-up" className="text-blue-500 hover:underline">
            Sign Up Here
          </Link>
        </>
      )}
    </div>
  );
};