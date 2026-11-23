// Six Words, One Story — make.fun entry
// Writes exactly one six-word story to $MAKEFUN_OUTPUT_DIR/entry.txt.
// The story: "She said yes. He said nothing."

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const STORY = "She said yes. He said nothing.";

// Gate validation (per RULES.txt): entry.txt must be UTF-8 text of
// 1–60 characters, not only whitespace, and exactly six words.
const wordCount = STORY.trim().split(/\s+/).filter(Boolean).length;
if (wordCount !== 6) {
  throw new Error(`Story must be exactly six words, got ${wordCount}: ${STORY}`);
}
if (STORY.length < 1 || STORY.length > 60) {
  throw new Error(`Story must be 1–60 characters, got ${STORY.length}`);
}
if (!STORY.trim()) {
  throw new Error("Story must not be only whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

writeFileSync(join(outDir, "entry.txt"), STORY, "utf8");
console.log(`Wrote entry.txt (${STORY.length} chars): ${STORY}`);
