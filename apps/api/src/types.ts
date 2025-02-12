import type { Context, Env } from 'hono';
import type { auth } from './auth.ts';

export interface Variables {
  user: typeof auth.$Infer.Session.user | null;
  session: typeof auth.$Infer.Session.session | null;
}

export type CustomEnv = Env & {
  Variables: Variables;
};

export type CustomContext = Context<CustomEnv>;
