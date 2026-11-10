/**
 * Language Selector Web Component
 * Provides language switching functionality for the portfolio
 */
class LanguageSelector extends HTMLElement {
  static get observedAttributes() {
    return ['locale'];
  }

  constructor() {
    super();
    this._connected = false;
    this.init();
  }

  init() {
    // Initialize on connect
    this.addEventListener('connectedtarget', () => {
      if (!this._connected) {
        this._connected = true;
        this.setupEventListeners();
      }
    });

    this.setupEventListeners();
  }

  setupEventListeners() {
    const buttons = this.querySelectorAll('.language-toggle-btn');
    
    buttons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = btn.dataset.lang;
        
        // Update internal state
        this.setLocale(lang);
        
        // Visual feedback
        this.updateActiveState(btn);
      });
    });

    // Setup mobile language selector
    const mobileSelector = this.querySelector('.mobile-language-selector');
    if (mobileSelector) {
      const links = mobileSelector.querySelectorAll('a');
      
      links.forEach(link => {
        link.addEventListener('click', () => {
          this.setLocale(link.dataset.lang);
        });
      });
    }
  }

  setLocale(locale) {
    // Store in window for external access
    window.portfolioI18n?.setLocale?.(locale);
    
    // Update internal attribute
    this.setAttribute('locale', locale);
  }

  updateActiveState(activeBtn) {
    const buttons = this.querySelectorAll('.language-toggle-btn');
    
    buttons.forEach(btn => {
      btn.classList.toggle('active', btn === activeBtn);
    });
  }

  getLocale() {
    return this.getAttribute('locale') || 'pt-BR';
  }

  connectedCallback() {
    if (!this._connected) {
      this._connected = true;
      this.setupEventListeners();
      
      // Restore locale from localStorage
      const savedLocale = window.localStorage.getItem('portfolio-locale');
      if (savedLocale) {
        this.setLocale(savedLocale);
      }
    }
  }

  disconnectedCallback() {
    this._connected = false;
  }
}

// Custom element registration
if (typeof customElements !== 'undefined' && !customElements.get('language-selector')) {
  customElements.define('language-selector', LanguageSelector);
  
  // Fallback for non-custom-elements environments
  if (!window.LanguageSelector) {
    window.LanguageSelector = LanguageSelector;
  }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = LanguageSelector;
}

export default LanguageSelector;
