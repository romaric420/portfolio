/**
 * Transitions de navigation : défilement animé vers une section (courbe, barre de
 * progression et animation d'arrivée propres à chaque section) et rideau plein écran
 * pour les changements de page.
 */

const easings = {
  inOutCubic: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  outQuart: (t) => 1 - Math.pow(1 - t, 4),
  inOutExpo: (t) =>
    t === 0 ? 0 : t === 1 ? 1 : t < 0.5 ? Math.pow(2, 20 * t - 10) / 2 : (2 - Math.pow(2, -20 * t + 10)) / 2,
  inOutQuint: (t) => (t < 0.5 ? 16 * t ** 5 : 1 - Math.pow(-2 * t + 2, 5) / 2),
  outExpo: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
};

// Chaque destination a son rythme, sa couleur de barre et son entrée
const SECTIONS = {
  home: { ease: easings.inOutCubic, speed: 1, bar: 'linear-gradient(90deg, #2563eb, #7c3aed)' },
  about: { ease: easings.outQuart, speed: 1.1, bar: 'linear-gradient(90deg, #0ea5e9, #2563eb)' },
  skills: { ease: easings.inOutExpo, speed: 1.25, bar: 'linear-gradient(90deg, #7c3aed, #ec4899)' },
  experience: { ease: easings.inOutQuint, speed: 1.15, bar: 'linear-gradient(90deg, #4f46e5, #14b8a6)' },
  contact: { ease: easings.outExpo, speed: 1.3, bar: 'linear-gradient(90deg, #ec4899, #7c3aed, #2563eb)' },
};

const prefersReducedMotion = () =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

let frame = null;
let cancelCurrent = null;

const getProgressBar = () => {
  let bar = document.querySelector('.nav-travel-bar');
  if (!bar) {
    bar = document.createElement('div');
    bar.className = 'nav-travel-bar';
    bar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bar);
  }
  return bar;
};

const playArrival = (el, id) => {
  const cls = `arrive-${id}`;
  el.classList.remove(cls);
  // Force un reflow pour pouvoir rejouer l'animation
  void el.offsetWidth;
  el.classList.add(cls);
  window.setTimeout(() => el.classList.remove(cls), 1400);
};

export const goToSection = (id) => {
  const el = document.getElementById(id);
  if (!el) return;

  const root = document.documentElement;
  const offset = parseFloat(getComputedStyle(root).scrollPaddingTop) || 0;
  const start = window.scrollY;
  const target = id === 'home' ? 0 : Math.max(0, el.getBoundingClientRect().top + start - offset);
  const distance = target - start;

  if (prefersReducedMotion()) {
    window.scrollTo({ top: target, behavior: 'auto' });
    return;
  }

  cancelCurrent?.();

  const config = SECTIONS[id] || SECTIONS.home;
  const duration = Math.min(1500, 550 + Math.abs(distance) * 0.3) * config.speed;
  const bar = getProgressBar();
  bar.style.background = config.bar;
  bar.style.transform = 'scaleX(0)';
  bar.classList.add('active');

  // Le smooth natif du <html> fausserait chaque pas de l'animation
  const previousBehavior = root.style.scrollBehavior;
  root.style.scrollBehavior = 'auto';

  let startTime = null;
  const finish = (arrived) => {
    cancelAnimationFrame(frame);
    frame = null;
    cancelCurrent = null;
    root.style.scrollBehavior = previousBehavior;
    bar.classList.remove('active');
    ['wheel', 'touchstart', 'keydown'].forEach((evt) => window.removeEventListener(evt, interrupt));
    if (arrived) playArrival(el, id);
  };
  // L'utilisateur reprend la main dès qu'il fait défiler lui-même
  const interrupt = () => finish(false);
  cancelCurrent = interrupt;
  ['wheel', 'touchstart', 'keydown'].forEach((evt) =>
    window.addEventListener(evt, interrupt, { passive: true })
  );

  if (Math.abs(distance) < 4) {
    finish(true);
    return;
  }

  const step = (now) => {
    if (startTime === null) startTime = now;
    const progress = Math.min(1, (now - startTime) / duration);
    window.scrollTo(0, start + distance * config.ease(progress));
    bar.style.transform = `scaleX(${progress})`;
    if (progress < 1) {
      frame = requestAnimationFrame(step);
    } else {
      finish(true);
    }
  };
  frame = requestAnimationFrame(step);
};

/**
 * Rideau en dégradé qui couvre l'écran, change la page dessous, puis se retire.
 * `variant` : 'to-projects' | 'to-home'
 */
export const pageTransition = (swap, variant) => {
  const done = () => {
    swap();
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  if (prefersReducedMotion() || document.querySelector('.page-curtain')) {
    done();
    return;
  }

  const curtain = document.createElement('div');
  curtain.className = `page-curtain ${variant}`;
  curtain.setAttribute('aria-hidden', 'true');
  document.body.appendChild(curtain);

  // Seules les animations du rideau lui-même comptent, pas celles de son décor
  const isCurtain = (e) => e.target === curtain && !e.pseudoElement;

  curtain.addEventListener('animationend', function handleIn(e) {
    if (!isCurtain(e)) return;
    curtain.removeEventListener('animationend', handleIn);
    done();
    // Laisse React peindre la nouvelle page avant de lever le rideau
    requestAnimationFrame(() => requestAnimationFrame(() => {
      curtain.classList.add('leave');
      curtain.addEventListener('animationend', function handleOut(ev) {
        if (!isCurtain(ev)) return;
        curtain.remove();
      });
    }));
  });
};
