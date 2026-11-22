/**
 * About render module: background narrative and measured engineering metric counters.
 */

export function renderAbout(about, indexString = '01') {
  const section = document.createElement('section');
  section.className = 'section-wrapper reveal';
  section.id = 'about';

  const container = document.createElement('div');
  container.className = 'container';

  // Section header with dynamic sequential numbering
  const header = document.createElement('header');
  header.className = 'section-header';
  header.innerHTML = `
    <span class="section-tag">${indexString} / About</span>
    <h2 class="section-title">Background & Measured Results</h2>
  `;

  const grid = document.createElement('div');
  grid.className = 'about-grid';

  // Narrative text
  const textCol = document.createElement('div');
  textCol.className = 'about-text';
  (about.paragraphs || []).forEach((pText) => {
    const p = document.createElement('p');
    p.textContent = pText;
    textCol.appendChild(p);
  });

  // Metrics grid
  const metricsGrid = document.createElement('div');
  metricsGrid.className = 'metrics-grid';

  (about.metrics || []).forEach((metric) => {
    const card = document.createElement('div');
    card.className = 'metric-card';
    card.innerHTML = `
      <span class="metric-value">${metric.value}</span>
      <span class="metric-label">${metric.label}</span>
      <span class="metric-source font-mono">// ${metric.source}</span>
    `;
    metricsGrid.appendChild(card);
  });

  grid.appendChild(textCol);
  grid.appendChild(metricsGrid);

  container.appendChild(header);
  container.appendChild(grid);
  section.appendChild(container);

  return section;
}
