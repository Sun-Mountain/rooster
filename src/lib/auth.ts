import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';

import db from '@/lib/prisma';


export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      firstName: {
        type: 'string',
        required: true,
        input: true
      },
      lastName: {
        type: 'string',
        required: true,
        input: true
      },
      role: {
        type: 'string',
        input: false
      },
    },
  }
})

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;