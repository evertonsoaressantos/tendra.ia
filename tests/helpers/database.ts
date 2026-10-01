import { Pool } from "pg";

/** Destructive test fixtures must target an explicitly disposable local database. */
export function validateTestDatabaseUrl(value: string | undefined) {
  if (!value) throw new Error("TEST_DATABASE_URL is required");
  let url: URL;
  try { url = new URL(value); } catch { throw new Error("Invalid test database URL"); }
  if (!["postgres:", "postgresql:"].includes(url.protocol)
    || !["localhost", "127.0.0.1", "[::1]"].includes(url.hostname)
    || !/^\/tendra_test_[a-z0-9_]+$/.test(url.pathname)
    || url.search || url.hash) {
    throw new Error("Tests require a disposable local tendra_test_* database without connection overrides");
  }
  return value;
}

export function createTestPool() {
  return new Pool({ connectionString: validateTestDatabaseUrl(process.env.TEST_DATABASE_URL), max: 4 });
}
