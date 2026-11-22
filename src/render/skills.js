/**
 * Skills render module: Thanh Tran (thanhvtran.com) technical capabilities cards.
 * Clean architectural cards with crimson accent rules and bulleted competencies.
 */

export function renderSkills(skillsList, indexString = '04') {
  const section = document.createElement('section');
  section.className = 'section-white reveal';
  section.id = 'skills';

  const container = document.createElement('div');
  container.className = 'container';

  const heading = document.createElement('h2');
  heading.className = 'section-heading-dark';
  heading.innerHTML = `<span class="heading-accent-bar" aria-hidden="true"></span>SKILLS & CAPABILITIES`;

  const grid = document.createElement('div');
  grid.className = 'skills-thanh-grid';

  (skillsList || []).forEach((groupObj) => {
    const card = document.createElement('div');
    card.className = 'skill-thanh-card';

    card.innerHTML = `
      <h3 class="skill-thanh-title">${groupObj.group}</h3>
      <ul class="skill-thanh-items">
        ${(groupObj.items || []).map(item => `<li>${item}</li>`).join('')}
      </ul>
    `;

    grid.appendChild(card);
  });

  container.appendChild(heading);
  container.appendChild(grid);
  section.appendChild(container);

  return section;
}
