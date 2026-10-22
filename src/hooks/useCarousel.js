import { useEffect, useRef, useState } from 'react';

// Sur mobile, les blocs défilent un par un au lieu de s'empiler
export const CAROUSEL_QUERY = '(max-width: 640px)';
const SWIPE_THRESHOLD = 40;

export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);
  return matches;
};

/**
 * Carrousel automatique : un bloc à la fois, rotation toutes les `duration` ms.
 * Pause quand le carrousel est hors écran, quand l'onglet est caché ou pendant un toucher.
 * Renvoie l'état, la navigation, la ref à poser sur le conteneur et les gestes de balayage.
 */
export default function useCarousel(count, { enabled = true, duration = 4500 } = {}) {
  // `previous` sert à animer la sortie du bloc qu'on quitte
  const [slide, setSlide] = useState({ active: 0, previous: null, backwards: false });
  const { active, previous, backwards } = slide;
  const [inView, setInView] = useState(false);
  const [held, setHeld] = useState(false);
  const [tabHidden, setTabHidden] = useState(() => document.hidden);
  const remainingRef = useRef(duration);
  const rootRef = useRef(null);
  const touchStartRef = useRef(null);

  const paused = !enabled || !inView || held || tabHidden || count < 2;

  const goTo = (index, isBackwards = false) => {
    const next = ((index % count) + count) % count;
    if (next === active) return;
    remainingRef.current = duration;
    setSlide({ active: next, previous: active, backwards: isBackwards });
  };

  useEffect(() => {
    if (paused) return undefined;
    let fired = false;
    const start = performance.now();
    const id = window.setTimeout(() => {
      fired = true;
      remainingRef.current = duration;
      setSlide((s) => ({ active: (s.active + 1) % count, previous: s.active, backwards: false }));
    }, remainingRef.current);
    return () => {
      window.clearTimeout(id);
      if (!fired) {
        remainingRef.current = Math.max(0, remainingRef.current - (performance.now() - start));
      }
    };
  }, [active, paused, count, duration]);

  useEffect(() => {
    const node = rootRef.current;
    if (!enabled || !node || !('IntersectionObserver' in window)) {
      setInView(true);
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [enabled]);

  useEffect(() => {
    const onVisibility = () => setTabHidden(document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  const swipeHandlers = enabled
    ? {
        onTouchStart: (e) => {
          touchStartRef.current = e.touches[0].clientX;
          setHeld(true);
        },
        onTouchEnd: (e) => {
          setHeld(false);
          if (touchStartRef.current === null) return;
          const dx = e.changedTouches[0].clientX - touchStartRef.current;
          touchStartRef.current = null;
          if (Math.abs(dx) < SWIPE_THRESHOLD) return;
          if (dx < 0) goTo(active + 1);
          else goTo(active - 1, true);
        },
        onTouchCancel: () => setHeld(false),
      }
    : {};

  return { active, previous, backwards, paused, goTo, rootRef, swipeHandlers, duration };
}
