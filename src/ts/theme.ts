import { qs, qsa } from './dom.js';
import { t, THEME_LABEL_KEYS, type Theme } from './i18n.js';

const THEME_STORAGE_KEY = 'portfolio-theme';
const THEMES: Theme[] = ['light', 'dark', 'auto'];
const DROPDOWN = '#theme-selector';

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

  const dropdown = qs(DROPDOWN);
  if (!dropdown) return;

  qsa('.selector-option[data-theme-value]', dropdown).forEach((option) => {
    const isActive = option.dataset.themeValue === theme;
    option.classList.toggle('active', isActive);
    option.setAttribute('aria-selected', String(isActive));
  });

  const selected = qs(`.selector-option[data-theme-value="${theme}"]`, dropdown);
  const icon = qs('#theme-icon');
  const optionIcon = selected ? qs('.option-icon', selected) : null;
  if (icon && optionIcon) icon.innerHTML = optionIcon.innerHTML;

  const themeName = qs('#theme-name');
  if (themeName) themeName.textContent = t(THEME_LABEL_KEYS[theme]);
}

export function setTheme(theme: Theme): void {
  syncThemeButton(theme);
}

export function initTheme(): void {
  const dropdown = qs(DROPDOWN);
  if (!dropdown) return;

  qsa('.selector-option[data-theme-value]', dropdown).forEach((option) => {
    option.addEventListener('click', () => {
      const theme = option.dataset.themeValue as Theme | undefined;
      if (theme) setTheme(theme);
    });
  });

  setTheme(getPreferredTheme());
}
