import { serve } from '@hono/node-server';
import { TEST } from '@repo/test';
import { Hono } from 'hono';

const app = new Hono();

app.get('/', (c) => {
  return c.text(TEST);
});

const port = 3000;

console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
