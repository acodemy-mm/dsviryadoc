#!/usr/bin/env node
/**
 * Sync design tokens from companion Figma token export into design-tokens.ts
 *
 * Usage:
 *   npm run sync:tokens
 *   npm run sync:tokens -- /path/to/tokens.json
 *
 * Default source: ../Design System /src/tokens/tokens.json (companion Storybook project)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');

const defaultSource = path.join(
  projectRoot,
  '..',
  'Design System ',
  'src',
  'tokens',
  'tokens.json'
);

const sourcePath = process.argv[2] ? path.resolve(process.argv[2]) : defaultSource;
const targetPath = path.join(projectRoot, 'src', 'lib', 'design-tokens.generated.json');

if (!fs.existsSync(sourcePath)) {
  console.warn(`[sync:tokens] Source not found: ${sourcePath}`);
  console.warn('[sync:tokens] Export tokens from Figma using the companion project: npm run sync:figma && npm run build:tokens');
  process.exit(0);
}

const tokens = JSON.parse(fs.readFileSync(sourcePath, 'utf-8'));
fs.mkdirSync(path.dirname(targetPath), { recursive: true });
fs.writeFileSync(targetPath, JSON.stringify(tokens, null, 2));

console.log(`[sync:tokens] Copied ${Object.keys(tokens).length} token groups to ${targetPath}`);
console.log('[sync:tokens] Review design-tokens.ts and merge any new values, then commit.');
