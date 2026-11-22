/**
 * About render module: Super Eight Studio exact Quote & Giant Teal Stat Card architecture.
 * Features large Instrument Serif quote card alongside high-impact Big Shoulders stat cards.
 */

export function renderAbout(about, indexString = '02') {
  const section = document.createElement('section');
  section.className = 'section-wrapper reveal';
  section.id = 'about';

  const container = document.createElement('div');
  container.className = 'container';

  // Section Header
  const header = document.createElement('header');
  header.className = 'section-header';
  header.innerHTML = `
    <div class="section-eyebrow">${indexString} / PHILOSOPHY & IMPACT</div>
    <h2 class="section-serif-title font-serif">Measurable Engineering Results</h2>
  `;

  // Narrative text row
  const textRow = document.createElement('div');
  textRow.className = 'about-text';
  textRow.style.maxWidth = '64ch';
  textRow.style.fontSize = 'var(--text-lg)';
  textRow.style.lineHeight = '1.6';
  textRow.style.color = 'var(--muted-dark)';
  textRow.style.marginBottom = 'var(--space-5)';

  (about.paragraphs || []).forEach((pText) => {
    const p = document.createElement('p');
    p.textContent = pText;
    textRow.appendChild(p);
  });

  // Super Eight Quote & Teal Stat Cards Grid
  const statsGrid = document.createElement('div');
  statsGrid.className = 'stats-quotes-grid';

  // 1. Quote Card
  const quoteCard = document.createElement('div');
  quoteCard.className = 'quote-card';
  quoteCard.innerHTML = `
    <p class="quote-text font-serif">
      "Engineering is not about aesthetic decoration. It is the rigorous application of finite element analysis, material physics, and design for manufacturing to deliver lighter, stronger mechanical systems."
    </p>
    <div class="quote-citation font-sans">
      — IIT Roorkee & BAJA SAE Engineering Principles
    </div>
  `;

  // 2. High-contrast Teal Stat Card
  const firstMetric = (about.metrics && about.metrics[0]) || { value: "12%", label: "Unsprung mass reduction", source: "BAJA SAE" };
  const statCard = document.createElement('div');
  statCard.className = 'stat-card-teal';
  statCard.innerHTML = `
    <div class="stat-giant-digit">${firstMetric.value}</div>
    <div class="stat-caption font-sans">
      ${firstMetric.label} engineered via topology optimization and validated load paths (${firstMetric.source}).
    </div>
  `;

  statsGrid.appendChild(quoteCard);
  statsGrid.appendChild(statCard);

  // Additional metrics in clean strip
  const extraMetrics = (about.metrics || []).slice(1);
  if (extraMetrics.length > 0) {
    const extraGrid = document.createElement('div');
    extraGrid.style.display = 'grid';
    extraGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(220px, 1fr))';
    extraGrid.style.gap = 'var(--space-3)';
    extraGrid.style.marginTop = 'var(--space-4)';

    extraMetrics.forEach((m) => {
      const card = document.createElement('div');
      card.style.backgroundColor = 'var(--surface)';
      card.style.border = '1px solid var(--line)';
      card.style.borderRadius = 'var(--radius-card)';
      card.style.padding = 'var(--space-3) var(--space-4)';
      card.innerHTML = `
        <div style="font-family: var(--font-display); font-size: var(--text-2xl); font-weight: 900; color: var(--teal); line-height: 1;">${m.value}</div>
        <div style="font-size: var(--text-sm); font-weight: 600; color: var(--text-main); margin-top: 0.25rem;">${m.label}</div>
        <div style="font-family: var(--font-mono); font-size: 11px; color: var(--muted-dark); margin-top: 0.25rem;">// ${m.source}</div>
      `;
      extraGrid.appendChild(card);
    });

    container.appendChild(header);
    container.appendChild(textRow);
    container.appendChild(statsGrid);
    container.appendChild(extraGrid);
  } else {
    container.appendChild(header);
    container.appendChild(textRow);
    container.appendChild(statsGrid);
  }

  section.appendChild(container);
  return section;
}
