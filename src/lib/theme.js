/**
 * Theme controller: supports Light / Dark modes, syncs with system preference,
 * and persists user selection in localStorage.
 */

const STORAGE_KEY = 'portfolio-theme';

export function getPreferredTheme() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'dark' || stored === 'light') {
    return stored;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

export function initTheme(toggleElement) {
  let currentTheme = getPreferredTheme();
  applyTheme(currentTheme);
  updateToggleText(toggleElement, currentTheme);

  // Listen to system preference changes if user hasn't explicitly set localStorage
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      currentTheme = e.matches ? 'dark' : 'light';
      applyTheme(currentTheme);
      updateToggleText(toggleElement, currentTheme);
    }
  });

  if (toggleElement) {
    toggleElement.addEventListener('click', () => {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      localStorage.setItem(STORAGE_KEY, currentTheme);
      applyTheme(currentTheme);
      updateToggleText(toggleElement, currentTheme);
    });
  }

  return currentTheme;
}

function updateToggleText(btn, theme) {
  if (!btn) return;
  const isDark = theme === 'dark';
  btn.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} mode`);
  btn.textContent = isDark ? '[ Mode: Dark ]' : '[ Mode: Light ]';
}
