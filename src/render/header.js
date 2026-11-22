/**
 * Header render module: Super Eight Studio morphing navigation bar.
 * Features overlapping circle monogram mark, editorial navigation links,
 * rounded pill CTA, and scroll-triggered compact floating capsule state.
 */

export function renderHeader({ identity, sections = [] }) {
  const header = document.createElement('header');
  header.className = 'site-header';
  header.id = 'site-header';

  const inner = document.createElement('div');
  inner.className = 'header-inner';

  // Brand link with Super Eight overlapping circles
  const brandLink = document.createElement('a');
  brandLink.className = 'brand-link';
  brandLink.href = '#';
  brandLink.setAttribute('aria-label', `${identity.name} - Home`);
  brandLink.innerHTML = `
    <span class="brand-circles" aria-hidden="true">
      <span class="brand-circle-1"></span>
      <span class="brand-circle-2"></span>
    </span>
    <span>${identity.name}</span>
  `;

  // Center navigation menu
  const nav = document.createElement('nav');
  nav.className = 'site-nav';
  nav.setAttribute('aria-label', 'Primary');

  const sectionLabels = {
    about: 'About',
    experience: 'Experience',
    projects: 'Work',
    skills: 'Services',
    certifications: 'Certs',
    contact: 'Contact'
  };

  sections.forEach((secId) => {
    const link = document.createElement('a');
    link.className = 'nav-link';
    link.href = `#${secId}`;
    link.textContent = sectionLabels[secId] || secId;
    nav.appendChild(link);
  });

  // Right action cluster
  const actions = document.createElement('div');
  actions.className = 'header-actions';

  // Pill CTA
  const pillCta = document.createElement('a');
  pillCta.className = 'btn-pill-cta';
  pillCta.href = '#contact';
  pillCta.innerHTML = `<span>Get in touch</span><span aria-hidden="true">↗</span>`;

  // Theme toggle button
  const themeToggle = document.createElement('button');
  themeToggle.type = 'button';
  themeToggle.className = 'theme-toggle';
  themeToggle.id = 'theme-toggle-btn';
  themeToggle.textContent = '[ Mode ]';
  themeToggle.setAttribute('aria-label', 'Toggle light/dark theme');

  // Mobile menu button
  const menuToggle = document.createElement('button');
  menuToggle.type = 'button';
  menuToggle.className = 'menu-toggle';
  menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.textContent = '[ Menu ]';

  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.textContent = isOpen ? '[ Close ]' : '[ Menu ]';
  });

  nav.addEventListener('click', (e) => {
    if (e.target.matches('.nav-link')) {
      nav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.textContent = '[ Menu ]';
    }
  });

  actions.appendChild(pillCta);
  actions.appendChild(themeToggle);
  actions.appendChild(menuToggle);

  inner.appendChild(brandLink);
  inner.appendChild(nav);
  inner.appendChild(actions);
  header.appendChild(inner);

  // Scroll morphing: becomes compact floating capsule on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('is-compact');
    } else {
      header.classList.remove('is-compact');
    }
  }, { passive: true });

  return header;
}
