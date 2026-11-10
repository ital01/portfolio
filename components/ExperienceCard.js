/**
 * Experience Card Web Component
 * Displays a professional experience entry with company, role, period, and bullet points
 */
class ExperienceCard extends HTMLElement {
  static get observedAttributes() {
    return [
      'company',
      'role',
      'period',
      'bullets'
    ];
  }

  constructor() {
    super();
    this._connected = false;
  }

  connectedCallback() {
    if (!this._connected) {
      this._connected = true;
      this.render();
      
      // Add animation delay based on position (for timeline effect)
      const index = parseInt(this.getAttribute('index') || '0');
      setTimeout(() => {
        this.classList.add('animate-on-scroll');
        this.style.animationDelay = `${index * 0.1}s`;
      }, 50);
    }
  }

  render() {
    const company = this.getAttribute('company') || '';
    const role = this.getAttribute('role') || '';
    const period = this.getAttribute('period') || '';
    const bullets = this.getAttribute('bullets');

    // Split bullets by newlines, escape HTML
    let bulletHtml = '';
    if (bullets) {
      const bulletArray = bullets.split('\n').filter(b => b.trim());
      
      bulletHtml = bulletArray.map((bullet, index) => `
        <li>${this.escapeHtml(bullet)}</li>
      `).join('');
    }

    // Build HTML structure
    let html = `
      <article class="timeline-item">
        <div class="timeline-header">
          <div>
            <h3 class="company-name">${this.escapeHtml(company)}</h3>
            <p class="role-title">${this.escapeHtml(role)}</p>
          </div>
          <span class="timeline-period">${this.escapeHtml(period)}</span>
        </div>
        
        <ul class="timeline-list">
          ${bulletHtml || '<li class="placeholder">No experience details available</li>'}
        </ul>
      </article>
    `;

    this.innerHTML = html;
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  disconnectedCallback() {
    this._connected = false;
  }
}

// Custom element registration
if (typeof customElements !== 'undefined' && !customElements.get('experience-card')) {
  customElements.define('experience-card', ExperienceCard);
  
  if (!window.ExperienceCard) {
    window.ExperienceCard = ExperienceCard;
  }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ExperienceCard;
}

export default ExperienceCard;
