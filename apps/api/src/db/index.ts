import { drizzle } from 'drizzle-orm/node-postgres';
import { env } from '../env.ts';

export const db = drizzle({
  connection: {
    host: env.POSTGRES_HOST,
    database: env.POSTGRES_DB,
    user: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD,
  },
});
