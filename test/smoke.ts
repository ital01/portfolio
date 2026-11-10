/**
 * Smoke test: loads index.html into happy-dom, runs the bundled main.js,
 * and exercises the theme/language dropdowns like a real browser would.
 * Run: bun test/smoke.ts
 */

import { Window } from 'happy-dom';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = join(import.meta.dir, '..');
const html = readFileSync(join(ROOT, 'index.html'), 'utf8');

const window = new Window({ url: 'http://localhost:8765/' });

// Expose browser globals before importing the bundle.
const g = globalThis as Record<string, unknown>;
for (const key of [
  'window', 'document', 'navigator', 'localStorage', 'location',
  'history', 'HTMLElement', 'Element', 'Node', 'CustomEvent',
  'KeyboardEvent', 'MouseEvent', 'Event', 'URLSearchParams',
]) {
  g[key] = (window as unknown as Record<string, unknown>)[key];
}
g['IntersectionObserver'] ??= class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

window.localStorage.setItem('portfolio-locale', 'pt-BR');
window.document.write(html);

// happy-dom needs the documentElement parsed; write() may leave it in body.
// Fallback: if selectors are missing, set documentElement content directly.
if (!window.document.querySelector('#theme-selector')) {
  const doc = window.document;
  doc.documentElement.innerHTML = html
    .replace(/^<!doctype html>/i, '')
    .replace(/<html[^>]*>/, '')
    .replace(/<\/html>\s*$/, '');
}

await import(join(ROOT, 'main.js'));

const doc = window.document;
const $ = <T extends Element = HTMLElement>(sel: string) => doc.querySelector<T>(sel);
const $$ = <T extends Element = HTMLElement>(sel: string) =>
  Array.from(doc.querySelectorAll<T>(sel));

let failures = 0;
function check(name: string, cond: boolean, extra = '') {
  console.log(`${cond ? 'PASS' : 'FAIL'}  ${name}${extra ? ` — ${extra}` : ''}`);
  if (!cond) failures++;
}

const themeBtn = $('#theme-btn')!;
const themeMenu = $('#theme-selector .selector-menu')!;
const langBtn = $('#lang-btn')!;
const langMenu = $('#language-selector .selector-menu')!;

check('theme menu starts hidden', (themeMenu as HTMLElement).hidden === true);
check('lang menu starts hidden', (langMenu as HTMLElement).hidden === true);

// Open theme dropdown
(themeBtn as HTMLElement).click();
check('theme menu opens on click', (themeMenu as HTMLElement).hidden === false);
check('theme btn aria-expanded', themeBtn.getAttribute('aria-expanded') === 'true');

// Select dark theme
const darkOpt = $('#theme-selector [data-theme-value="dark"]') as HTMLElement;
darkOpt.click();
check('data-theme=dark applied', doc.documentElement.getAttribute('data-theme') === 'dark');
check('theme menu closes after select', (themeMenu as HTMLElement).hidden === true);
check('dark option aria-selected', darkOpt.getAttribute('aria-selected') === 'true');
check('theme name shows Escuro', ($('#theme-name') as HTMLElement).textContent === 'Escuro');

// Open language dropdown, select English
(langBtn as HTMLElement).click();
check('lang menu opens on click', (langMenu as HTMLElement).hidden === false);
const enOpt = $('#language-selector [data-lang="en"]') as HTMLElement;
enOpt.click();
check('html lang=en', doc.documentElement.lang === 'en');
check('lang menu closes after select', (langMenu as HTMLElement).hidden === true);
check('hero title translated', ($('[data-i18n="hero-title"]') as HTMLElement).textContent?.includes('sustainable') === true);
check('lang flag synced', ($('#lang-flag') as HTMLElement).textContent === '🇺🇸');
check('theme name re-translated', ($('#theme-name') as HTMLElement).textContent === 'Dark');

// Outside click closes an open dropdown
(themeBtn as HTMLElement).click();
check('theme menu reopens', (themeMenu as HTMLElement).hidden === false);
doc.body.click();
check('outside click closes menu', (themeMenu as HTMLElement).hidden === true);

// localStorage persistence
g['localStorage'] = window.localStorage;
check('locale persisted', window.localStorage.getItem('portfolio-locale') === 'en');
check('theme persisted', window.localStorage.getItem('portfolio-theme') === 'dark');

// All data-i18n keys resolved in English (no leftover Portuguese in key spots)
const navAbout = $('[data-i18n="nav-about"]') as HTMLElement;
check('nav translated', navAbout.textContent === 'About', navAbout.textContent ?? '');

console.log(failures === 0 ? '\nAll checks passed.' : `\n${failures} check(s) FAILED.`);
process.exit(failures === 0 ? 0 : 1);
