interface AccountLinksProps {
  signInForm?: boolean;
  signUpForm?: boolean;
}

export const AccountLinks = ({ signInForm, signUpForm }: AccountLinksProps) => {
  return (
    <div className="account-links">
      {signUpForm && (
        <>
          Already have an account? <a href="/sign-in">Sign In</a>
        </>
      )}
      {signInForm && (
        <>
          Don&apos;t have an account? <a href="/sign-up">Sign Up</a>
        </>
      )}
    </div>
  );
}