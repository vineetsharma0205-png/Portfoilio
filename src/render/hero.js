/**
 * Hero render module: Super Eight Studio exact hero architecture.
 * Features live engineering status ticker, massive Big Shoulders headline,
 * 3-column metadata strip, pill actions, and interactive showreel turntable card.
 */

export function renderHero({ hero, identity }) {
  const section = document.createElement('section');
  section.className = 'hero-section';
  section.id = 'hero';

  const container = document.createElement('div');
  container.className = 'container';

  // 1. Live Engineering Status Ticker Bar
  const tickerBar = document.createElement('div');
  tickerBar.className = 'hero-ticker-bar';
  tickerBar.innerHTML = `
    <span class="ticker-live-status">
      <span class="ticker-pulse-dot" aria-hidden="true"></span>
      <span>IIITDM KURNOOL // B.TECH MECHANICAL (2023-2027)</span>
    </span>
    <span>SYS_LOC: ${identity.location.toUpperCase()} · STATUS: AVAILABLE</span>
  `;

  // 2. Massive Headline in Big Shoulders Display 900
  const headline = document.createElement('h1');
  headline.className = 'hero-headline';
  headline.innerHTML = `
    MECHANICAL SYSTEMS DESIGNED <span class="hero-headline-accent">TO PERFORM.</span>
  `;

  // 3. 3-Column Metadata Information Grid Strip
  const metaGrid = document.createElement('div');
  metaGrid.className = 'hero-meta-grid';

  const specs = hero.specs || [
    { label: "Degree", value: "B.Tech Mechanical, 2023-2027" },
    { label: "Location", value: "Hyderabad, India" },
    { label: "Focus", value: "Suspension, FEA & Prototyping" }
  ];

  specs.forEach((spec) => {
    const col = document.createElement('div');
    col.className = 'meta-col';
    col.innerHTML = `
      <span class="meta-label">${spec.label}</span>
      <span class="meta-val font-serif">${spec.value}</span>
    `;
    metaGrid.appendChild(col);
  });

  // 4. Mission Statement & CTA Cluster
  const bottomRow = document.createElement('div');
  bottomRow.className = 'hero-bottom-row';

  const descriptor = document.createElement('p');
  descriptor.className = 'hero-descriptor font-sans';
  descriptor.textContent = hero.descriptor;

  const ctaCluster = document.createElement('div');
  ctaCluster.className = 'hero-cta-cluster';

  const primaryBtn = document.createElement('a');
  primaryBtn.className = 'btn-primary-teal';
  primaryBtn.href = '#projects';
  primaryBtn.innerHTML = `<span>View selected work</span><span aria-hidden="true">↓</span>`;

  const secondaryBtn = document.createElement('a');
  secondaryBtn.className = 'btn-secondary-outline';
  secondaryBtn.href = hero.secondaryCta?.href || '/resume.pdf';
  secondaryBtn.target = '_blank';
  secondaryBtn.rel = 'noopener noreferrer';
  secondaryBtn.innerHTML = `<span>Resume</span><span aria-hidden="true">↗</span>`;

  ctaCluster.appendChild(primaryBtn);
  ctaCluster.appendChild(secondaryBtn);
  bottomRow.appendChild(descriptor);
  bottomRow.appendChild(ctaCluster);

  // 5. Featured Showreel / CAD Turntable Card
  const showreelCard = document.createElement('div');
  showreelCard.className = 'hero-showreel-card';
  showreelCard.innerHTML = `
    <img src="/images/baja-suspension.jpg" alt="BAJA SAE Off-Road Suspension Turntable CAD" class="hero-showreel-img" loading="eager">
    <div class="hero-showreel-overlay">
      <a href="#projects" class="showreel-play-btn" aria-label="Explore CAD Assembly">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="5 3 19 12 5 21 5 3"/>
        </svg>
        <span class="showreel-btn-label">EXPLORE</span>
      </a>
    </div>
  `;

  container.appendChild(tickerBar);
  container.appendChild(headline);
  container.appendChild(metaGrid);
  container.appendChild(bottomRow);
  container.appendChild(showreelCard);
  section.appendChild(container);

  return section;
}
