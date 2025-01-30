import { betterAuth } from 'better-auth';
import { pool } from './db.ts';

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  database: pool,
  trustedOrigins: ['http://localhost:3001'],
});
