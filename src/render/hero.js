/**
 * Hero render module: Paul Fey inspired editorial title, Cormorant Garamond subtitle,
 * tactile die-cut sticker badges, and gatefold specification docket.
 */

export function renderHero({ hero, identity }) {
  const section = document.createElement('section');
  section.className = 'hero-section';
  section.id = 'hero';

  const container = document.createElement('div');
  container.className = 'container';

  // Metadata bar (engineer's notebook header)
  const metaBar = document.createElement('div');
  metaBar.className = 'hero-meta-bar';
  metaBar.innerHTML = `
    <span class="hero-coords font-mono">DWG-2027 // CATALOG SPEC SHEET</span>
    <span class="font-mono">SYS_LOC: ${identity.location.toUpperCase()}</span>
  `;

  // Massive Display Title in Bricolage Grotesque
  const title = document.createElement('h1');
  title.className = 'hero-title';
  title.textContent = identity.name;

  // Editorial Cormorant subtitle
  const descriptor = document.createElement('p');
  descriptor.className = 'hero-descriptor font-serif';
  descriptor.textContent = hero.descriptor;

  // Tactile Die-Cut Badges / Sticker Cloud
  const stickerCloud = document.createElement('div');
  stickerCloud.className = 'sticker-cloud';

  const badgeLabels = [
    'IIITDM Kurnool \'27',
    'IIT Roorkee Research',
    'BAJA SAE Suspension',
    'SolidWorks + ANSYS FEA'
  ];

  badgeLabels.forEach((label) => {
    const badge = document.createElement('span');
    badge.className = 'sticker-badge';
    badge.innerHTML = `<span class="sticker-dot" aria-hidden="true"></span><span>${label}</span>`;
    stickerCloud.appendChild(badge);
  });

  // CTA buttons
  const ctaGroup = document.createElement('div');
  ctaGroup.className = 'hero-cta-group';

  if (hero.primaryCta && hero.primaryCta.label) {
    const primaryBtn = document.createElement('a');
    primaryBtn.className = 'btn btn-primary';
    primaryBtn.href = hero.primaryCta.href;
    primaryBtn.innerHTML = `<span>${hero.primaryCta.label}</span><span aria-hidden="true">↓</span>`;
    ctaGroup.appendChild(primaryBtn);
  }

  if (hero.secondaryCta && hero.secondaryCta.label) {
    const secondaryBtn = document.createElement('a');
    secondaryBtn.className = 'btn btn-secondary';
    secondaryBtn.href = hero.secondaryCta.href;
    secondaryBtn.target = hero.secondaryCta.href.startsWith('http') || hero.secondaryCta.href.endsWith('.pdf') ? '_blank' : '_self';
    if (secondaryBtn.target === '_blank') {
      secondaryBtn.rel = 'noopener noreferrer';
    }
    secondaryBtn.innerHTML = `<span>${hero.secondaryCta.label}</span><span aria-hidden="true">↗</span>`;
    ctaGroup.appendChild(secondaryBtn);
  }

  // Spec Sheet Component
  const specSheet = document.createElement('div');
  specSheet.className = 'spec-sheet';

  const specHeader = document.createElement('div');
  specHeader.className = 'spec-sheet-header';
  specHeader.innerHTML = `
    <span>Engineering Dossier Specifications</span>
    <span class="font-mono">STATUS: ACTIVE // VERIFIED</span>
  `;
  specSheet.appendChild(specHeader);

  const table = document.createElement('table');
  table.className = 'spec-table';
  const tbody = document.createElement('tbody');

  (hero.specs || []).forEach((spec) => {
    const tr = document.createElement('tr');
    tr.className = 'spec-row';

    const tdLabel = document.createElement('td');
    tdLabel.className = 'spec-label';
    tdLabel.textContent = spec.label;

    const tdVal = document.createElement('td');
    tdVal.className = 'spec-val';
    tdVal.textContent = spec.value;

    tr.appendChild(tdLabel);
    tr.appendChild(tdVal);
    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  specSheet.appendChild(table);

  container.appendChild(metaBar);
  container.appendChild(title);
  container.appendChild(descriptor);
  container.appendChild(stickerCloud);
  container.appendChild(ctaGroup);
  container.appendChild(specSheet);
  section.appendChild(container);

  return section;
}
