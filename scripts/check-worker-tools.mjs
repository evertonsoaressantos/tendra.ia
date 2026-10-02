import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createCanvas } from "@napi-rs/canvas";

function probe(command, args) {
  return execFileSync(command, args, { encoding: "utf8", timeout: 10_000 });
}

const office = probe("libreoffice", ["--headless", "--version"]);
assert.match(office, /LibreOffice/);

const languages = probe("tesseract", ["--list-langs"]);
assert.match(languages, /(?:^|\n)eng(?:\n|$)/);
assert.match(languages, /(?:^|\n)por(?:\n|$)/);

const fonts = probe("fc-list", [":", "family"]);
assert.match(fonts, /DejaVu|Liberation|Carlito/);

const canvas = createCanvas(2, 2);
assert.equal(canvas.width, 2);
console.log("Worker document tools are available; ClamAV runs in an isolated service.");
