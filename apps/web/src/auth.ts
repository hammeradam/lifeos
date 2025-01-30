import { createAuthClient } from 'better-auth/react';
import { envSchema } from './env';

const env = envSchema.parse(import.meta.env);

export const authClient = createAuthClient({
  baseURL: env.VITE_API_BASE_URL, // the base url of your auth server
});
