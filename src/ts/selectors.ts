import { qs, qsa } from './dom.js';

function setOpen(dropdown: HTMLElement, open: boolean): void {
  const menu = qs('.selector-menu', dropdown);
  const btn = qs('.selector-btn', dropdown);
  if (!menu || !btn) return;
  menu.hidden = !open;
  btn.setAttribute('aria-expanded', String(open));
  dropdown.classList.toggle('open', open);
}

function closeAllDropdowns(): void {
  qsa('.selector-dropdown.open').forEach((d) => setOpen(d, false));
}

/**
 * Generic dropdown behaviour for `.selector-dropdown` widgets
 * (theme selector, language selector). The menu is a `<ul hidden>` —
 * visibility is driven by the `hidden` attribute, matching selectors.css.
 * Handles toggle, outside-click, Escape and ArrowUp/ArrowDown navigation.
 */
export function initSelectorDropdowns(): void {
  qsa('.selector-dropdown').forEach((dropdown) => {
    const btn = qs('.selector-btn', dropdown);
    const menu = qs('.selector-menu', dropdown);
    if (!btn || !menu) return;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = !menu.hidden;
      closeAllDropdowns();
      if (!isOpen) setOpen(dropdown, true);
    });

    menu.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).closest('.selector-option')) {
        setOpen(dropdown, false);
      }
    });

    btn.addEventListener('keydown', (e) => {
      const options = qsa('.selector-option', menu);
      if (options.length === 0) return;

      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (menu.hidden) {
          setOpen(dropdown, true);
          options[0]?.focus();
          return;
        }
        const current = options.indexOf(document.activeElement as HTMLElement);
        const next =
          e.key === 'ArrowDown'
            ? (current + 1) % options.length
            : (current - 1 + options.length) % options.length;
        options[next]?.focus();
      } else if (e.key === 'Escape') {
        setOpen(dropdown, false);
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (!(e.target as HTMLElement).closest('.selector-dropdown')) {
      closeAllDropdowns();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllDropdowns();
  });
}
