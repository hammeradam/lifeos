import { serve } from '@hono/node-server';
import { TEST } from '@repo/test';
import { Hono } from 'hono';
import { auth } from './auth.ts';
import { env } from './env.ts';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { pool } from './db.ts';

export const ASD = 'ASD';

const app = new Hono();

app.use(logger());

app.use(
  cors({
    origin: env.BASE_URL,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }),
);

app.get('/', (c) => {
  return c.text(TEST);
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
    await pool.end();
    process.exit(0);
  });
});
