/**
 * Projects render module: Thanh Tran (thanhvtran.com) full-width PROJECTS banner
 * and 2-column image grid with dark hover overlay and blueprint modal inspection.
 */

import { openBlueprintDrawer } from './drawer.js';

export function renderProjects(projectsList, indexString = '03') {
  const section = document.createElement('section');
  section.className = 'reveal';
  section.id = 'projects';

  // Full-Width Black Banner (Thanh Tran Signature)
  const banner = document.createElement('div');
  banner.className = 'projects-banner';
  banner.innerHTML = `<h2 class="projects-banner-title">PROJECTS</h2>`;
  section.appendChild(banner);

  // 2-Column Projects Grid on clean canvas
  const wrapper = document.createElement('div');
  wrapper.className = 'projects-section-thanh';

  const container = document.createElement('div');
  container.className = 'container';

  const grid = document.createElement('div');
  grid.className = 'projects-grid-thanh';

  const fallbackImages = [
    '/images/baja-suspension.jpg',
    '/images/braille-cam-mechanism.jpg',
    '/images/rover-cad-fea.jpg',
    '/images/baja-suspension.jpg',
    '/images/rover-cad-fea.jpg',
    '/images/braille-cam-mechanism.jpg'
  ];

  (projectsList || []).forEach((proj, idx) => {
    const card = document.createElement('article');
    card.className = 'project-card-thanh';
    card.id = `project-${proj.id}`;
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `View engineering details for ${proj.title}`);

    const imgSrc = (proj.image && proj.image.src) ? proj.image.src : fallbackImages[idx % fallbackImages.length];
    const imgAlt = (proj.image && proj.image.alt) ? proj.image.alt : proj.title;

    card.innerHTML = `
      <img src="${imgSrc}" alt="${imgAlt}" class="project-img-thanh" loading="lazy">
      <div class="project-overlay-thanh">
        <h3 class="overlay-title-thanh">${proj.title}</h3>
        <p class="overlay-subtitle-thanh">${proj.summary}</p>
        <span class="overlay-btn-thanh">View Project <span>→</span></span>
      </div>
    `;

    // Open detailed case study dossier on click or keyboard Enter
    card.addEventListener('click', () => {
      openBlueprintDrawer(proj, idx + 1);
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openBlueprintDrawer(proj, idx + 1);
      }
    });

    grid.appendChild(card);
  });

  // Bottom Action Button Row
  const bottomActions = document.createElement('div');
  bottomActions.className = 'projects-bottom-actions';
  bottomActions.innerHTML = `
    <a href="https://github.com/vineetsharma0205-png" target="_blank" rel="noopener noreferrer" class="btn-black-outline">
      View CAD Repositories on GitHub ↗
    </a>
  `;

  container.appendChild(grid);
  container.appendChild(bottomActions);
  wrapper.appendChild(container);
  section.appendChild(wrapper);

  return section;
}
