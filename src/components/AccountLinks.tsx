interface AccountLinksProps {
  showSignIn?: boolean;
  showSignUp?: boolean;
}

export const AccountLinks = ({ showSignIn, showSignUp }: AccountLinksProps) => {
  return (
    <div className="account-links">
      {showSignIn && (
        <>
          Already have an account? <a href="/sign-in">Sign In</a>
        </>
      )}
      {showSignUp && (
        <>
          Don&apos;t have an account? <a href="/sign-up">Sign Up</a>
        </>
      )}
    </div>
  );
}