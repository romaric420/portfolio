import { useState, useEffect } from 'react';
import { flushSync } from 'react-dom';

// Couleur de la barre du navigateur mobile, alignée sur --bg-primary
const THEME_COLORS = { light: '#f7f9fc', dark: '#0b1120' };
const DARK_QUERY = '(prefers-color-scheme: dark)';

// Thème posé sur <html data-theme> par le script inline d'index.html avant le premier rendu
const initialTheme = () =>
  document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';

const useTheme = () => {
  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme]);
  }, [theme]);

  // Le thème de l'appareil fait foi : on le suit s'il change pendant la visite (passage auto en sombre le soir…)
  useEffect(() => {
    const media = window.matchMedia(DARK_QUERY);
    const follow = (e) => setTheme(e.matches ? 'dark' : 'light');
    media.addEventListener('change', follow);
    return () => media.removeEventListener('change', follow);
  }, []);

  // Choix manuel valable pour la visite en cours uniquement (non mémorisé)
  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Fondu enchaîné entre les deux thèmes quand le navigateur le permet
    if (document.startViewTransition && !reduceMotion) {
      document.startViewTransition(() => {
        flushSync(() => setTheme(next));
        document.documentElement.dataset.theme = next;
      });
    } else {
      setTheme(next);
    }
  };

  return { theme, toggleTheme };
};

export default useTheme;
