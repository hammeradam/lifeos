import { betterAuth } from 'better-auth';
import { pool } from './db.ts';
import { env } from './env.ts';

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  database: pool,
  trustedOrigins: [env.BASE_URL],
});
