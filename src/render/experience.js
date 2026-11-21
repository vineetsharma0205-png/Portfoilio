/**
 * Experience render module: engineering timeline, responsibilities,
 * and technical artifact placeholders.
 */

export function renderExperience(experienceList, indexString = '02') {
  const section = document.createElement('section');
  section.className = 'section-wrapper reveal';
  section.id = 'experience';

  const container = document.createElement('div');
  container.className = 'container';

  // Section header
  const header = document.createElement('header');
  header.className = 'section-header';
  header.innerHTML = `
    <span class="section-tag">${indexString} / Experience</span>
    <h2 class="section-title">Engineering Roles & Research</h2>
  `;

  const timeline = document.createElement('div');
  timeline.className = 'timeline';

  (experienceList || []).forEach((item) => {
    const card = document.createElement('article');
    card.className = 'timeline-card';

    // Header: Role, Org, Place, Date
    const cardHeader = document.createElement('div');
    cardHeader.className = 'timeline-header';
    cardHeader.innerHTML = `
      <div>
        <h3 class="timeline-role">${item.role} <span class="timeline-org">@ ${item.org}</span></h3>
        <span class="timeline-meta">${item.place}</span>
      </div>
      <div class="timeline-meta font-mono">${item.start} — ${item.end}</div>
    `;

    // Points
    const ul = document.createElement('ul');
    ul.className = 'timeline-points';
    (item.points || []).forEach((pt) => {
      const li = document.createElement('li');
      li.textContent = pt;
      ul.appendChild(li);
    });

    card.appendChild(cardHeader);
    card.appendChild(ul);

    // Image or dashed placeholder
    if (item.image) {
      if (item.image.src && item.image.src.trim() !== '') {
        const img = document.createElement('img');
        img.src = item.image.src;
        img.alt = item.image.alt || item.role;
        img.className = 'project-image';
        img.loading = 'lazy';
        card.appendChild(img);
      } else if (item.image.placeholder) {
        const ph = document.createElement('div');
        ph.className = 'placeholder-box';
        ph.setAttribute('aria-hidden', 'true');
        ph.innerHTML = `
          <svg class="placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2" stroke-dasharray="3 3"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
          </svg>
          <span class="placeholder-text font-mono">${item.image.placeholder}</span>
        `;
        card.appendChild(ph);
      }
    }

    timeline.appendChild(card);
  });

  container.appendChild(header);
  container.appendChild(timeline);
  section.appendChild(container);

  return section;
}
