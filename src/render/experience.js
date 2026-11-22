/**
 * Experience render module: Super Eight Studio exact Process & Services row architecture.
 * Clean rows partitioned by hairline dividers with tracked index numbers and editorial typography.
 */

export function renderExperience(experienceList, indexString = '03') {
  const section = document.createElement('section');
  section.className = 'section-wrapper reveal';
  section.id = 'experience';

  const container = document.createElement('div');
  container.className = 'container';

  // Section Header
  const header = document.createElement('header');
  header.className = 'section-header';
  header.innerHTML = `
    <div class="section-eyebrow">${indexString} / BACKGROUND & ROLES</div>
    <h2 class="section-serif-title font-serif">Research & Vehicle Engineering</h2>
  `;

  const list = document.createElement('div');
  list.className = 'experience-list';

  (experienceList || []).forEach((item, idx) => {
    const row = document.createElement('article');
    row.className = 'experience-row';

    const indexNum = String(idx + 1).padStart(2, '0');

    row.innerHTML = `
      <div class="exp-index font-mono">${indexNum} // ${item.start} — ${item.end}</div>
      <div>
        <h3 class="exp-role-title">${item.role}</h3>
        <div class="exp-org-sub font-serif">${item.org} · ${item.place}</div>
      </div>
      <div>
        <ul class="exp-bullets font-sans">
          ${(item.points || []).map(pt => `<li>${pt}</li>`).join('')}
        </ul>
      </div>
    `;

    list.appendChild(row);
  });

  container.appendChild(header);
  container.appendChild(list);
  section.appendChild(container);

  return section;
}
