import { createAuthClient } from 'better-auth/react';
import { inferAdditionalFields } from "better-auth/client/plugins";
import { adminClient } from "better-auth/client/plugins";

export const {
  changeEmail,
  signIn,
  signUp,
  signOut,
  updateUser,
  useSession
} = createAuthClient({
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
        pronouns: {
          type: 'string',
          required: false
        }
      }
    }),
    adminClient()
  ]
})