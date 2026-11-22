/**
 * Gatefold Blueprint Drawer module (Paul Fey Case Study Drawer)
 * Provides slide-out technical dossier inspection with full CAD/FEA renders,
 * engineering chapters (Side A / Side B), and liner notes specifications.
 */

let currentDrawerEl = null;
let currentBackdropEl = null;

export function initBlueprintDrawer() {
  // Remove existing if any
  const existingBackdrop = document.querySelector('.blueprint-drawer-backdrop');
  if (existingBackdrop) existingBackdrop.remove();

  const existingDrawer = document.querySelector('.blueprint-drawer');
  if (existingDrawer) existingDrawer.remove();

  // Create backdrop
  const backdrop = document.createElement('div');
  backdrop.className = 'blueprint-drawer-backdrop';
  backdrop.setAttribute('aria-hidden', 'true');

  // Create drawer container
  const drawer = document.createElement('div');
  drawer.className = 'blueprint-drawer';
  drawer.setAttribute('role', 'dialog');
  drawer.setAttribute('aria-modal', 'true');
  drawer.setAttribute('aria-label', 'Engineering Blueprint Dossier');

  document.body.appendChild(backdrop);
  document.body.appendChild(drawer);

  currentBackdropEl = backdrop;
  currentDrawerEl = drawer;

  // Close handlers
  backdrop.addEventListener('click', closeBlueprintDrawer);
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
      closeBlueprintDrawer();
    }
  });

  return { drawer, backdrop };
}

export function openBlueprintDrawer(project, catalogIndex = 1) {
  if (!currentDrawerEl || !currentBackdropEl) {
    initBlueprintDrawer();
  }

  const catalogId = `DWG-${String(catalogIndex).padStart(3, '0')}`;
  const drawer = currentDrawerEl;
  const backdrop = currentBackdropEl;

  drawer.innerHTML = `
    <header class="drawer-header">
      <div class="drawer-header-meta font-mono">
        <span>SPEC FILE // ${catalogId}</span>
        <span style="opacity: 0.5;">·</span>
        <span>${project.start} — ${project.end}</span>
      </div>
      <button type="button" class="btn-close-drawer font-mono" id="close-dossier-btn" aria-label="Close dossier">
        [ Close Dossier ✕ ]
      </button>
    </header>

    <div class="drawer-content">
      <h2 class="drawer-title">${project.title}</h2>
      <p style="font-size: var(--text-base); line-height: 1.6; color: var(--gatefold-muted);">${project.summary}</p>

      ${project.image && project.image.src ? `
        <div class="drawer-visual-wrapper">
          <img src="${project.image.src}" alt="${project.image.alt || project.title}" loading="lazy">
        </div>
      ` : `
        <div class="placeholder-box" style="background-color: var(--gatefold-surface); border-color: var(--gatefold-line); min-height: 180px;">
          <svg class="placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2" stroke-dasharray="3 3"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
          </svg>
          <span class="placeholder-text font-mono" style="color: var(--gatefold-muted);">${project.image?.placeholder || 'Technical CAD / FEA Drawing Placeholder'}</span>
        </div>
      `}

      <!-- Engineering Liner Notes Specification Docket -->
      <div class="drawer-liner-notes">
        <div class="drawer-liner-title font-mono">Engineering Liner Notes & Specifications</div>
        <table class="drawer-liner-table">
          <tbody>
            <tr>
              <td class="drawer-liner-key">Catalog Ref</td>
              <td class="drawer-liner-val font-mono">${catalogId}</td>
            </tr>
            <tr>
              <td class="drawer-liner-key">Tools & Stack</td>
              <td class="drawer-liner-val font-mono">${(project.tags || []).join(' · ')}</td>
            </tr>
            <tr>
              <td class="drawer-liner-key">Project Cycle</td>
              <td class="drawer-liner-val font-mono">${project.start} — ${project.end}</td>
            </tr>
            <tr>
              <td class="drawer-liner-key">Dossier Type</td>
              <td class="drawer-liner-val font-mono">${project.featured ? 'Flagship Engineering System' : 'Subsystem / Analysis Study'}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Technical Chapters (Side A / Side B) -->
      <h3 class="drawer-chapters-title">Technical Breakdown & Findings</h3>
      <div style="display: flex; flex-direction: column; gap: var(--space-3);">
        ${(project.details || []).map((detail, idx) => `
          <div class="drawer-chapter-item">
            <div class="drawer-chapter-header font-mono">
              <span>SECTION 0${idx + 1} //</span>
              <span style="color: var(--gatefold-ink);">${idx === 0 ? 'SYSTEM GEOMETRY & ARCHITECTURE' : 'VALIDATION & MEASURED RESULTS'}</span>
            </div>
            <div class="drawer-chapter-body">${detail}</div>
          </div>
        `).join('')}
      </div>

      ${project.link && project.link.trim() !== '' ? `
        <div style="margin-top: var(--space-2); padding-top: var(--space-3); border-top: 1px dashed var(--gatefold-line);">
          <a href="${project.link}" class="btn btn-primary" style="display: inline-flex; width: auto;">
            <span>Open External Documentation</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      ` : ''}
    </div>
  `;

  // Attach close button handler
  drawer.querySelector('#close-dossier-btn')?.addEventListener('click', closeBlueprintDrawer);

  // Open with spring animation
  backdrop.classList.add('is-open');
  drawer.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

export function closeBlueprintDrawer() {
  if (currentDrawerEl && currentBackdropEl) {
    currentBackdropEl.classList.remove('is-open');
    currentDrawerEl.classList.remove('is-open');
    document.body.style.overflow = '';
  }
}
