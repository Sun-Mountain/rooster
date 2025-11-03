import { SignInSignOutForm } from "@/components/Forms/SignInSignOut";

const SignUpPage = () => {
  return (
    <div className="page-content-container">
      <h1>Sign Up</h1>
      <SignInSignOutForm signUpForm />
    </div>
  );
};

export default SignUpPage;