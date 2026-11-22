/**
 * Footer render module: Super Eight Studio exact Stone Footer with
 * Interactive Multi-Timezone Live Clock, Contact Form, and Studio Credits.
 */

export function renderFooter({ footer, identity, contact }) {
  const foot = document.createElement('footer');
  foot.className = 'site-footer';

  const container = document.createElement('div');
  container.className = 'container';

  const topGrid = document.createElement('div');
  topGrid.className = 'footer-top-grid';

  // 1. Left Column: Multi-Timezone Live Clock & Direct Channels
  const leftCol = document.createElement('div');
  leftCol.style.display = 'flex';
  leftCol.style.flexDirection = 'column';
  leftCol.style.gap = 'var(--space-4)';

  // Live Clock Card
  const clockCard = document.createElement('div');
  clockCard.className = 'live-clock-card';
  clockCard.innerHTML = `
    <div class="clock-header">
      <span>● LIVE TIMEZONE TELEMETRY</span>
      <span id="active-utc-offset">UTC+5:30</span>
    </div>
    <div>
      <div class="clock-display" id="live-clock-val">--:--:--</div>
      <div class="clock-city-name font-serif" id="active-city-name">Hyderabad, India</div>
    </div>
    <div class="timezone-pill-selector">
      <button type="button" class="tz-pill-btn is-active" data-tz="Asia/Kolkata" data-city="Hyderabad, India" data-offset="UTC+5:30">HYD</button>
      <button type="button" class="tz-pill-btn" data-tz="Asia/Kolkata" data-city="New Delhi, India" data-offset="UTC+5:30">DEL</button>
      <button type="button" class="tz-pill-btn" data-tz="Europe/London" data-city="London, UK" data-offset="UTC+0">LON</button>
      <button type="button" class="tz-pill-btn" data-tz="America/New_York" data-city="New York, USA" data-offset="UTC-5">NYC</button>
      <button type="button" class="tz-pill-btn" data-tz="America/Los_Angeles" data-city="San Francisco, USA" data-offset="UTC-8">SFO</button>
    </div>
  `;

  // Channels Block
  const channels = document.createElement('div');
  channels.style.display = 'flex';
  channels.style.flexDirection = 'column';
  channels.style.gap = 'var(--space-2)';
  channels.innerHTML = `
    <div style="font-family: var(--font-sans); font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted);">Direct Inquiries</div>
    <div style="font-family: var(--font-mono); font-size: var(--text-sm);">
      <a href="mailto:${identity.email}" style="color: var(--ink); font-weight: 600; text-decoration: underline;">${identity.email}</a>
    </div>
    <div style="font-family: var(--font-mono); font-size: var(--text-sm);">
      <a href="${identity.github}" target="_blank" rel="noopener noreferrer" style="color: var(--muted);">${identity.github.replace('https://', '')}</a>
    </div>
  `;

  leftCol.appendChild(clockCard);
  leftCol.appendChild(channels);
  topGrid.appendChild(leftCol);

  // 2. Right Column: Contact Form
  if (contact && contact.formEnabled) {
    const rightCol = document.createElement('div');
    rightCol.innerHTML = `
      <form class="footer-contact-form" id="contact-form" novalidate>
        <div style="font-family: var(--font-sans); font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted);">Transmit Message</div>
        <input type="text" name="name" class="s8-input" placeholder="Your Name" required minlength="2" maxlength="80">
        <input type="email" name="email" class="s8-input" placeholder="Email Address" required maxlength="120">
        <div class="form-hp" aria-hidden="true" style="display: none;">
          <input type="text" name="website" tabindex="-1" autocomplete="off">
        </div>
        <textarea name="message" class="s8-textarea" placeholder="Tell me about the engineering challenge, internship role, or project..." required minlength="10" maxlength="2000"></textarea>
        <div class="form-status" role="status" aria-live="polite"></div>
        <button type="submit" class="btn-s8-submit">
          <span>TRANSMIT MESSAGE</span>
          <span aria-hidden="true" style="margin-left: 0.5rem;">↗</span>
        </button>
      </form>
    `;
    topGrid.appendChild(rightCol);
  }

  // 3. Bottom Bar
  const bottomBar = document.createElement('div');
  bottomBar.className = 'footer-bottom-bar';
  const currentYear = new Date().getFullYear();
  bottomBar.innerHTML = `
    <div>© ${currentYear} ${identity.name}. Mechanical Engineering Portfolio.</div>
    <div>Design Architecture: Super Eight Studio Re-creation</div>
  `;

  container.appendChild(topGrid);
  container.appendChild(bottomBar);
  foot.appendChild(container);

  // Wire up Live Clock Logic
  let activeTimeZone = 'Asia/Kolkata';

  function updateClock() {
    const clockEl = foot.querySelector('#live-clock-val');
    if (!clockEl) return;
    try {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-GB', {
        timeZone: activeTimeZone,
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      clockEl.textContent = timeStr;
    } catch {
      clockEl.textContent = new Date().toTimeString().split(' ')[0];
    }
  }

  setInterval(updateClock, 1000);
  setTimeout(updateClock, 50);

  // Timezone switch pills
  foot.querySelectorAll('.tz-pill-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      foot.querySelectorAll('.tz-pill-btn').forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      activeTimeZone = btn.getAttribute('data-tz') || 'Asia/Kolkata';
      const city = btn.getAttribute('data-city') || 'Hyderabad, India';
      const offset = btn.getAttribute('data-offset') || 'UTC+5:30';

      const cityEl = foot.querySelector('#active-city-name');
      const offsetEl = foot.querySelector('#active-utc-offset');
      if (cityEl) cityEl.textContent = city;
      if (offsetEl) offsetEl.textContent = offset;

      updateClock();
    });
  });

  return foot;
}
