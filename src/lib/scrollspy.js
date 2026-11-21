/**
 * Scrollspy: highlights the active navigation link based on current section in viewport.
 */
export function initScrollspy(navSelector = '.site-nav') {
  const nav = document.querySelector(navSelector);
  if (!nav) return;

  const navLinks = Array.from(nav.querySelectorAll('.nav-link'));
  if (!navLinks.length) return;

  const sectionIds = navLinks
    .map(link => link.getAttribute('href'))
    .filter(href => href && href.startsWith('#'))
    .map(href => href.slice(1));

  const sections = sectionIds
    .map(id => document.getElementById(id))
    .filter(Boolean);

  if (!sections.length) return;

  function setActiveLink(activeId) {
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${activeId}`) {
        link.classList.add('is-active');
        link.setAttribute('aria-current', 'true');
      } else {
        link.classList.remove('is-active');
        link.removeAttribute('aria-current');
      }
    });
  }

  // Use IntersectionObserver with rootMargin tuned for header offset
  const observer = new IntersectionObserver(
    (entries) => {
      // Find visible entries
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visible.length > 0) {
        setActiveLink(visible[0].target.id);
      }
    },
    {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: [0.1, 0.5]
    }
  );

  sections.forEach(sec => observer.observe(sec));

  // Handle scroll to top (if hero or top of page, no nav item may be active or first is active)
  window.addEventListener('scroll', () => {
    if (window.scrollY < 120 && sections.length > 0) {
      setActiveLink('');
    }
  }, { passive: true });
}
