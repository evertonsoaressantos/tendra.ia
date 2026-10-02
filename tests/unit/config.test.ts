import { describe, expect, it } from "vitest";
import { loadConfig } from "../../src/server/config";
import { validateTestDatabaseUrl } from "../helpers/database";

const env = {
  SUPABASE_URL: "http://127.0.0.1:54321",
  SUPABASE_PUBLISHABLE_KEY: "synthetic-publishable",
  DATABASE_URL_APP: "postgresql://app@localhost/tendra_test_unit",
};

describe("server configuration", () => {
  it("defaults to fixtures without requiring an AI secret", () => {
    expect(loadConfig(env, "web").AI_MODE).toBe("fixture");
  });
  it("does not expose invalid values in errors", () => {
    expect(() => loadConfig({ ...env, DATABASE_URL_APP: "sensitive-secret" }, "web")).toThrow("Invalid configuration: DATABASE_URL_APP");
  });
  it("rejects secrets with browser prefixes", () => {
    expect(() => loadConfig({ ...env, NEXT_PUBLIC_OPENAI_API_KEY: "synthetic" }, "web")).toThrow("public prefix");
  });
  it("requires separate worker credentials", () => {
    expect(() => loadConfig(env, "worker")).toThrow("DATABASE_URL_WORKER_DOMAIN");
    expect(() => loadConfig({ ...env, DATABASE_URL_WORKER_DOMAIN: env.DATABASE_URL_APP }, "web")).toThrow("distinct roles");
  });
  it("requires an AI key for provider workers", () => {
    expect(() => loadConfig({ ...env, AI_MODE: "provider", DATABASE_URL_WORKER_DOMAIN: "postgresql://worker@localhost/test", DATABASE_URL_QUEUE: "postgresql://queue@localhost/test" }, "worker")).toThrow("OPENAI_API_KEY");
  });
});

describe("destructive test database guard", () => {
  it.each([
    undefined,
    "postgresql://user@production.example/tendra_test_one",
    "postgresql://user@localhost/production",
    "postgresql://user@localhost/tendra_test_one?host=production.example",
    "https://localhost/tendra_test_one",
  ])("rejects an unsafe destination", (url) => {
    expect(() => validateTestDatabaseUrl(url)).toThrow();
  });
  it("accepts an explicitly disposable local database", () => {
    expect(validateTestDatabaseUrl(env.DATABASE_URL_APP)).toBe(env.DATABASE_URL_APP);
  });
});
