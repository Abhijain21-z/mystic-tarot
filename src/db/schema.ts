import { pgTable, serial, text, integer, timestamp, jsonb, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  freeReadingsUsed: integer("free_readings_used").notNull().default(0),
  credits: integer("credits").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const sessions = pgTable("sessions", {
  token: varchar("token", { length: 128 }).primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at").notNull(),
});

export const guests = pgTable("guests", {
  id: varchar("id", { length: 64 }).primaryKey(),
  readingsUsed: integer("readings_used").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const readings = pgTable("readings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }),
  guestId: varchar("guest_id", { length: 64 }),
  paidWith: varchar("paid_with", { length: 16 }).notNull(), // free | credit
  cards: jsonb("cards").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  provider: varchar("provider", { length: 16 }).notNull().default("paypal"),
  stripeSessionId: varchar("stripe_session_id", { length: 255 }),
  paypalOrderId: varchar("paypal_order_id", { length: 255 }).unique(),
  pack: varchar("pack", { length: 16 }).notNull(),
  amountCents: integer("amount_cents").notNull(),
  credits: integer("credits").notNull(),
  status: varchar("status", { length: 16 }).notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
