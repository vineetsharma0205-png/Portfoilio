/**
 * Skills render module: labeled two-column specification lists.
 * Strictly no percentage rings or progress bars.
 */

export function renderSkills(skillsList, indexString = '04') {
  const section = document.createElement('section');
  section.className = 'section-wrapper reveal';
  section.id = 'skills';

  const container = document.createElement('div');
  container.className = 'container';

  // Section header
  const header = document.createElement('header');
  header.className = 'section-header';
  header.innerHTML = `
    <span class="section-tag">${indexString} / Skills</span>
    <h2 class="section-title">Technical Competencies & Tools</h2>
  `;

  const grid = document.createElement('div');
  grid.className = 'skills-grid';

  (skillsList || []).forEach((groupObj, groupIdx) => {
    const card = document.createElement('div');
    card.className = 'skill-spec-card';

    const groupHeader = document.createElement('div');
    groupHeader.className = 'skill-group-name';
    groupHeader.textContent = `[ ${groupObj.group} ]`;
    card.appendChild(groupHeader);

    const table = document.createElement('table');
    table.className = 'skill-spec-table';
    const tbody = document.createElement('tbody');

    (groupObj.items || []).forEach((item, itemIdx) => {
      const tr = document.createElement('tr');

      const tdIndex = document.createElement('td');
      tdIndex.className = 'skill-item-index';
      tdIndex.textContent = String(itemIdx + 1).padStart(2, '0');

      const tdName = document.createElement('td');
      tdName.className = 'skill-item-name font-mono';
      tdName.textContent = item;

      tr.appendChild(tdIndex);
      tr.appendChild(tdName);
      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    card.appendChild(table);
    grid.appendChild(card);
  });

  container.appendChild(header);
  container.appendChild(grid);
  section.appendChild(container);

  return section;
}
