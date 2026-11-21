/**
 * Scroll reveal observer: reveals elements once when entering viewport,
 * with immediate viewport check and fallback timeout for reliability.
 */
export function initReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    elements.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '100px 0px 50px 0px',
    threshold: 0.01
  });

  elements.forEach(el => {
    // Immediately mark visible if already within or near viewport
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight + 200) {
      el.classList.add('is-visible');
    } else {
      observer.observe(el);
    }
  });

  // Fail-safe: ensure all content is visible after 1.5s even if observer fails or doesn't fire
  setTimeout(() => {
    elements.forEach(el => el.classList.add('is-visible'));
  }, 1500);
}
