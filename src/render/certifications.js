/**
 * Certifications render module: Super Eight Studio credentials grid.
 */

export function renderCertifications(certList, indexString = '05') {
  const section = document.createElement('section');
  section.className = 'section-wrapper reveal';
  section.id = 'certifications';

  const container = document.createElement('div');
  container.className = 'container';

  // Section Header
  const header = document.createElement('header');
  header.className = 'section-header';
  header.innerHTML = `
    <div class="section-eyebrow">${indexString} / VERIFIED CREDENTIALS</div>
    <h2 class="section-serif-title font-serif">Certifications & Accreditations</h2>
  `;

  const grid = document.createElement('div');
  grid.style.display = 'grid';
  grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(280px, 1fr))';
  grid.style.gap = 'var(--space-4)';

  (certList || []).forEach((cert) => {
    const card = document.createElement('article');
    card.style.backgroundColor = 'var(--surface)';
    card.style.border = '1px solid var(--line)';
    card.style.borderRadius = 'var(--radius-card)';
    card.style.padding = 'var(--space-4)';
    card.style.display = 'flex';
    card.style.flexDirection = 'column';
    card.style.justifyContent = 'space-between';
    card.style.gap = 'var(--space-2)';
    card.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)';

    card.innerHTML = `
      <h3 style="font-family: var(--font-display); font-size: var(--text-xl); font-weight: 800; text-transform: uppercase; color: var(--text-main);">${cert.title}</h3>
      <p style="font-family: var(--font-sans); font-size: var(--text-sm); color: var(--muted-dark); line-height: 1.5;">${cert.note}</p>
    `;
    grid.appendChild(card);
  });

  container.appendChild(header);
  container.appendChild(grid);
  section.appendChild(container);

  return section;
}
