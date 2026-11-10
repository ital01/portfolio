/**
 * Theme Toggle Web Component
 * Manages light/dark/auto theme switching with localStorage persistence
 */
class ThemeToggle extends HTMLElement {
  static get observedAttributes() {
    return ['theme'];
  }

  constructor() {
    super();
    this._connected = false;
    this.init();
  }

  init() {
    this.addEventListener('connectedtarget', () => {
      if (!this._connected) {
        this._connected = true;
        this.applyTheme(this.getInitialTheme());
      }
    });

    // Apply theme on connect
    setTimeout(() => {
      if (this._connected) {
        this.applyTheme(this.getInitialTheme());
      }
    }, 0);
  }

  getInitialTheme() {
    // Check system preference first
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Check localStorage for user preference
    const savedTheme = window.localStorage.getItem('portfolio-theme');
    
    if (savedTheme) return savedTheme;
    if (savedTheme === 'auto') {
      return prefersDark ? 'dark' : 'light';
    }
    return 'auto';
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update button states
    const buttons = this.querySelectorAll('.theme-toggle-btn');
    buttons.forEach(btn => {
      const btnTheme = btn.dataset.themeValue;
      
      if (btnTheme === theme || (theme === 'auto' && btnTheme === 'auto')) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Save preference to localStorage
    window.localStorage.setItem('portfolio-theme', theme);
  }

  toggleTheme() {
    const current = this.getAttribute('theme') || 'auto';
    
    const themes = ['light', 'dark', 'auto'];
    const currentIndex = themes.indexOf(current);
    const nextIndex = (currentIndex + 1) % themes.length;
    
    this.setTheme(themes[nextIndex]);
  }

  setTheme(theme) {
    this.setAttribute('theme', theme);
    this.applyTheme(theme);
  }

  getActiveTheme() {
    return this.getAttribute('theme') || 'auto';
  }

  connectedCallback() {
    if (!this._connected) {
      this._connected = true;
      this.setupEventListeners();
      
      // Restore from localStorage or system preference
      const savedTheme = window.localStorage.getItem('portfolio-theme');
      if (savedTheme) {
        this.setTheme(savedTheme);
      } else {
        this.applyTheme(this.getInitialTheme());
      }
    }
  }

  setupEventListeners() {
    const buttons = this.querySelectorAll('.theme-toggle-btn');
    
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.setTheme(btn.dataset.themeValue);
      });
    });

    // Listen for system theme changes when on 'auto'
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (this.getAttribute('theme') === 'auto') {
        this.applyTheme(e.matches ? 'dark' : 'light');
      }
    });

    // Listen for reduced motion preference
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', () => {
      document.documentElement.dataset.reducedMotion = 
        window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'reduce' : 'default';
    });
  }

  disconnectedCallback() {
    this._connected = false;
  }
}

// Custom element registration
if (typeof customElements !== 'undefined' && !customElements.get('theme-toggle')) {
  customElements.define('theme-toggle', ThemeToggle);
  
  if (!window.ThemeToggle) {
    window.ThemeToggle = ThemeToggle;
  }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ThemeToggle;
}

export default ThemeToggle;
