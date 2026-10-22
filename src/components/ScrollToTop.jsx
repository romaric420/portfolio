import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation.jsx';
import '../styles/ScrollToTop.css';

const RADIUS = 22;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const SHOW_AFTER = 300;

const ScrollToTop = () => {
  const { translations } = useTranslation();
  const label = translations.footer?.backToTop || 'Back to top';
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const scrollY = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setVisible(scrollY > SHOW_AFTER);
      setProgress(max > 0 ? Math.min(scrollY / max, 1) : 0);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const [launching, setLaunching] = useState(false);

  const scrollToTop = () => {
    setLaunching(true);
    window.setTimeout(() => setLaunching(false), 700);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      className={`scroll-top ${visible ? 'is-visible' : ''} ${launching ? 'is-launching' : ''}`}
      onClick={scrollToTop}
      aria-label={label}
      title={label}
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
    >
      <span className="scroll-top-halo" aria-hidden="true" />
      <span className="scroll-top-halo scroll-top-halo--delay" aria-hidden="true" />
      <svg className="scroll-top-ring" viewBox="0 0 52 52" aria-hidden="true">
        <defs>
          <linearGradient id="scroll-top-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
        <circle className="scroll-top-track" cx="26" cy="26" r={RADIUS} />
        <circle
          className="scroll-top-progress"
          cx="26"
          cy="26"
          r={RADIUS}
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
        />
      </svg>
      <span className="scroll-top-core">
        <span className="scroll-top-arrows">
          <ArrowUp className="scroll-top-icon" size={20} strokeWidth={2.4} />
          <ArrowUp className="scroll-top-icon scroll-top-icon--next" size={20} strokeWidth={2.4} />
        </span>
      </span>
    </button>
  );
};

export default ScrollToTop;
