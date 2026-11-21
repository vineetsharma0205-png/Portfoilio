/**
 * Projects render module: asymmetric display separating featured flagship projects
 * from compact expandable specification disclosures.
 */

export function renderProjects(projectsList, indexString = '03') {
  const section = document.createElement('section');
  section.className = 'section-wrapper reveal';
  section.id = 'projects';

  const container = document.createElement('div');
  container.className = 'container';

  // Section header
  const header = document.createElement('header');
  header.className = 'section-header';
  header.innerHTML = `
    <span class="section-tag">${indexString} / Projects</span>
    <h2 class="section-title">Design, CAD & Analysis Systems</h2>
  `;

  const projectsContainer = document.createElement('div');
  projectsContainer.className = 'projects-container';

  const featuredProjects = (projectsList || []).filter(p => p.featured);
  const compactProjects = (projectsList || []).filter(p => !p.featured);

  // 1. Featured projects (Large cards)
  if (featuredProjects.length > 0) {
    const featuredGrid = document.createElement('div');
    featuredGrid.className = 'featured-projects';

    featuredProjects.forEach((proj) => {
      const card = document.createElement('article');
      card.className = 'project-card';
      card.id = `project-${proj.id}`;

      // Card Header
      const cardHeader = document.createElement('div');
      cardHeader.className = 'project-card-header';
      cardHeader.innerHTML = `
        <h3 class="project-card-title">${proj.title}</h3>
        <span class="project-date font-mono">${proj.start} — ${proj.end}</span>
      `;

      // Card Body
      const cardBody = document.createElement('div');
      cardBody.className = 'project-card-body';

      // Summary
      const summary = document.createElement('p');
      summary.className = 'project-summary';
      summary.textContent = proj.summary;
      cardBody.appendChild(summary);

      // Details bullet list
      if (proj.details && proj.details.length > 0) {
        const ul = document.createElement('ul');
        ul.className = 'project-details-list';
        proj.details.forEach((det) => {
          const li = document.createElement('li');
          li.textContent = det;
          ul.appendChild(li);
        });
        cardBody.appendChild(ul);
      }

      // Image or dashed placeholder
      if (proj.image) {
        if (proj.image.src && proj.image.src.trim() !== '') {
          const img = document.createElement('img');
          img.src = proj.image.src;
          img.alt = proj.image.alt || proj.title;
          img.loading = 'lazy';
          cardBody.appendChild(img);
        } else if (proj.image.placeholder) {
          const ph = document.createElement('div');
          ph.className = 'placeholder-box';
          ph.setAttribute('aria-hidden', 'true');
          ph.innerHTML = `
            <svg class="placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" stroke-dasharray="3 3"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
            <span class="placeholder-text font-mono">${proj.image.placeholder}</span>
          `;
          cardBody.appendChild(ph);
        }
      }

      // Tag cloud
      if (proj.tags && proj.tags.length > 0) {
        const tagCloud = document.createElement('div');
        tagCloud.className = 'tag-cloud';
        proj.tags.forEach((tag) => {
          const chip = document.createElement('span');
          chip.className = 'tag-chip';
          chip.textContent = tag;
          tagCloud.appendChild(chip);
        });
        cardBody.appendChild(tagCloud);
      }

      // External / anchor link (only rendered if non-empty)
      if (proj.link && proj.link.trim() !== '') {
        const link = document.createElement('a');
        link.className = 'project-link-action';
        link.href = proj.link;
        link.textContent = 'View technical documentation →';
        cardBody.appendChild(link);
      }

      card.appendChild(cardHeader);
      card.appendChild(cardBody);
      featuredGrid.appendChild(card);
    });

    projectsContainer.appendChild(featuredGrid);
  }

  // 2. Compact projects (Native <details> expandable list)
  if (compactProjects.length > 0) {
    const compactSection = document.createElement('div');
    compactSection.className = 'compact-projects-section';

    const compactHeading = document.createElement('h3');
    compactHeading.className = 'compact-projects-heading font-mono';
    compactHeading.textContent = 'Additional Engineering Projects & Analyses';
    compactSection.appendChild(compactHeading);

    const compactList = document.createElement('div');
    compactList.className = 'compact-list';

    compactProjects.forEach((proj) => {
      const details = document.createElement('details');
      details.className = 'compact-item';
      details.id = `project-${proj.id}`;

      // Summary clickable header
      const summary = document.createElement('summary');
      summary.className = 'compact-summary';
      summary.innerHTML = `
        <div class="compact-summary-left">
          <span class="compact-title">${proj.title}</span>
          <span class="compact-hook">${proj.summary}</span>
        </div>
        <div class="compact-summary-right">
          <span class="compact-date font-mono">${proj.start} — ${proj.end}</span>
          <span class="compact-indicator font-mono" aria-hidden="true">▶</span>
        </div>
      `;

      // Expandable body
      const expBody = document.createElement('div');
      expBody.className = 'compact-expanded-body';

      if (proj.details && proj.details.length > 0) {
        const ul = document.createElement('ul');
        ul.className = 'project-details-list';
        proj.details.forEach((det) => {
          const li = document.createElement('li');
          li.textContent = det;
          ul.appendChild(li);
        });
        expBody.appendChild(ul);
      }

      // Image or placeholder
      if (proj.image) {
        if (proj.image.src && proj.image.src.trim() !== '') {
          const img = document.createElement('img');
          img.src = proj.image.src;
          img.alt = proj.image.alt || proj.title;
          img.loading = 'lazy';
          expBody.appendChild(img);
        } else if (proj.image.placeholder) {
          const ph = document.createElement('div');
          ph.className = 'placeholder-box';
          ph.setAttribute('aria-hidden', 'true');
          ph.innerHTML = `
            <svg class="placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" stroke-dasharray="3 3"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
            <span class="placeholder-text font-mono">${proj.image.placeholder}</span>
          `;
          expBody.appendChild(ph);
        }
      }

      // Tags
      if (proj.tags && proj.tags.length > 0) {
        const tagCloud = document.createElement('div');
        tagCloud.className = 'tag-cloud';
        proj.tags.forEach((tag) => {
          const chip = document.createElement('span');
          chip.className = 'tag-chip';
          chip.textContent = tag;
          tagCloud.appendChild(chip);
        });
        expBody.appendChild(tagCloud);
      }

      // Link (only if non-empty)
      if (proj.link && proj.link.trim() !== '') {
        const link = document.createElement('a');
        link.className = 'project-link-action';
        link.href = proj.link;
        link.textContent = 'View project specifications →';
        expBody.appendChild(link);
      }

      details.appendChild(summary);
      details.appendChild(expBody);
      compactList.appendChild(details);
    });

    compactSection.appendChild(compactList);
    projectsContainer.appendChild(compactSection);
  }

  container.appendChild(header);
  container.appendChild(projectsContainer);
  section.appendChild(container);

  return section;
}
