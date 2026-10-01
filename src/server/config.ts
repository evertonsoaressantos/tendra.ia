import { z } from "zod";

const schema = z.object({
  AI_MODE: z.enum(["fixture", "provider"]).default("fixture"),
  APP_ORIGIN: z.url().default("http://localhost:3000"),
  PIPELINE_VERSION: z.string().min(1).default("v1"),
  SUPABASE_URL: z.url(),
  SUPABASE_PUBLISHABLE_KEY: z.string().min(1),
  DATABASE_URL_APP: z.url(),
  DATABASE_URL_WORKER_DOMAIN: z.url().optional(),
  DATABASE_URL_QUEUE: z.url().optional(),
  DATABASE_URL_MIGRATION: z.url().optional(),
  OPENAI_API_KEY: z.string().min(1).optional(),
  GENERATION_MODEL: z.string().default("gpt-4.1-mini-2025-04-14"),
  EMBEDDING_MODEL: z.string().default("text-embedding-3-small"),
  SUPABASE_SECRET_KEY: z.string().min(1).optional(),
});

export type Runtime = "web" | "worker" | "migration";

/** Server/Node entrypoints only. Errors contain field names, never supplied values. */
export function loadConfig(env: Record<string, string | undefined>, runtime: Runtime) {
  if (typeof window !== "undefined") throw new Error("Server configuration only");
  const exposed = Object.keys(env).filter((key) =>
    key.startsWith("NEXT_PUBLIC_") && /SECRET|TOKEN|PASSWORD|DATABASE|OPENAI|SERVICE_ROLE/.test(key),
  );
  if (exposed.length) throw new Error("Private configuration has a public prefix");
  const result = schema.safeParse(Object.fromEntries(
    Object.entries(env).map(([key, value]) => [key, value === "" ? undefined : value]),
  ));
  if (!result.success) {
    throw new Error(`Invalid configuration: ${[...new Set(result.error.issues.map((i) => i.path.join(".")))].join(", ")}`);
  }
  const config = result.data;
  const required = runtime === "worker"
    ? ["DATABASE_URL_WORKER_DOMAIN", "DATABASE_URL_QUEUE"] as const
    : runtime === "migration" ? ["DATABASE_URL_MIGRATION"] as const : [];
  for (const key of required) {
    if (!config[key]) throw new Error(`Missing configuration: ${key}`);
  }
  for (const key of ["DATABASE_URL_APP", "DATABASE_URL_WORKER_DOMAIN", "DATABASE_URL_QUEUE", "DATABASE_URL_MIGRATION"] as const) {
    const value = config[key];
    if (value && !["postgres:", "postgresql:"].includes(new URL(value).protocol)) {
      throw new Error(`Invalid database protocol: ${key}`);
    }
  }
  if (runtime === "worker" && config.AI_MODE === "provider" && !config.OPENAI_API_KEY) {
    throw new Error("Missing configuration: OPENAI_API_KEY");
  }
  // Runtime separation is reinforced by database grants in the foundation phase.
  const credentials = [config.DATABASE_URL_APP, config.DATABASE_URL_WORKER_DOMAIN, config.DATABASE_URL_QUEUE, config.DATABASE_URL_MIGRATION]
    .filter((value): value is string => Boolean(value))
    .map((value) => new URL(value).username);
  if (new Set(credentials).size !== credentials.length) {
    throw new Error("Database runtimes must use distinct roles");
  }
  return Object.freeze(config);
}
