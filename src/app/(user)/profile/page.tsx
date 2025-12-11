import { SignOutBtn } from '@/components/SignOutBtn';
import { isSignedIn } from '@/helpers/isSignedIn';
import { getSession } from '@/lib/get-session';
import { notFound } from 'next/navigation';
import { AccountInfoForm } from '@/components/forms/AccountInfo';

export default async function ProfilePage() {
  await isSignedIn();

  const session = await getSession();
  const user = session?.user;

  if (!user) notFound();

  return (
    <>
      <div>
        Welcome, {user.firstName} {user.lastName}!
      </div>
      <AccountInfoForm />
      <div>
        <SignOutBtn />
      </div>
    </>
  );
}