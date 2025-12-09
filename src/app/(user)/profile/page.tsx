import { getSession } from "@/lib/get-session";
import { unauthorized } from "next/navigation";

export default async function ProfilePage() {
  const session = await getSession();
  const user = session?.user;

  if (!user) unauthorized();

  return (
    <>
      Welcome, {user.firstName} {user.lastName}!
    </>
  );
}