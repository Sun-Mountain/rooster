import { SignOutBtn } from '@/components/SignOutBtn';
import { isSignedIn } from '@/helpers/isSignedIn';
import { getSession } from '@/lib/get-session';
import { notFound } from 'next/navigation';
import { AccountInfoForm } from '@/components/forms/AccountInfo';
import { AccountContactForm } from '@/components/forms/AccountContact';
import { AccountAddressForm } from '@/components/forms/AccountAddress';
import { AccountEmergencyContactForm } from '@/components/forms/AccountEmergencyContact';

export default async function ProfilePage() {
  await isSignedIn();

  const session = await getSession();
  const user = session?.user;

  if (!user) notFound();

  return (
    <>
      <h1>Account Information</h1>
      <div>
        Welcome, {user.firstName} {user.lastName}!
      </div>
      <AccountInfoForm user={user} />
      <AccountContactForm userId={user.id} userEmail={user.email} />
      <AccountAddressForm />
      <AccountEmergencyContactForm />
      <div className="btn-center">
        <SignOutBtn />
      </div>
    </>
  );
}