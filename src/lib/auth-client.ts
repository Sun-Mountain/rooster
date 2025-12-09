import { createAuthClient } from 'better-auth/react';
import { inferAdditionalFields } from 'better-auth/client/plugins';

export const { signIn, signUp, signOut, useSession } = createAuthClient({
  plugins: [
    inferAdditionalFields({
      user: {
        firstName: {
          type: 'string',
          required: true
        },
        lastName: {
          type: 'string',
          required: true
        },
      }
    })
  ]
})