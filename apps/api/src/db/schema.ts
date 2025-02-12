import {
  pgTable,
  unique,
  text,
  boolean,
  timestamp,
  foreignKey,
} from 'drizzle-orm/pg-core';

export const userTable = pgTable(
  'user',
  {
    id: text().primaryKey().notNull(),
    name: text().notNull(),
    email: text().notNull(),
    emailVerified: boolean().notNull(),
    image: text(),
    createdAt: timestamp({ mode: 'string' }).notNull(),
    updatedAt: timestamp({ mode: 'string' }).notNull(),
  },
  (table) => [unique('user_email_key').on(table.email)],
);

export const sessionTable = pgTable(
  'session',
  {
    id: text().primaryKey().notNull(),
    expiresAt: timestamp({ mode: 'string' }).notNull(),
    token: text().notNull(),
    createdAt: timestamp({ mode: 'string' }).notNull(),
    updatedAt: timestamp({ mode: 'string' }).notNull(),
    ipAddress: text(),
    userAgent: text(),
    userId: text().notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [userTable.id],
      name: 'session_userId_fkey',
    }),
    unique('session_token_key').on(table.token),
  ],
);

export const accountTable = pgTable(
  'account',
  {
    id: text().primaryKey().notNull(),
    accountId: text().notNull(),
    providerId: text().notNull(),
    userId: text().notNull(),
    accessToken: text(),
    refreshToken: text(),
    idToken: text(),
    accessTokenExpiresAt: timestamp({ mode: 'string' }),
    refreshTokenExpiresAt: timestamp({ mode: 'string' }),
    scope: text(),
    password: text(),
    createdAt: timestamp({ mode: 'string' }).notNull(),
    updatedAt: timestamp({ mode: 'string' }).notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [userTable.id],
      name: 'account_userId_fkey',
    }),
  ],
);

export const verificationTable = pgTable('verification', {
  id: text().primaryKey().notNull(),
  identifier: text().notNull(),
  value: text().notNull(),
  expiresAt: timestamp({ mode: 'string' }).notNull(),
  createdAt: timestamp({ mode: 'string' }),
  updatedAt: timestamp({ mode: 'string' }),
});
