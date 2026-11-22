/**
 * Experience render module: Thanh Tran (thanhvtran.com) chronological timeline.
 * Clean white cards with thick left ink border that transitions to crimson on hover,
 * clear hierarchical role headings, and direct links to case studies.
 */

export function renderExperience(experienceList, indexString = '02') {
  const section = document.createElement('section');
  section.className = 'section-white reveal';
  section.id = 'experience';

  const container = document.createElement('div');
  container.className = 'container';

  const heading = document.createElement('h2');
  heading.className = 'section-heading-dark';
  heading.innerHTML = `<span class="heading-accent-bar" aria-hidden="true"></span>EXPERIENCE`;

  const timeline = document.createElement('div');
  timeline.className = 'experience-timeline';

  (experienceList || []).forEach((item) => {
    const card = document.createElement('article');
    card.className = 'exp-card-thanh';

    card.innerHTML = `
      <div class="exp-card-header">
        <h3 class="exp-role">${item.role} <span class="exp-org">@ ${item.org}</span></h3>
        <span class="exp-meta font-mono">${item.start} – ${item.end} | ${item.place}</span>
      </div>
      <ul class="exp-points-list font-sans">
        ${(item.points || []).map(pt => `<li>${pt}</li>`).join('')}
      </ul>
      <a href="#projects" class="exp-readmore">View Hardware Prototyping →</a>
    `;

    timeline.appendChild(card);
  });

  container.appendChild(heading);
  container.appendChild(timeline);
  section.appendChild(container);

  return section;
}
