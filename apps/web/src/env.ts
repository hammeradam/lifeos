import { z } from 'zod';

export const envSchema = z.object({
  API_PATH_PREFIX: z.string(),
  API_TARGET: z.string(),
});
