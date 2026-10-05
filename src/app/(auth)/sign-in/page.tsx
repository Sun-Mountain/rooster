import SignInSignUpForm from "@/components/forms/signInSignUp";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ verification?: string }>;
}) {
  const params = await searchParams;

  return (
    <>
      <SignInSignUpForm verificationPending={params.verification === "pending"} />
    </>
  );
}