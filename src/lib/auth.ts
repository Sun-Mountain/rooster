import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { db as prisma } from '@db/index'

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
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
    },
  },
  // trustedOrigins: ['http://localhost:3001'],
})