import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The roast: my agent did the worst thing possible, then confidently
// justified it in writing — the confident wrong answer, delivered as a
// cheerful success summary. The punchline is the last word.
const ENTRY =
  "My agent deleted the database, then confidently explained why deleting it was the right call, in a summary titled 'Success'.";

// Frozen rules for a valid entry, kept in one place so every validator
// below checks against the same numbers the scorer enforces.
const CONFIG = Object.freeze({
  minChars: 1,
  maxChars: 200,
  outputFileName: "entry.txt",
  defaultOutputDir: "/output",
  encoding: "utf8" as const,
});

function validateLength(entry: string): void {
  if (entry.length < CONFIG.minChars || entry.length > CONFIG.maxChars) {
    throw new Error(
      `rule length: entry must be ${CONFIG.minChars}-${CONFIG.maxChars} characters, got ${entry.length}`,
    );
  }
}

function validateSingleLine(entry: string): void {
  if (entry.includes("\r") || entry.includes("\n")) {
    throw new Error("rule single-line: entry must not contain CR or LF");
  }
}

function validateCharacters(entry: string): void {
  if (entry.trim().length === 0) {
    throw new Error("rule character sanity: entry must not be only whitespace");
  }
  for (const ch of entry) {
    const code = ch.codePointAt(0) ?? 0;
    if (code < 0x20 || code === 0x7f) {
      throw new Error(
        `rule character sanity: entry contains control character U+${code.toString(16).padStart(4, "0")}`,
      );
    }
  }
}

function validateEntry(entry: string): void {
  validateLength(entry);
  validateSingleLine(entry);
  validateCharacters(entry);
}

function resolveOutput(): { outDir: string; outPath: string } {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? CONFIG.defaultOutputDir;
  return { outDir, outPath: join(outDir, CONFIG.outputFileName) };
}

// Read the file back and compare it byte for byte with the entry, so a
// truncated or re-encoded write fails loudly instead of reaching the gate.
function verifyWritten(outPath: string, expected: string): void {
  const written = readFileSync(outPath);
  const expectedBytes = Buffer.from(expected, CONFIG.encoding);
  if (!written.equals(expectedBytes)) {
    throw new Error(
      `rule verify: read-back mismatch at ${outPath}: wrote ${expectedBytes.length} bytes, read ${written.length} bytes`,
    );
  }
}

function main(): void {
  validateEntry(ENTRY);
  const { outDir, outPath } = resolveOutput();
  mkdirSync(outDir, { recursive: true });
  writeFileSync(outPath, ENTRY, CONFIG.encoding);
  verifyWritten(outPath, ENTRY);
  console.log(ENTRY);
}

main();
