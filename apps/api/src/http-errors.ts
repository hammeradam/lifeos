import { HTTPException } from 'hono/http-exception';

export const unauthorized = new HTTPException(401, {
  message: 'unauthorized',
});
