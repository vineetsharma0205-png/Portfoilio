/**
 * Contact render module: direct communication channels, links,
 * and optional contact form.
 */

export function renderContact({ contact, identity }, indexString = '06') {
  const section = document.createElement('section');
  section.className = 'section-wrapper reveal';
  section.id = 'contact';

  const container = document.createElement('div');
  container.className = 'container';

  // Section header
  const header = document.createElement('header');
  header.className = 'section-header';
  header.innerHTML = `
    <span class="section-tag">${indexString} / Contact</span>
    <h2 class="section-title">${contact.heading || 'Get in touch'}</h2>
  `;

  const layout = document.createElement('div');
  layout.className = 'contact-layout';

  // Contact Info (Direct communication channels)
  const infoCol = document.createElement('div');
  infoCol.className = 'contact-info';

  const text = document.createElement('p');
  text.className = 'contact-text';
  text.textContent = contact.text;
  infoCol.appendChild(text);

  const channels = document.createElement('div');
  channels.className = 'contact-channels';

  // Email (Always present)
  if (identity.email && identity.email.trim() !== '') {
    const row = document.createElement('div');
    row.className = 'contact-channel-row';
    row.innerHTML = `
      <span class="contact-channel-label font-mono">Email:</span>
      <a href="mailto:${identity.email}" class="contact-channel-val font-mono">${identity.email}</a>
    `;
    channels.appendChild(row);
  }

  // GitHub (Only rendered if present)
  if (identity.github && identity.github.trim() !== '') {
    const row = document.createElement('div');
    row.className = 'contact-channel-row';
    const displayGh = identity.github.replace(/^https?:\/\/(www\.)?github\.com\//, 'github.com/');
    row.innerHTML = `
      <span class="contact-channel-label font-mono">GitHub:</span>
      <a href="${identity.github}" target="_blank" rel="noopener noreferrer" class="contact-channel-val font-mono">${displayGh}</a>
    `;
    channels.appendChild(row);
  }

  // LinkedIn (Only rendered if non-empty)
  if (identity.linkedin && identity.linkedin.trim() !== '') {
    const row = document.createElement('div');
    row.className = 'contact-channel-row';
    row.innerHTML = `
      <span class="contact-channel-label font-mono">LinkedIn:</span>
      <a href="${identity.linkedin}" target="_blank" rel="noopener noreferrer" class="contact-channel-val font-mono">Profile Link</a>
    `;
    channels.appendChild(row);
  }

  // Phone (Only rendered if non-empty)
  if (identity.phone && identity.phone.trim() !== '') {
    const row = document.createElement('div');
    row.className = 'contact-channel-row';
    row.innerHTML = `
      <span class="contact-channel-label font-mono">Phone:</span>
      <a href="tel:${identity.phone}" class="contact-channel-val font-mono">${identity.phone}</a>
    `;
    channels.appendChild(row);
  }

  // Location
  if (identity.location && identity.location.trim() !== '') {
    const row = document.createElement('div');
    row.className = 'contact-channel-row';
    row.innerHTML = `
      <span class="contact-channel-label font-mono">Location:</span>
      <span class="font-mono">${identity.location}</span>
    `;
    channels.appendChild(row);
  }

  infoCol.appendChild(channels);
  layout.appendChild(infoCol);

  // Contact Form (if formEnabled is true)
  if (contact.formEnabled) {
    const formContainer = document.createElement('div');
    formContainer.className = 'contact-form-container';

    const form = document.createElement('form');
    form.className = 'contact-form';
    form.id = 'contact-form';
    form.noValidate = true;

    form.innerHTML = `
      <div class="form-group">
        <label for="contact-name" class="form-label">
          <span>Name</span>
          <span class="form-label-hint">2–80 chars</span>
        </label>
        <input type="text" id="contact-name" name="name" class="form-input" required minlength="2" maxlength="80" autocomplete="name" placeholder="Full name">
      </div>

      <div class="form-group">
        <label for="contact-email" class="form-label">
          <span>Email Address</span>
          <span class="form-label-hint">Reply destination</span>
        </label>
        <input type="email" id="contact-email" name="email" class="form-input" required maxlength="120" autocomplete="email" placeholder="name@institution.edu">
      </div>

      <!-- Honeypot anti-spam field -->
      <div class="form-hp" aria-hidden="true">
        <label for="contact-website">Leave blank</label>
        <input type="text" id="contact-website" name="website" tabindex="-1" autocomplete="off">
      </div>

      <div class="form-group">
        <label for="contact-message" class="form-label">
          <span>Message</span>
          <span class="form-label-hint">Technical inquiry or note</span>
        </label>
        <textarea id="contact-message" name="message" class="form-textarea" required minlength="10" maxlength="2000" placeholder="Scope, requirements, or discussion points..."></textarea>
      </div>

      <div class="form-status" role="status" aria-live="polite"></div>

      <button type="submit" class="btn btn-primary">
        <span>Transmit message</span>
        <span aria-hidden="true">→</span>
      </button>
    `;

    formContainer.appendChild(form);
    layout.appendChild(formContainer);
  }

  container.appendChild(header);
  container.appendChild(layout);
  section.appendChild(container);

  return section;
}
