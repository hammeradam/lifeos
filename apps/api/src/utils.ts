import { unauthorized } from './http-errors.ts';
import type { CustomContext } from './types.ts';

export const ensureUser = (c: CustomContext) => {
  const session = c.get('session');
  const user = c.get('user');

  if (!session || !user) {
    throw unauthorized;
  }

  return {
    session,
    user,
  };
};

export const getUser = (c: CustomContext) => {
  const session = c.get('session');
  const user = c.get('user');

  return {
    session,
    user,
  };
};
