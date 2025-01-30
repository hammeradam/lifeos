import { betterAuth } from 'better-auth';
import { db } from './db/index.ts';
import { env } from './env.ts';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  trustedOrigins: [env.BASE_URL],
});
