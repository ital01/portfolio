import { qs, qsa } from './dom.js';
import { t, THEME_LABEL_KEYS, type Theme } from './i18n.js';

const THEME_STORAGE_KEY = 'portfolio-theme';
const THEMES: Theme[] = ['light', 'dark', 'auto'];

function getPreferredTheme(): Theme {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored && THEMES.includes(stored as Theme)) return stored as Theme;
  } catch {
    /* storage unavailable */
  }
  return 'auto';
}

function syncThemeButton(theme: Theme): void {
  document.documentElement.setAttribute('data-theme', theme);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    /* storage unavailable */
  }

  qsa('.theme-menu [data-theme]').forEach((option) => {
    const isActive = option.dataset.theme === theme;
    option.classList.toggle('active', isActive);
    option.setAttribute('aria-selected', String(isActive));
  });

  const selected = qs(`.theme-menu [data-theme="${theme}"]`);
  const btnIcon = qs('.theme-selector .selector-btn-icon');
  const themeName = qs('#theme-name');

  if (btnIcon && selected) {
    const icon = selected.querySelector('.selector-option-icon');
    if (icon) btnIcon.innerHTML = icon.innerHTML;
  }
  if (themeName) themeName.textContent = t(THEME_LABEL_KEYS[theme]);
}

export function setTheme(theme: Theme): void {
  syncThemeButton(theme);
}

export function initTheme(): void {
  qsa('.theme-menu [data-theme]').forEach((option) => {
    option.addEventListener('click', () => {
      const theme = option.dataset.theme as Theme | undefined;
      if (theme) setTheme(theme);
    });
  });

  setTheme(getPreferredTheme());
}
