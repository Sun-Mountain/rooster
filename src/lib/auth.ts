import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { db as prisma } from '@db/index';
import { admin } from "better-auth/plugins";
import { Role } from '../../generated/prisma/client';

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
      role: {
        type: 'string',
        required: false,
        input: false,
        default: Role.USER,
      }
    },
  },
  plugins: [
    admin({
      adminRoles: ["ADMIN", "SUPER"]
    })
  ]
  // trustedOrigins: ['http://localhost:3001'],
})