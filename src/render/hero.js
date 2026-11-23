/**
 * Hero render module: Thanh Tran (thanhvtran.com) high-motion engineering hero.
 * Full viewport height, background engineering imagery with contrast scrim,
 * bold uppercase typography, and industrial CTA button pair.
 */

export function renderHero({ hero, identity }) {
  const section = document.createElement('section');
  section.className = 'hero-section';
  section.id = 'hero';

  // Background media & contrast scrim
  const bgImg = document.createElement('img');
  bgImg.className = 'hero-background-media';
  bgImg.src = '/images/baja-suspension.jpg';
  bgImg.alt = 'Mechanical Engineering CAD suspension background';
  bgImg.loading = 'eager';

  const scrim = document.createElement('div');
  scrim.className = 'hero-scrim-overlay';
  scrim.setAttribute('aria-hidden', 'true');

  // Centered Content
  const content = document.createElement('div');
  content.className = 'hero-content';

  const title = document.createElement('h1');
  title.className = 'hero-main-title';
  title.textContent = identity.name.toUpperCase();

  const desc = document.createElement('p');
  desc.className = 'hero-descriptor';
  desc.textContent = hero.descriptor || 'Working on CAD/CAE and structural FEA.';

  const ctaCluster = document.createElement('div');
  ctaCluster.className = 'hero-cta-cluster';

  const primaryBtn = document.createElement('a');
  primaryBtn.className = 'btn-industrial-outline';
  primaryBtn.href = '#projects';
  primaryBtn.textContent = 'PROJECTS';

  const secondaryBtn = document.createElement('a');
  secondaryBtn.className = 'btn-industrial-solid';
  secondaryBtn.href = hero.secondaryCta?.href || identity.resume || '/resume.pdf';
  secondaryBtn.target = '_blank';
  secondaryBtn.rel = 'noopener noreferrer';
  secondaryBtn.textContent = 'RESUME';

  ctaCluster.appendChild(primaryBtn);
  ctaCluster.appendChild(secondaryBtn);

  content.appendChild(title);
  content.appendChild(desc);
  content.appendChild(ctaCluster);

  section.appendChild(bgImg);
  section.appendChild(scrim);
  section.appendChild(content);

  return section;
}
