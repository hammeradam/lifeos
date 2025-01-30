import { betterAuth } from 'better-auth';
import { db } from './db/index.ts';
import { env } from './env.ts';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import {
  accountTable,
  sessionTable,
  userTable,
  verificationTable,
} from './db/schema.ts';

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      session: sessionTable,
      user: userTable,
      account: accountTable,
      verification: verificationTable,
    },
  }),
  trustedOrigins: [env.BASE_URL],
});
