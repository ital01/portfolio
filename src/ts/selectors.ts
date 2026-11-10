import { qsa } from './dom.js';

function closeDropdown(dropdown: HTMLElement): void {
  dropdown.classList.remove('open');
  const btn = dropdown.querySelector<HTMLElement>('.selector-btn');
  btn?.setAttribute('aria-expanded', 'false');
}

function closeAllDropdowns(): void {
  qsa('.selector-dropdown.open').forEach(closeDropdown);
}

/**
 * Generic dropdown behaviour for `.selector-dropdown` widgets
 * (theme selector, language selector). Handles toggle, outside-click,
 * Escape and ArrowUp/ArrowDown keyboard navigation.
 */
export function initSelectorDropdowns(): void {
  qsa('.selector-dropdown').forEach((dropdown) => {
    const btn = dropdown.querySelector<HTMLElement>('.selector-btn');
    const menu = dropdown.querySelector<HTMLElement>('.selector-menu');
    if (!btn || !menu) return;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dropdown.classList.contains('open');
      closeAllDropdowns();
      if (!isOpen) {
        dropdown.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });

    menu.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).closest('.selector-option')) {
        closeDropdown(dropdown);
      }
    });

    btn.addEventListener('keydown', (e) => {
      const options = qsa('.selector-option', menu);
      if (options.length === 0) return;

      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (!dropdown.classList.contains('open')) {
          dropdown.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
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
        closeDropdown(dropdown);
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
