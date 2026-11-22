/**
 * Projects render module: Super Eight Studio "SELECTED WORK" exact architecture.
 * Alternating full-width hero and 2-column cards, floating badge pills,
 * and seamless Gatefold Blueprint Drawer case study modal trigger.
 */

import { openBlueprintDrawer } from './drawer.js';

export function renderProjects(projectsList, indexString = '01') {
  const section = document.createElement('section');
  section.className = 'section-wrapper reveal';
  section.id = 'projects';

  const container = document.createElement('div');
  container.className = 'container';

  // Section Header (Super Eight Serif Title)
  const header = document.createElement('header');
  header.className = 'section-header';
  header.innerHTML = `
    <div class="section-eyebrow">${indexString} / SELECTED WORK</div>
    <h2 class="section-serif-title font-serif">Selected Engineering Work</h2>
  `;

  // Projects Grid
  const grid = document.createElement('div');
  grid.className = 'projects-grid';

  (projectsList || []).forEach((proj, idx) => {
    const item = document.createElement('div');
    item.className = `project-item ${proj.featured ? 'is-featured' : ''}`;

    const card = document.createElement('article');
    card.className = 'project-card-s8';
    card.id = `project-${proj.id}`;

    // Media Wrapper
    const media = document.createElement('div');
    media.className = 'project-media-wrapper';

    const imgSrc = proj.image && proj.image.src ? proj.image.src : '/images/baja-suspension.jpg';
    const imgAlt = proj.image?.alt || proj.title;

    media.innerHTML = `
      <img src="${imgSrc}" alt="${imgAlt}" class="project-media-img" loading="lazy">
      <div class="project-floating-badge font-sans">
        ${proj.tags && proj.tags.length ? proj.tags.slice(0, 2).join(' · ') : 'CAD / FEA'} · ${proj.end || '2026'}
      </div>
    `;

    // Footer Metadata
    const footer = document.createElement('div');
    footer.className = 'project-footer-meta';
    footer.innerHTML = `
      <h3 class="project-name">${proj.title}</h3>
      <span class="project-serif-summary font-serif">${proj.summary}</span>
    `;

    card.appendChild(media);
    card.appendChild(footer);

    // Click triggers Gatefold Blueprint Drawer
    card.addEventListener('click', () => {
      openBlueprintDrawer(proj, idx + 1);
    });

    item.appendChild(card);
    grid.appendChild(item);
  });

  container.appendChild(header);
  container.appendChild(grid);
  section.appendChild(container);

  return section;
}
