/**
 * Project Card Web Component
 * Displays a single project with title, description, tech stack, and badges
 */
class ProjectCard extends HTMLElement {
  static get observedAttributes() {
    return [
      'title',
      'description',
      'badgeText',
      'techStack',
      'linkUrl',
      'linkTitle'
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
      
      // Add animation class
      setTimeout(() => {
        this.classList.add('animate-on-scroll');
      }, 100);
    }
  }

  render() {
    const title = this.getAttribute('title') || '';
    const description = this.getAttribute('description') || '';
    const badgeText = this.getAttribute('badgeText') || '';
    const techStack = this.getAttribute('techStack') || '';
    const linkUrl = this.getAttribute('linkUrl');
    const linkTitle = this.getAttribute('linkTitle');

    // Build HTML structure
    let html = `
      <article class="card-project">
        <div class="project-header">
          ${badgeText ? `<span class="badge-status">${this.escapeHtml(badgeText)}</span>` : ''}
          <h3 class="project-title">${this.escapeHtml(title)}</h3>
        </div>
        
        ${description ? `<p class="project-text">${this.escapeHtml(description)}</p>` : ''}
        
        ${techStack ? this.renderTechTags(techStack) : ''}
      </article>
    `;

    // Add link if provided
    if (linkUrl && linkTitle) {
      html = html.replace(/<\/article>/, `
        <div class="project-link">
          <a href="${this.escapeUrl(linkUrl)}" 
             target="_blank" 
             rel="noopener noreferrer"
             class="btn btn-secondary"
             aria-label="${linkTitle}">
            ${this.escapeHtml(linkTitle)}
          </a>
        </div>
      </article>`);
    }

    this.innerHTML = html;

    // Initialize tech tags
    this.querySelectorAll('.tech-tags .tag').forEach(tag => {
      tag.classList.add('fade-in');
    });
  }

  renderTechTags(techStack) {
    const tags = techStack.split(',').map(t => t.trim());
    
    return `
      <div class="tech-tags">
        ${tags.map(tag => `
          <span class="tag">${this.escapeHtml(tag)}</span>
        `).join('')}
      </div>
    `;
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  escapeUrl(url) {
    try {
      // Basic URL escaping - for production use proper URL validation
      return url.replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    } catch (e) {
      return '#';
    }
  }

  disconnectedCallback() {
    this._connected = false;
  }
}

// Custom element registration
if (typeof customElements !== 'undefined' && !customElements.get('project-card')) {
  customElements.define('project-card', ProjectCard);
  
  if (!window.ProjectCard) {
    window.ProjectCard = ProjectCard;
  }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ProjectCard;
}

export default ProjectCard;
