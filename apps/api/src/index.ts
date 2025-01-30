import { serve } from '@hono/node-server';
import { TEST } from '@repo/test';
import { Hono } from 'hono';
import { auth } from './auth.ts';
import { env } from './env.ts';
import { cors } from 'hono/cors';

export const ASD = 'ASD';

const app = new Hono();

app.use(
  cors({
    origin: 'http://localhost:3001',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }),
);

app.get('/', (c) => {
  return c.text(TEST);
});

app.on(['POST', 'GET'], '/auth/**', (c) => auth.handler(c.req.raw));

const port = env.PORT;

console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
