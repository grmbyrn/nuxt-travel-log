#!/usr/bin/env node
import { execSync } from "node:child_process";

const CODE_FILE_RE = /\.(?:js|ts|vue|jsx|tsx)$/;

function run(cmd) {
  return execSync(cmd, { encoding: "utf8" }).trim();
}

try {
  const out = run("git diff --name-only --cached --diff-filter=ACM");
  if (!out)
    process.exit(0);

  const files = out
    .split("\n")
    .map(f => f.trim())
    .filter(Boolean)
    .filter(f => CODE_FILE_RE.test(f));

  if (!files.length)
    process.exit(0);

  const quoted = files.map(f => `"${f}"`).join(" ");
  execSync(`npx eslint --fix ${quoted}`, { stdio: "inherit" });

  // Restage any changes made by eslint
  execSync(`git add ${quoted}`);
  process.exit(0);
}
catch (err) {
  if (err.status)
    process.exit(err.status);
  console.error(err);
  process.exit(1);
}
