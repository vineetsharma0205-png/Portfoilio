/**
 * Certifications render module: credentials, issuing bodies, and technical scope notes.
 */

export function renderCertifications(certList, indexString = '05') {
  const section = document.createElement('section');
  section.className = 'section-wrapper reveal';
  section.id = 'certifications';

  const container = document.createElement('div');
  container.className = 'container';

  // Section header
  const header = document.createElement('header');
  header.className = 'section-header';
  header.innerHTML = `
    <span class="section-tag">${indexString} / Certifications</span>
    <h2 class="section-title">Credentials & Technical Qualifications</h2>
  `;

  const grid = document.createElement('div');
  grid.className = 'certs-grid';

  (certList || []).forEach((cert) => {
    const card = document.createElement('article');
    card.className = 'cert-card';
    card.innerHTML = `
      <h3 class="cert-title">${cert.title}</h3>
      <p class="cert-note font-mono">// ${cert.note}</p>
    `;
    grid.appendChild(card);
  });

  container.appendChild(header);
  container.appendChild(grid);
  section.appendChild(container);

  return section;
}
