import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: 'turso',
  verbose: true,
  strict: true,
  dbCredentials: {
    url: process.env.DATABASE_URL || 'sqlite.db',
    authToken: process.env.DATABASE_TOKEN || ''
  }
} satisfies Config;
