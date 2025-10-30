import { SignInSignOutForm } from "@/components/Forms/SignInSignOut";

const SignInPage = () => {
  return (
    <div className="page-content-container">
      <h1>Sign In</h1>
      <SignInSignOutForm signInForm />
    </div>
  );
};

export default SignInPage;