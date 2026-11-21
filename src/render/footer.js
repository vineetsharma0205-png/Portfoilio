/**
 * Footer render module: colophon, license/copyright, and engineering stamp.
 */

export function renderFooter({ footer, identity }) {
  const foot = document.createElement('footer');
  foot.className = 'site-footer';

  const container = document.createElement('div');
  container.className = 'container footer-inner';

  const left = document.createElement('div');
  left.className = 'footer-left';
  const currentYear = new Date().getFullYear();
  left.innerHTML = `<span>© ${currentYear} ${identity.name}. Mechanical Engineering Portfolio.</span>`;

  const right = document.createElement('div');
  right.className = 'footer-right font-mono';
  right.textContent = footer.text || 'Built with Vite and vanilla JS.';

  container.appendChild(left);
  container.appendChild(right);
  foot.appendChild(container);

  return foot;
}
