/**
 * Header render module: Thanh Tran (thanhvtran.com) minimalist navigation bar.
 * Clean brand on the left with crimson accent dot, uppercase navigation items,
 * and high-contrast responsive menu toggle.
 */

export function renderHeader({ identity, sections = [] }) {
  const header = document.createElement('header');
  header.className = 'site-header';
  header.id = 'site-header';

  const inner = document.createElement('div');
  inner.className = 'header-inner';

  // Brand link with crimson accent dot
  const brandLink = document.createElement('a');
  brandLink.className = 'brand-link';
  brandLink.href = '#';
  brandLink.setAttribute('aria-label', `${identity.name} - Mechanical Engineering Home`);
  brandLink.innerHTML = `
    <span>${identity.name}</span>
    <span class="brand-accent-dot" aria-hidden="true"></span>
  `;

  // Center navigation menu
  const nav = document.createElement('nav');
  nav.className = 'site-nav';
  nav.setAttribute('aria-label', 'Primary navigation');

  const navItems = [
    { id: 'about', label: 'ABOUT' },
    { id: 'experience', label: 'EXPERIENCE' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'skills', label: 'SKILLS' },
    { id: 'contact', label: 'CONTACT' }
  ];

  navItems.forEach((item) => {
    const link = document.createElement('a');
    link.className = 'nav-link';
    link.href = `#${item.id}`;
    link.textContent = item.label;
    nav.appendChild(link);
  });

  // Right action cluster
  const actions = document.createElement('div');
  actions.className = 'header-actions';

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
  menuToggle.textContent = 'MENU';

  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.textContent = isOpen ? 'CLOSE' : 'MENU';
  });

  nav.addEventListener('click', (e) => {
    if (e.target.matches('.nav-link')) {
      nav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.textContent = 'MENU';
    }
  });

  actions.appendChild(themeToggle);
  actions.appendChild(menuToggle);

  inner.appendChild(brandLink);
  inner.appendChild(nav);
  inner.appendChild(actions);
  header.appendChild(inner);

  return header;
}
