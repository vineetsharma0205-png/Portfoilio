/**
 * Certifications render module: Thanh Tran (thanhvtran.com) verified credentials cards.
 */

export function renderCertifications(certList, indexString = '05') {
  const section = document.createElement('section');
  section.className = 'section-white reveal';
  section.id = 'certifications';

  const container = document.createElement('div');
  container.className = 'container';

  const heading = document.createElement('h2');
  heading.className = 'section-heading-dark';
  heading.innerHTML = `<span class="heading-accent-bar" aria-hidden="true"></span>CERTIFICATIONS`;

  const grid = document.createElement('div');
  grid.className = 'skills-thanh-grid';

  (certList || []).forEach((cert) => {
    const card = document.createElement('article');
    card.className = 'skill-thanh-card';

    card.innerHTML = `
      <h3 class="skill-thanh-title">${cert.title}</h3>
      <p style="font-size: var(--text-sm); line-height: 1.6; color: var(--ink-body); margin: 0;">${cert.note}</p>
    `;

    grid.appendChild(card);
  });

  container.appendChild(heading);
  container.appendChild(grid);
  section.appendChild(container);

  return section;
}
