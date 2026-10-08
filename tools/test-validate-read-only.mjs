#!/usr/bin/env node
/**
 * Proves that ordinary validation is observational: it may read the grammar,
 * but it must not rewrite reports or consumer artifacts.
 */
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const outputTargets = [
  "reports/validation-report.json",
  "reports/validation-report.md",
  "../src/lib/grammar/bundle.json",
  "../public/grammar/validation-report.json",
  "../public/grammar/validation-report.md",
].map((relative) => path.resolve(ROOT, relative));

function fingerprint(file) {
  if (!fs.existsSync(file)) return "absent";
  return crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
}

const before = new Map(outputTargets.map((file) => [file, fingerprint(file)]));
execFileSync(process.execPath, ["tools/validate.mjs"], { cwd: ROOT, stdio: "inherit" });
const changed = outputTargets.filter((file) => fingerprint(file) !== before.get(file));

if (changed.length > 0) {
  console.error("Read-only validation rewrote generated output:");
  for (const file of changed) console.error(`  ${path.relative(ROOT, file)}`);
  process.exit(1);
}

console.log("Read-only validation PASS: generated-output targets were unchanged.");
