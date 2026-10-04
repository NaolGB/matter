#!/usr/bin/env node
// Every heading on the home page is a line the app says. This checks that the app still
// says each one: it looks for every entry of src/content/app-lines.json in the Swift
// source and fails when a line has changed or gone.
//
//   npm run check:lines            (expects the app at ../workspace/Duka)
//   MATTER_APP_DIR=/path npm run check:lines

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, relative, resolve } from "node:path";

const appDir = resolve(process.env.MATTER_APP_DIR ?? "../workspace/Duka");
const roots = ["Duka", "DukaiOS", "DukaiOSWidgets", "DukaKit/Sources"].map((dir) => join(appDir, dir));
if (!roots.every(existsSync)) {
  console.error(`The app's source was not found under ${appDir}. Set MATTER_APP_DIR.`);
  process.exit(2);
}

function swiftFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return swiftFiles(path);
    return entry.name.endsWith(".swift") ? [path] : [];
  });
}

const files = roots.flatMap(swiftFiles).map((path) => ({ path, text: readFileSync(path, "utf8") }));
const lines = JSON.parse(readFileSync(new URL("../src/content/app-lines.json", import.meta.url), "utf8"));

let missing = 0;
for (const [key, { text, find }] of Object.entries(lines)) {
  const hit = files.find((file) => file.text.includes(find));
  if (hit) {
    console.log(`ok       ${key.padEnd(16)} ${relative(appDir, hit.path)}`);
  } else {
    missing += 1;
    console.log(`MISSING  ${key.padEnd(16)} "${text}"   looked for: ${find}`);
  }
}

if (missing > 0) {
  console.error(`\n${missing} line(s) the site quotes are no longer in the app.`);
  process.exit(1);
}
console.log(`\nAll ${Object.keys(lines).length} lines are still in the app.`);
