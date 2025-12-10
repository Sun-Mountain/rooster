import { getSession } from "@/lib/get-session";
import { unauthorized } from "next/navigation";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

export default async function ProfilePage() {
  const session = await getSession();
  const user = session?.user;

  if (!user) unauthorized();

  console.log(user )

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