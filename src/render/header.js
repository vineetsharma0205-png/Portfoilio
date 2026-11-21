/**
 * Header render module: produces the sticky navigation bar,
 * dynamic nav links based on active sections, and theme toggle.
 */

export function renderHeader({ identity, sections = [] }) {
  const header = document.createElement('header');
  header.className = 'site-header';

  const container = document.createElement('div');
  container.className = 'container header-inner';

  // Brand link / Monogram
  const brandLink = document.createElement('a');
  brandLink.className = 'brand-link';
  brandLink.href = '#';
  brandLink.setAttribute('aria-label', `${identity.name} - Home`);
  brandLink.innerHTML = `
    <span class="brand-mark" aria-hidden="true"></span>
    <span>${identity.name}</span>
  `;

  // Right nav cluster
  const navCluster = document.createElement('div');
  navCluster.className = 'nav-cluster';

  // Navigation menu
  const nav = document.createElement('nav');
  nav.className = 'site-nav';
  nav.setAttribute('aria-label', 'Primary');

  // Format section id into display label
  const sectionLabels = {
    about: 'About',
    experience: 'Experience',
    projects: 'Projects',
    skills: 'Skills',
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

  // Close menu on nav item click
  nav.addEventListener('click', (e) => {
    if (e.target.matches('.nav-link')) {
      nav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.textContent = '[ Menu ]';
    }
  });

  navCluster.appendChild(nav);
  navCluster.appendChild(themeToggle);
  navCluster.appendChild(menuToggle);

  container.appendChild(brandLink);
  container.appendChild(navCluster);
  header.appendChild(container);

  return header;
}
