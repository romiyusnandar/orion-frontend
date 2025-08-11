import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export type Theme = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'theme';

function getSystemPrefersDark() {
  if (!browser) return false;
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function applyDomTheme(theme: Theme) {
  if (!browser) return;
  const root = document.documentElement;
  const prefersDark = getSystemPrefersDark();
  const isDark = theme === 'dark' || (theme === 'system' && prefersDark);
  root.classList.toggle('dark', isDark);
  root.style.colorScheme = isDark ? 'dark' : 'light';
}

const initialTheme: Theme = browser
  ? ((localStorage.getItem(STORAGE_KEY) as Theme) || 'system')
  : 'system';

export const theme = writable<Theme>(initialTheme, (set) => {
  if (!browser) return;
  // Apply immediately
  applyDomTheme(initialTheme);
  // Listen to system changes only when theme === 'system'
  const mql = window.matchMedia('(prefers-color-scheme: dark)');
  const onChange = () => {
    let current: Theme = initialTheme;
    const unsubscribe = theme.subscribe((t) => (current = t));
    unsubscribe();
    if (current === 'system') applyDomTheme(current);
  };
  mql.addEventListener?.('change', onChange);
  return () => mql.removeEventListener?.('change', onChange);
});

export function setTheme(next: Theme) {
  theme.set(next);
  if (browser) {
    if (next === 'system') localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, next);
    applyDomTheme(next);
  }
}
