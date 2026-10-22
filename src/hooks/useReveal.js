import { useEffect } from 'react';

/**
 * Révèle en douceur les éléments marqués `data-reveal` quand ils entrent à l'écran.
 * Si IntersectionObserver n'existe pas, tout est affiché directement.
 */
export default function useReveal(deps = []) {
  useEffect(() => {
    const root = document.documentElement;
    const elements = Array.from(document.querySelectorAll('[data-reveal]:not(.is-visible)'));

    if (!('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('is-visible'));
      return undefined;
    }

    root.classList.add('reveal-ready');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
