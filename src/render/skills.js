/**
 * Skills render module: Super Eight Studio exact 2x2 Services Grid.
 * Partitioned by hairline dividers with tracked numbers and pill chips.
 */

export function renderSkills(skillsList, indexString = '04') {
  const section = document.createElement('section');
  section.className = 'section-wrapper reveal';
  section.id = 'skills';

  const container = document.createElement('div');
  container.className = 'container';

  // Section Header
  const header = document.createElement('header');
  header.className = 'section-header';
  header.innerHTML = `
    <div class="section-eyebrow">${indexString} / SERVICES & CAPABILITIES</div>
    <h2 class="section-serif-title font-serif">Engineering Competencies & Tools</h2>
  `;

  const grid = document.createElement('div');
  grid.className = 'skills-s8-grid';

  (skillsList || []).forEach((groupObj, idx) => {
    const cell = document.createElement('div');
    cell.className = 'skill-s8-cell';

    const indexNum = String(idx + 1).padStart(2, '0');

    cell.innerHTML = `
      <div class="skill-cell-num font-mono">${indexNum} // SPECIALITY</div>
      <h3 class="skill-cell-heading">${groupObj.group}</h3>
      <div class="skill-pills-wrap font-sans">
        ${(groupObj.items || []).map(item => `<span class="skill-pill">${item}</span>`).join('')}
      </div>
    `;

    grid.appendChild(cell);
  });

  container.appendChild(header);
  container.appendChild(grid);
  section.appendChild(container);

  return section;
}
