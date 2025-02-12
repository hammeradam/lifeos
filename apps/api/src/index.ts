import { serve } from '@hono/node-server';
// import { TEST } from '@repo/test';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { auth } from './auth.ts';
import { env } from './env.ts';
import { authMiddleware } from './middleware.ts';
import type { CustomEnv } from './types.ts';
import { ensureUser } from './utils.ts';

const app = new Hono<CustomEnv>();

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

app.use('*', authMiddleware);

app.get('/me', (c) => {
  const { user, session } = ensureUser(c);

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

const cleanup = async () => {
  console.log('Cleaning up...');
};

const shutdownGracefully = async () => {
  console.log('Shutting down gracefully...');

  await cleanup();

  server.close(async () => {
    console.log('Server closed');
    process.exit(0);
  });

  // Force exit if cleanup takes too long
  setTimeout(() => {
    console.error('Force shutting down...');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', shutdownGracefully);
process.on('SIGINT', shutdownGracefully);
