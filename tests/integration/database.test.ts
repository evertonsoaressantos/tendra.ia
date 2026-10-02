import { afterAll, describe, expect, it } from "vitest";
import { createTestPool } from "../helpers/database";

const pool = createTestPool();
afterAll(() => pool.end());

describe("disposable PostgreSQL integration environment", () => {
  it("connects only to the expected test database", async () => {
    const result = await pool.query<{ name: string }>("SELECT current_database() AS name");
    expect(result.rows[0].name).toMatch(/^tendra_test_[a-z0-9_]+$/);
  });

  it("supports pgvector in the local database", async () => {
    await pool.query("CREATE EXTENSION IF NOT EXISTS vector");
    const result = await pool.query<{ distance: number }>(
      "SELECT '[1,2,3]'::vector <-> '[1,2,4]'::vector AS distance",
    );
    expect(result.rows[0].distance).toBe(1);
  });
});
