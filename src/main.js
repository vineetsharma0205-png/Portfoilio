import './styles/tokens.css';
import './styles/base.css';
import './styles/components.css';

import siteData from './content/site.json';

import { renderHeader } from './render/header.js';
import { renderHero } from './render/hero.js';
import { renderAbout } from './render/about.js';
import { renderExperience } from './render/experience.js';
import { renderProjects } from './render/projects.js';
import { renderSkills } from './render/skills.js';
import { renderCertifications } from './render/certifications.js';
import { renderContact } from './render/contact.js';
import { renderFooter } from './render/footer.js';

import { initTheme } from './lib/theme.js';
import { initReveal } from './lib/reveal.js';
import { initScrollspy } from './lib/scrollspy.js';
import { initContactForm } from './lib/form.js';

/**
 * Synchronize document head metadata and JSON-LD schema with site.json
 */
function syncMetadata(data) {
  if (data.meta) {
    if (data.meta.title) document.title = data.meta.title;

    const setMeta = (name, content, attr = 'name') => {
      if (!content) return;
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', data.meta.description);
    setMeta('og:title', data.meta.title, 'property');
    setMeta('og:description', data.meta.description, 'property');
    setMeta('og:url', data.meta.siteUrl, 'property');
    setMeta('og:image', `${data.meta.siteUrl}${data.meta.ogImage}`, 'property');
    setMeta('twitter:title', data.meta.title, 'name');
    setMeta('twitter:description', data.meta.description, 'name');
    setMeta('twitter:image', `${data.meta.siteUrl}${data.meta.ogImage}`, 'name');

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', data.meta.siteUrl);
  }

  // JSON-LD Person Schema
  let scriptLd = document.getElementById('json-ld-person');
  if (!scriptLd) {
    scriptLd = document.createElement('script');
    scriptLd.id = 'json-ld-person';
    scriptLd.type = 'application/ld+json';
    document.head.appendChild(scriptLd);
  }

  const sameAsLinks = [data.identity.github, data.identity.linkedin].filter(link => link && link.trim() !== '');

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: data.identity.name,
    url: data.meta.siteUrl,
    jobTitle: 'Mechanical Engineering Student',
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Indian Institute of Information Technology, Design and Manufacturing, Kurnool',
      alternateName: 'IIITDM Kurnool'
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: data.identity.location
    },
    sameAs: sameAsLinks
  };

  scriptLd.textContent = JSON.stringify(personSchema, null, 2);
}

/**
 * Bootstrap and render the application DOM
 */
function init() {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = '';
  syncMetadata(siteData);

  // 1. Header (receives identity and active sections array)
  const headerEl = renderHeader({
    identity: siteData.identity,
    sections: siteData.sections || []
  });
  app.appendChild(headerEl);

  // 2. Main content wrapper
  const mainEl = document.createElement('main');
  mainEl.id = 'main-content';

  // 3. Hero Section (always at start of main)
  if (siteData.hero) {
    const heroEl = renderHero({
      hero: siteData.hero,
      identity: siteData.identity
    });
    mainEl.appendChild(heroEl);
  }

  // 4. Dynamic Section Rendering
  // Sections are ordered and filtered strictly according to siteData.sections
  const sectionRegistry = {
    about: (indexStr) => siteData.about ? renderAbout(siteData.about, indexStr) : null,
    experience: (indexStr) => siteData.experience ? renderExperience(siteData.experience, indexStr) : null,
    projects: (indexStr) => siteData.projects ? renderProjects(siteData.projects, indexStr) : null,
    skills: (indexStr) => siteData.skills ? renderSkills(siteData.skills, indexStr) : null,
    certifications: (indexStr) => siteData.certifications ? renderCertifications(siteData.certifications, indexStr) : null,
    contact: (indexStr) => siteData.contact ? renderContact({ contact: siteData.contact, identity: siteData.identity }, indexStr) : null
  };

  const sectionsList = siteData.sections || [];
  sectionsList.forEach((sectionKey, index) => {
    const renderFn = sectionRegistry[sectionKey];
    if (renderFn) {
      const indexStr = String(index + 1).padStart(2, '0');
      const sectionEl = renderFn(indexStr);
      if (sectionEl) {
        mainEl.appendChild(sectionEl);
      }
    }
  });

  app.appendChild(mainEl);

  // 5. Footer
  const footerEl = renderFooter({
    footer: siteData.footer || {},
    identity: siteData.identity
  });
  app.appendChild(footerEl);

  // 6. Interactive Behaviors
  initTheme(document.getElementById('theme-toggle-btn'));
  initReveal();
  initScrollspy('.site-nav');
  initContactForm(document.getElementById('contact-form'), siteData.identity.email);
}

// Run on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
