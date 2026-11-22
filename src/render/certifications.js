/**
 * Certifications render module: Single-line vertical list manner.
 * Clean, minimal rows with verification indicator, title, and credential note.
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

  const list = document.createElement('div');
  list.className = 'certifications-single-line-list';

  (certList || []).forEach((cert) => {
    const row = document.createElement('article');
    row.className = 'cert-line-item';

    row.innerHTML = `
      <div class="cert-line-main">
        <span class="cert-line-bullet" aria-hidden="true">✔</span>
        <h3 class="cert-line-title">${cert.title}</h3>
      </div>
      <div class="cert-line-note font-mono">${cert.note}</div>
    `;

    list.appendChild(row);
  });

  container.appendChild(heading);
  container.appendChild(list);
  section.appendChild(container);

  return section;
}
