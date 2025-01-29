import { z } from 'zod';

export const envSchema = z.object({
  AUTH_SERVICE_PATH_PREFIX: z.string(),
  AUTH_SERVICE_TARGET: z.string(),
});
