import { isSignedIn } from '@/helpers/isSignedIn';
import { getSession } from '@/lib/get-session';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { notFound } from 'next/navigation';

export default async function ProfilePage() {
  await isSignedIn();

  const session = await getSession();
  const user = session?.user;

  if (!user) notFound();

  return (
    <>
      Welcome, {user.firstName} {user.lastName}!

      {!user.emailVerified && (
        <div className="alert-warning">
          <ReportProblemIcon />
          Your email address is not verified. Please check your inbox to verify your email.
        </div>
      )}
    </>
  );
}