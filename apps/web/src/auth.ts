import { createAuthClient } from 'better-auth/react';

console.log(import.meta.env.VITE_API_BASE_URL);
export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_API_BASE_URL, // the base url of your auth server
});
