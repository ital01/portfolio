import { initI18n } from './i18n.js';
import { initTheme } from './theme.js';
import { initSelectorDropdowns } from './selectors.js';
import { initMobileMenu } from './mobile-menu.js';
import { initScrollAnimations } from './scroll-animations.js';

function main(): void {
  initI18n();
  initTheme();
  initSelectorDropdowns();
  initMobileMenu();
  initScrollAnimations();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', main);
} else {
  main();
}
