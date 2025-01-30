import { serve } from '@hono/node-server';
import { TEST } from '@repo/test';
import { Hono } from 'hono';
import { auth } from './auth.ts';
import { env } from './env.ts';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';

export const ASD = 'ASD';

const app = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}>();

app.use(logger());

app.use(
  cors({
    origin: env.BASE_URL,
    credentials: true,
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['POST', 'GET', 'OPTIONS'],
    exposeHeaders: ['Content-Length'],
    maxAge: 600,
  }),
);

app.use('*', async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    c.set('user', null);
    c.set('session', null);
    return next();
  }

  c.set('user', session.user);
  c.set('session', session.session);
  return next();
});

app.get('/me', (c) => {
  const session = c.get('session');
  const user = c.get('user');

  if (!user) return c.body(null, 401);

  return c.json({
    user,
    session,
  });
});

app.on(['POST', 'GET'], '/api/auth/**', (c) => auth.handler(c.req.raw));

const port = env.PORT;

console.log(`Server is running on port ${port}`);

const server = serve({
  fetch: app.fetch,
  port,
});

process.on('SIGINT', async () => {
  console.log('shutting down server');

  server.close(async () => {
    process.exit(0);
  });
});
