#!/usr/bin/env bun
/**
 * Build script — assembles the static site from sources.
 *
 *   src/index.html + src/partials/**  ->  index.html
 *   src/styles/*.css (ordered)        ->  index.css
 *   src/ts/main.ts (bundled)          ->  main.js
 *
 * Usage: bun build.ts  (or: bun run build)
 */

import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { $ } from 'bun';

const ROOT = import.meta.dir;
const SRC = join(ROOT, 'src');
const PARTIALS_DIR = join(SRC, 'partials');

const INCLUDE_RE = /^[ \t]*<!--[ \t]*@include[ \t]+([^\s>]+)[ \t]*-->[ \t]*$/;

function resolvePartial(name: string): string {
  const file = join(PARTIALS_DIR, `${name}.html`);
  if (!existsSync(file)) {
    throw new Error(`Partial not found: ${name} (expected ${file})`);
  }
  return file;
}

function renderTemplate(template: string): string {
  return template
    .split('\n')
    .map((line) => {
      const match = line.match(INCLUDE_RE);
      if (!match) return line;
      const content = readFileSync(resolvePartial(match[1]), 'utf8').replace(/\n+$/, '');
      return renderTemplate(content);
    })
    .join('\n');
}

async function buildHtml(): Promise<void> {
  const template = await Bun.file(join(SRC, 'index.html')).text();
  await Bun.write(join(ROOT, 'index.html'), renderTemplate(template));
  console.log('  index.html  <- src/index.html + partials');
}

// Order matters: this must match the original cascade order.
const CSS_ORDER = [
  'tokens',
  'base',
  'header',
  'buttons',
  'hero',
  'methodology',
  'projects',
  'about',
  'experience',
  'contact',
  'footer',
  'responsive',
  'selectors',
];

async function buildCss(): Promise<void> {
  const chunks = CSS_ORDER.map((name) => {
    const file = join(SRC, 'styles', `${name}.css`);
    if (!existsSync(file)) {
      throw new Error(`Stylesheet not found: ${file})`);
    }
    return readFileSync(file, 'utf8').replace(/\n+$/, '');
  });
  await Bun.write(join(ROOT, 'index.css'), `${chunks.join('\n\n')}\n`);
  console.log(`  index.css   <- ${CSS_ORDER.length} stylesheets`);
}

async function buildJs(): Promise<void> {
  const result = await Bun.build({
    entrypoints: [join(SRC, 'ts', 'main.ts')],
    outdir: ROOT,
    naming: '[name].js',
    format: 'esm',
    target: 'browser',
  });
  if (!result.success) {
    for (const log of result.logs) console.error(log);
    process.exit(1);
  }
  console.log('  main.js     <- src/ts (bundled)');
}

async function typecheck(): Promise<void> {
  const proc = Bun.spawnSync([join(ROOT, 'node_modules', '.bin', 'tsc'), '--noEmit', '-p', join(ROOT, 'tsconfig.json')]);
  if (proc.exitCode !== 0) {
    process.exit(proc.exitCode ?? 1);
  }
}

console.log('Building portfolio...');
await typecheck();
await buildHtml();
await buildCss();
await buildJs();
console.log('Done.');
