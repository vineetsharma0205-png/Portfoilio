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

  // Summary narrative with generous reading width space
  const leadText = document.createElement('p');
  leadText.className = 'summary-lead';
  leadText.textContent = (about.paragraphs && about.paragraphs.join(' ')) ||
    "I am an undergraduate mechanical engineering student with hands-on experience in CAD/CAE, structural FEA, electromechanical prototyping, and system-level vehicle design. My work spans IIT Roorkee research internship, BAJA SAE suspension engineering, and multi-disciplinary fabrication projects, each validated with measurable real-world results.";

  container.appendChild(heading);
  container.appendChild(leadText);

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
