import { serve } from '@hono/node-server';
import { TEST } from '@repo/test';
import { Hono } from 'hono';

const app = new Hono();

app.get('/', (c) => {
  return c.text(TEST);
});

app.get('/ping', (c) => {
  return c.text('pong');
});

const port = 3000;

console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
