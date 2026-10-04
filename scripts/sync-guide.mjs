#!/usr/bin/env node
// Builds src/content/guide.generated.json from the app's own documentation, so the site's
// User Guide and Privacy Policy are the app's text and never a retyped copy.
//
//   npm run sync:guide             (expects the app at ../workspace/Duka)
//   MATTER_APP_DIR=/path npm run sync:guide

import { readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const appDir = resolve(process.env.MATTER_APP_DIR ?? "../workspace/Duka");
const sourcePath = "Duka/Settings/InfoDocuments.swift";
const swift = readFileSync(join(appDir, sourcePath), "utf8");

const unescape = (text) => text.replace(/\\"/g, '"').replace(/\\n/g, "\n").replace(/\\\\/g, "\\");

function fail(message) {
  console.error(`sync-guide: ${message}`);
  process.exit(1);
}

const documents = new Map();
const documentPattern =
  /static let (\w+) = InfoDocument\(\s*id: "([^"]+)",\s*title: "([^"]+)",\s*symbol: "[^"]+",\s*blocks: \[([\s\S]*?)\n\s*\]\s*\)/g;

for (const [, name, id, title, body] of swift.matchAll(documentPattern)) {
  const blocks = [];
  for (const raw of body.split("\n")) {
    const line = raw.trim();
    if (line === "" || line.startsWith("//")) continue;
    const plain = line.match(/^\.(heading|subheading|paragraph|bullet|note)\("(.*)"\),?$/);
    const step = line.match(/^\.step\((\d+),\s*"(.*)"\),?$/);
    if (plain) blocks.push({ kind: plain[1], text: unescape(plain[2]) });
    else if (step) blocks.push({ kind: "step", n: Number(step[1]), text: unescape(step[2]) });
    else fail(`a line in "${name}" has a shape this script does not know:\n  ${line}`);
  }
  documents.set(name, { id, title, blocks });
}

if (documents.size === 0) fail(`no documents found in ${sourcePath}`);

const order = swift.match(/static let guide: \[InfoDocument\] = \[([\s\S]*?)\]/);
if (!order) fail("the guide's page order was not found");
const names = order[1].split(",").map((name) => name.trim()).filter(Boolean);

const guide = names.map((name) => documents.get(name) ?? fail(`the guide lists "${name}" but it is not defined`));
const privacy = documents.get("privacy") ?? fail("the privacy policy was not found");

const target = new URL("../src/content/guide.generated.json", import.meta.url);
writeFileSync(target, JSON.stringify({ source: sourcePath, guide, privacy }, null, 2) + "\n");
console.log(`Wrote ${guide.length} guide pages and the privacy policy from ${sourcePath}.`);
