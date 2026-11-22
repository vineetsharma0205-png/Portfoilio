/**
 * About render module: Thanh Tran (thanhvtran.com) signature summary & personality cards.
 * Features an authentic personal introduction, side-by-side Strengths & Weaknesses cards,
 * and key quantitative engineering performance metrics.
 */

export function renderAbout(about, indexString = '01') {
  const section = document.createElement('section');
  section.className = 'section-white reveal';
  section.id = 'about';

  const container = document.createElement('div');
  container.className = 'container';

  // Section Heading with crimson accent indicator
  const heading = document.createElement('h2');
  heading.className = 'section-heading-dark';
  heading.innerHTML = `<span class="heading-accent-bar" aria-hidden="true"></span>ABOUT ME`;

  // Summary narrative
  const leadText = document.createElement('p');
  leadText.className = 'summary-lead';
  leadText.textContent = (about.paragraphs && about.paragraphs.join(' ')) ||
    "I am an undergraduate mechanical engineering student at IIITDM Kurnool with hands-on experience in CAD/CAE, structural FEA, electromechanical prototyping, and system-level vehicle design. My work spans IIT Roorkee research, BAJA SAE suspension engineering, and multi-disciplinary fabrication projects, each validated with measurable real-world results.";

  // Personality Grid: Strengths & Weaknesses
  const grid = document.createElement('div');
  grid.className = 'personality-grid';

  // Strengths Card
  const strengthsCard = document.createElement('div');
  strengthsCard.className = 'personality-card';
  strengthsCard.innerHTML = `
    <h3 class="personality-title">STRENGTHS</h3>
    <ul class="personality-list">
      <li>SolidWorks & Siemens NX (Certified) CAD modeling with strict DFM/DFA compliance</li>
      <li>Finite Element Analysis (FEA) & dynamic structural load validation in ANSYS</li>
      <li>Electromechanical prototyping: Arduino microcontrollers, stepper motor drive systems & serial communication</li>
      <li>Hands-on metal fabrication, workshop machining, and physical assembly</li>
      <li>Data-driven numerical modeling and deformation field computation in MATLAB & Python</li>
    </ul>
  `;

  // Weaknesses Card (Authentic & Relatable Engineer Traits)
  const weaknessesCard = document.createElement('div');
  weaknessesCard.className = 'personality-card weakness';
  weaknessesCard.innerHTML = `
    <h3 class="personality-title">WEAKNESSES</h3>
    <ul class="personality-list">
      <li>Obsessive about CAD feature tree cleanliness, naming conventions, and fully defined sketches</li>
      <li>Can spend excessive hours fine-tuning FEA mesh convergence and boundary conditions</li>
      <li>Prefers physical workshop fabrication and machining over prolonged meetings</li>
      <li>Strong coffee dependency during vehicle build and testing cycles</li>
    </ul>
  `;

  grid.appendChild(strengthsCard);
  grid.appendChild(weaknessesCard);

  container.appendChild(heading);
  container.appendChild(leadText);
  container.appendChild(grid);

  // Quantitative Performance Metrics Strip
  if (about.metrics && about.metrics.length > 0) {
    const metricsWrapper = document.createElement('div');
    metricsWrapper.style.marginTop = 'var(--space-5)';
    metricsWrapper.style.paddingTop = 'var(--space-4)';
    metricsWrapper.style.borderTop = '1px solid var(--line)';

    const metricsHeading = document.createElement('h4');
    metricsHeading.style.fontFamily = 'var(--font-display)';
    metricsHeading.style.fontSize = 'var(--text-sm)';
    metricsHeading.style.fontWeight = '700';
    metricsHeading.style.letterSpacing = '1px';
    metricsHeading.style.textTransform = 'uppercase';
    metricsHeading.style.color = 'var(--muted)';
    metricsHeading.style.marginBottom = 'var(--space-3)';
    metricsHeading.textContent = 'MEASURED ENGINEERING IMPACT';

    const metricsGrid = document.createElement('div');
    metricsGrid.style.display = 'grid';
    metricsGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(200px, 1fr))';
    metricsGrid.style.gap = 'var(--space-3)';

    about.metrics.forEach((m) => {
      const mCard = document.createElement('div');
      mCard.style.backgroundColor = 'var(--surface-alt)';
      mCard.style.border = '1px solid var(--line)';
      mCard.style.borderRadius = 'var(--radius-card)';
      mCard.style.padding = 'var(--space-3) var(--space-4)';

      mCard.innerHTML = `
        <div style="font-family: var(--font-display); font-size: var(--text-2xl); font-weight: 800; color: var(--accent); line-height: 1;">${m.value}</div>
        <div style="font-size: var(--text-sm); font-weight: 600; color: var(--ink); margin-top: 0.35rem;">${m.label}</div>
        <div style="font-family: var(--font-mono); font-size: 11px; color: var(--muted); margin-top: 0.25rem;">// ${m.source}</div>
      `;
      metricsGrid.appendChild(mCard);
    });

    metricsWrapper.appendChild(metricsHeading);
    metricsWrapper.appendChild(metricsGrid);
    container.appendChild(metricsWrapper);
  }

  section.appendChild(container);

  return section;
}
