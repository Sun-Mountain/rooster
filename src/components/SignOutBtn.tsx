'use client';

import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";
import { Logout } from '@mui/icons-material';
import Button from "@/components/.ui/Button";

export const SignOutBtn = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    signOut();
    router.push('/sign-in');
  }

  return (
    <Button onClick={handleSignOut} className="w-icon sign-out-btn">
      <Logout /> <span className="hide-for-mobile">Sign Out</span>
    </Button>
  )
}
