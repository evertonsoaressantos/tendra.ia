import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createClient } from "@supabase/supabase-js";

const status = JSON.parse(execFileSync("node_modules/.bin/supabase", ["status", "--output", "json"], {
  encoding: "utf8",
  stdio: ["ignore", "pipe", "pipe"],
}));
const apiUrl = new URL(status.API_URL);
assert.equal(apiUrl.protocol, "http:");
assert.ok(["127.0.0.1", "localhost"].includes(apiUrl.hostname));
assert.equal(apiUrl.port, "54321");
assert.ok(status.SECRET_KEY);

const supabase = createClient(status.API_URL, status.SECRET_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});
const suffix = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
const bucket = `tendra-smoke-${suffix}`;
let userId;
let bucketCreated = false;

try {
  const created = await supabase.auth.admin.createUser({
    email: `smoke-${suffix}@example.test`,
    email_confirm: true,
  });
  if (created.error) throw created.error;
  userId = created.data.user.id;

  const fetched = await supabase.auth.admin.getUserById(userId);
  if (fetched.error) throw fetched.error;
  assert.equal(fetched.data.user.id, userId);

  const bucketResult = await supabase.storage.createBucket(bucket, { public: false });
  if (bucketResult.error) throw bucketResult.error;
  bucketCreated = true;

  const payload = Buffer.from("tendra synthetic storage smoke\n");
  const uploaded = await supabase.storage.from(bucket).upload("probe.txt", payload, {
    contentType: "text/plain",
    upsert: false,
  });
  if (uploaded.error) throw uploaded.error;

  const downloaded = await supabase.storage.from(bucket).download("probe.txt");
  if (downloaded.error) throw downloaded.error;
  assert.equal(await downloaded.data.text(), payload.toString());
  console.log("Local Auth and private Storage smoke passed.");
} finally {
  if (bucketCreated) {
    const emptied = await supabase.storage.emptyBucket(bucket);
    if (emptied.error) {
      console.error(`Storage cleanup failed: ${emptied.error.message}`);
      process.exitCode = 1;
    }
    const deleted = await supabase.storage.deleteBucket(bucket);
    if (deleted.error) {
      console.error(`Bucket cleanup failed: ${deleted.error.message}`);
      process.exitCode = 1;
    }
  }
  if (userId) {
    const deleted = await supabase.auth.admin.deleteUser(userId);
    if (deleted.error) {
      console.error(`Auth cleanup failed: ${deleted.error.message}`);
      process.exitCode = 1;
    }
  }
}
