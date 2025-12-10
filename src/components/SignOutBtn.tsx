'use client';

import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";
import { Button } from "@/components/_ui/Button";

export const SignOutBtn = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    signOut();
    router.push('/sign-in');
  }

  return (
    <Button onClick={handleSignOut}>
      Sign Out
    </Button>
  )
}