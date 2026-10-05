import { SignOutBtn } from '@/components/SignOutBtn';
import { isSignedIn } from '@/helpers/isSignedIn';
import { getSession } from '@/lib/get-session';
import { notFound } from 'next/navigation';
// import { AccountForm } from '@/components/forms/AccountForm';
import { PaymentTestForm } from '@/components/forms/PaymentTestForm';

export default async function ProfilePage() {
  await isSignedIn();

  const session = await getSession();
  const user = session?.user;

  if (!user) notFound();

  return (
    <div className="profile-page-content">
      <h1>Account Information</h1>
      {/* <AccountForm user={user} /> */}
      <PaymentTestForm />
      <div className="btn-center">
        <SignOutBtn />
      </div>
    </div>
  );
}