import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation.jsx';
import '../styles/QuoteToast.css';

const FIRST_DELAY = 600;
const VISIBLE_TIME = 9000;
const LEAVE_TIME = 450;
const GAP_TIME = 1500;
const SNOOZE_TIME = 20000;
// Sur téléphone la bulle couvre une bonne part de l'écran : elle revient beaucoup moins souvent
const MOBILE_QUERY = '(max-width: 639px)';
const MOBILE_GAP_TIME = 20000;
const MOBILE_SNOOZE_TIME = 60000;

// Petit réseau de neurones décoratif en fond de bulle
const NODES = [[12, 60], [34, 22], [36, 66], [62, 40], [86, 14], [90, 58], [112, 32]];
const LINKS = [[0, 1], [0, 2], [1, 3], [2, 3], [3, 4], [3, 5], [4, 6], [5, 6]];

/**
 * Bulle flottante qui fait défiler des citations IA / Data.
 * Cycle : apparition dès l'arrivée → visible (9 s) → sortie (450 ms) → attente (1,5 s) → citation suivante.
 * Fermer la bulle ne l'arrête pas : elle revient avec la citation suivante 20 s plus tard.
 * Sur téléphone, l'attente passe à 20 s (60 s après une fermeture) pour ne pas masquer le contenu.
 */
const QuoteToast = () => {
  const { translations } = useTranslation();
  const t = translations.quotes || {};
  const items = t.items || [];

  const [phase, setPhase] = useState('waiting'); // 'waiting' | 'visible' | 'leaving'
  const [index, setIndex] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [tabHidden, setTabHidden] = useState(() => document.hidden);

  const remainingRef = useRef(FIRST_DELAY);
  const snoozedRef = useRef(false);
  // Durée imposée pour la prochaine phase (appliquée après le nettoyage du minuteur en cours)
  const nextDurationRef = useRef(null);
  const rootRef = useRef(null);

  const paused = tabHidden || (phase === 'visible' && (hovered || focused));

  // Minuteur du cycle, mis en pause en gardant le temps restant
  useEffect(() => {
    if (paused || items.length === 0) return undefined;
    if (nextDurationRef.current !== null) {
      remainingRef.current = nextDurationRef.current;
      nextDurationRef.current = null;
    }

    let fired = false;
    const start = performance.now();
    const id = window.setTimeout(() => {
      fired = true;
      if (phase === 'waiting') {
        remainingRef.current = VISIBLE_TIME;
        setCycle((c) => c + 1);
        setPhase('visible');
      } else if (phase === 'visible') {
        remainingRef.current = LEAVE_TIME;
        setPhase('leaving');
      } else {
        // Après une fermeture, la pause est plus longue avant la citation suivante
        const mobile = window.matchMedia(MOBILE_QUERY).matches;
        if (snoozedRef.current) {
          remainingRef.current = mobile ? MOBILE_SNOOZE_TIME : SNOOZE_TIME;
        } else {
          remainingRef.current = mobile ? MOBILE_GAP_TIME : GAP_TIME;
        }
        snoozedRef.current = false;
        setIndex((i) => (i + 1) % items.length);
        setPhase('waiting');
      }
    }, remainingRef.current);

    return () => {
      window.clearTimeout(id);
      if (!fired) {
        remainingRef.current = Math.max(0, remainingRef.current - (performance.now() - start));
      }
    };
  }, [phase, paused, items.length]);

  // Le survol et le focus ne comptent que pendant l'affichage
  useEffect(() => {
    if (phase !== 'visible') {
      setHovered(false);
      setFocused(false);
    }
  }, [phase]);

  // Pause quand l'onglet est caché
  useEffect(() => {
    const onVisibility = () => setTabHidden(document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  const shown = phase === 'visible';

  // Bulle cachée : hors de l'ordre de tabulation et ignorée par les lecteurs d'écran
  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    if (shown) node.removeAttribute('inert');
    else node.setAttribute('inert', '');
  }, [shown]);

  // Fermer : la bulle sort normalement, puis la citation suivante revient après SNOOZE_TIME
  const handleClose = () => {
    if (phase !== 'visible') return;
    snoozedRef.current = true;
    nextDurationRef.current = LEAVE_TIME;
    setPhase('leaving');
  };

  const handleBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
  };

  if (items.length === 0) return null;
  const quote = items[index % items.length];
  const words = quote.text.split(' ');

  return (
    <aside
      ref={rootRef}
      className={`quote-toast ${shown ? 'is-shown' : ''} ${paused ? 'is-paused' : ''}`}
      aria-label={t.label}
      aria-hidden={!shown}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={handleBlur}
    >
      <span className="quote-toast-border" aria-hidden="true" />

      <span className="quote-toast-deco" aria-hidden="true">
        <span className="quote-toast-grid" />
        <span className="quote-toast-orb quote-toast-orb--a" />
        <span className="quote-toast-orb quote-toast-orb--b" />
        <svg className="quote-toast-network" viewBox="0 0 124 80">
          {LINKS.map(([a, b]) => (
            <line key={`${a}-${b}`} x1={NODES[a][0]} y1={NODES[a][1]} x2={NODES[b][0]} y2={NODES[b][1]} />
          ))}
          {NODES.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="2.6" style={{ '--n': i }} />
          ))}
        </svg>
        <span className="quote-toast-watermark">”</span>
      </span>

      <div className="quote-toast-header">
        <span className="quote-toast-mark" aria-hidden="true">“</span>
        <span className="quote-toast-label">{t.label}</span>
        <button
          type="button"
          className="quote-toast-close"
          onClick={handleClose}
          aria-label={t.close}
          title={t.close}
        >
          <X size={16} strokeWidth={2.2} />
        </button>
      </div>

      <figure className="quote-toast-body">
        <blockquote className="quote-toast-text" title={quote.text}>
          <p key={cycle}>
            {words.map((word, i) => (
              <React.Fragment key={i}>
                <span className="quote-toast-word" style={{ '--w': i }}>{word}</span>
                {i < words.length - 1 ? ' ' : null}
              </React.Fragment>
            ))}
          </p>
        </blockquote>
        <figcaption className="quote-toast-author">
          <strong>{quote.author}</strong>
          <span className="quote-toast-role">{quote.role}</span>
        </figcaption>
      </figure>

      <span key={cycle} className="quote-toast-progress" aria-hidden="true" />
    </aside>
  );
};

export default QuoteToast;
