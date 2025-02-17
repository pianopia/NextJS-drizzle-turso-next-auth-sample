import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { z } from "zod";
import { sql } from "drizzle-orm";

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  name: text('name'),
  email: text('email').unique(),
  emailVerified: text('email_verified').default(sql`CURRENT_TIMESTAMP`),
  image: text('image'),
  hashedPassword: text("hashed_password").notNull(),
});

export const sessions = sqliteTable("sessions", {
 id: text("id").notNull().primaryKey(),
 sessionToken: text("session_token").notNull().unique(),
 userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
 expires: text("expires").notNull(),
});

export const VerificationToken = sqliteTable(
 "verification_token",
 {
  identifier: text("identifier").notNull().primaryKey(),
  token: text("token").notNull().unique(),
  expires: text("expires").notNull(),
 }
);

export const User = z.object({
 id: z.string(),
 name: z.string().optional(),
 email: z.string().email().optional(),
 emailVerified: z.string().optional(),
 image: z.string().optional(),
});