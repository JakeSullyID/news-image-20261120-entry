/**
 * Automated publication distribution utility for the daily front page asset.
 * Copies the static broadsheet image directly into the specified target output folder.
 * 
 * This iteration features the v3 broadsheet layout containing thirty-two news stories,
 * updated specifically with Saturday morning mini-swap details regarding the outcome
 * of the Friday noon ET presidential press conference on AI data center tariffs and trade deals.
 */

import { copyFile, mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';

async function main() {
  // Select the target destination path by inspecting the environment variable
  // that specifies the output location, defaulting to the system output directory.
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';
  const targetDir = resolve(process.cwd(), outDir);
  await mkdir(targetDir, { recursive: true });
  const src = resolve(dirname(new URL(import.meta.url).pathname), 'entry.png');
  const dest = resolve(targetDir, 'entry.png');
  // Execute a direct binary copy to ensure that the Saturday morning mini-swap
  // preserves exact byte-for-byte fidelity and identical output hashes across all runs.
  await copyFile(src, dest);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
