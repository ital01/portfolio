import { qs, qsa } from './dom.js';

/** Mobile navigation: burger toggle + close on link click / outside click. */
export function initMobileMenu(): void {
  const btn = qs('.mobile-menu-btn');
  const nav = qs('.mobile-nav');
  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });

  qsa('.mobile-nav a', nav).forEach((link) => {
    link.addEventListener('click', () => nav.classList.remove('open'));
  });

  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target as Node) && !btn.contains(e.target as Node)) {
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
}
