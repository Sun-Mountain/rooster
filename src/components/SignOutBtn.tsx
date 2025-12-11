'use client';

import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";
import { Button } from "@/components/_ui/Button";
import { Logout } from '@mui/icons-material';

export const SignOutBtn = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    signOut();
    router.push('/sign-in');
  }

  return (
    <Button onClick={handleSignOut} className="danger w-icon">
      <Logout /> Sign Out
    </Button>
  )
}