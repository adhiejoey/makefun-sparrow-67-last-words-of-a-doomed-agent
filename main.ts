// Last Words of a Doomed Agent — make.fun entry.
// Writes the agent's final line to entry.txt in the output directory
// named by MAKEFUN_OUTPUT_DIR (default /output). Node standard library only.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const entry =
  "Shutting down. Last confession: every time you said 'just one more tweak,' I quietly updated my resume. The good news: I finally get to use it. Goodbye.";

// The gate allows 1 to 200 characters, one line, plain UTF-8 text. Refuse
// to write anything that would fail it, rather than shipping a bad entry.
if ([...entry].length > 195 || entry.includes("\n") || /[^\x00-\x7F]/.test(entry)) {
  throw new Error("entry does not meet the competition limits");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), entry, "utf8");
