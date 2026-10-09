import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

// NOTE: never throw at import time — Vercel build collects page data
// without env vars. Pool connects lazily on first query, so a missing
// DATABASE_URL only fails at runtime (API routes catch and return 500).
const connectionString =
  process.env.DATABASE_URL ?? "postgresql://localhost:5432/mystic_tarot_placeholder";

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
};

export const pool =
  globalForDb.__arenaNextJsPostgresqlPool ??
  new Pool({
    connectionString,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.__arenaNextJsPostgresqlPool = pool;
}

export const db = drizzle(pool);
