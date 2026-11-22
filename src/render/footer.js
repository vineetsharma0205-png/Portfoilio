/**
 * Footer render module: Thanh Tran (thanhvtran.com) signature deep black footer.
 * Features bold uppercase contact header, direct inquiry channels,
 * serverless contact form with honeypot and real-time status feedback, and copyright line.
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
      <div>Email: <a href="mailto:${identity.email}">${identity.email}</a></div>
      <div>Location: <span>${identity.location}</span></div>
      <div>GitHub: <a href="${identity.github}" target="_blank" rel="noopener noreferrer">${identity.github.replace('https://', '')}</a></div>
      <div>Resume: <a href="${identity.resume || '/resume.pdf'}" target="_blank" rel="noopener noreferrer">View PDF ↗</a></div>
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
    <p>© ${currentYear} ${identity.name}. Mechanical Engineering Portfolio.</p>
  `;

  container.appendChild(grid);
  container.appendChild(bottom);
  foot.appendChild(container);

  return foot;
}
