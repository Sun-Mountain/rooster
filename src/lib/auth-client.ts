import { nextCookies } from 'better-auth/next-js';
import { createAuthClient } from 'better-auth/react';
import { inferAdditionalFields } from 'better-auth/client/plugins';
import { auth } from './auth';

export const { signIn, signUp, signOut, useSession } = createAuthClient({
  plugins: [
    inferAdditionalFields<typeof auth>(),
    nextCookies()
  ]
})