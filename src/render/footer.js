/**
 * Footer render module: Compact deep black contact footer.
 * Features hyperlinked symbols for email, github, and resume,
 * location without the word 'Location', and serverless contact form.
 */

export function renderFooter({ footer, identity, contact }) {
  const foot = document.createElement('footer');
  foot.className = 'site-footer-thanh';
  foot.id = 'contact';

  const container = document.createElement('div');
  container.className = 'container';

  const grid = document.createElement('div');
  grid.className = 'footer-thanh-grid';

  // Left Column: Contact Channels & Inquiries
  const leftCol = document.createElement('div');
  const contactText = (contact && contact.text) ||
    'I am looking for internship and collaboration conversations in mechanical design, structural analysis, and electromechanical prototyping. Feel free to reach out directly or send a message.';

  leftCol.innerHTML = `
    <h2 class="footer-thanh-title">CONTACT</h2>
    <p class="footer-thanh-lead">${contactText}</p>
    <div class="footer-links-list">
      <div class="footer-link-item">
        <svg class="footer-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
        </svg>
        <span>${identity.location}</span>
      </div>
      <div class="footer-link-item">
        <a href="mailto:${identity.email}" class="footer-symbol-link" aria-label="Email ${identity.email}">
          <svg class="footer-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          <span>${identity.email}</span>
        </a>
      </div>
      <div class="footer-link-item">
        <a href="${identity.github}" target="_blank" rel="noopener noreferrer" class="footer-symbol-link" aria-label="GitHub Profile">
          <svg class="footer-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          <span>${identity.github.replace('https://', '')}</span>
        </a>
      </div>
      <div class="footer-link-item">
        <a href="${identity.resume || '/resume.pdf'}" target="_blank" rel="noopener noreferrer" class="footer-symbol-link" aria-label="Download Resume PDF">
          <svg class="footer-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
          </svg>
          <span>Resume ↗</span>
        </a>
      </div>
    </div>
  `;

  // Right Column: Interactive Contact Form
  const rightCol = document.createElement('div');
  rightCol.innerHTML = `
    <form class="footer-form-thanh" id="contact-form" novalidate>
      <input type="text" name="name" class="thanh-input" placeholder="Your Name" required minlength="2" maxlength="80">
      <input type="email" name="email" class="thanh-input" placeholder="Your Email Address" required maxlength="120">
      <div class="form-hp" aria-hidden="true" style="display: none;">
        <input type="text" name="website" tabindex="-1" autocomplete="off">
      </div>
      <textarea name="message" class="thanh-textarea" placeholder="Your message / project inquiry..." required minlength="10" maxlength="2000"></textarea>
      <div class="form-status" role="status" aria-live="polite"></div>
      <button type="submit" class="btn-thanh-submit">
        <span>SEND MESSAGE</span>
        <span aria-hidden="true" style="margin-left: 0.5rem;">→</span>
      </button>
    </form>
  `;

  grid.appendChild(leftCol);
  grid.appendChild(rightCol);

  // Bottom Copyright Strip
  const bottom = document.createElement('div');
  bottom.className = 'footer-thanh-bottom';
  const currentYear = new Date().getFullYear();
  bottom.innerHTML = `
    <p>© ${currentYear} ${identity.name}.</p>
  `;

  container.appendChild(grid);
  container.appendChild(bottom);
  foot.appendChild(container);

  return foot;
}
