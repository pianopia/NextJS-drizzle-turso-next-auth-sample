import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from "./schema";

const url = process.env.NEXT_PUBLIC_DATABASE_URL ?? process.env.DATABASE_URL ?? 'libsql://sqlite.db';
const token = process.env.DATABASE_TOKEN;
const client = createClient({
  url: url,
  authToken: token
});

export const db = drizzle(client, { schema });