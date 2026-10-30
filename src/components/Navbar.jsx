import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { ArrowUpRight, Moon, Sun } from 'lucide-react';
import { goToSection } from '../utils/sectionTransition';
import useTheme from '../hooks/useTheme';
import DocLinks from './DocLinks';
import '../styles/Navbar.css';

// Doit rester aligné sur le breakpoint du burger dans Navbar.css
const DESKTOP_QUERY = '(min-width: 1025px)';
const SECTION_IDS = ['home', 'about', 'skills', 'experience', 'contact'];
const ACTIVE_OFFSET = 150;
// Filet de sécurité si le défilement animé n'aboutit jamais (interrompu, page trop courte…)
const SCROLL_LOCK_MS = 2500;
// Le défilement vers la section attend que le menu mobile ait fini de se replier
const MENU_CLOSE_MS = 320;

// Interrupteur de langue : un seul bouton, la pastille glisse de FR à EN comme un switch on/off
const LangSwitch = ({ lang, onToggle, tabIndex }) => (
  <button
    type="button"
    role="switch"
    aria-checked={lang === 'en'}
    aria-label={lang === 'fr' ? 'Switch to English' : 'Passer en français'}
    className={`lang-toggle ${lang === 'en' ? 'is-en' : ''}`}
    onClick={onToggle}
    tabIndex={tabIndex}
  >
    <span className="lang-thumb" aria-hidden="true" />
    <span className={`lang-btn ${lang === 'fr' ? 'active' : ''}`}>FR</span>
    <span className={`lang-btn ${lang === 'en' ? 'active' : ''}`}>EN</span>
  </button>
);

// Bouton clair / sombre : le soleil et la lune pivotent l'un à la place de l'autre
const ThemeToggle = ({ theme, onToggle, labels }) => (
  <button
    type="button"
    className={`theme-toggle ${theme === 'dark' ? 'is-dark' : ''}`}
    onClick={onToggle}
    aria-label={theme === 'dark' ? labels.themeLight : labels.themeDark}
    title={theme === 'dark' ? labels.themeLight : labels.themeDark}
  >
    <Sun className="theme-icon theme-icon-sun" size={18} aria-hidden="true" />
    <Moon className="theme-icon theme-icon-moon" size={18} aria-hidden="true" />
  </button>
);

const Navbar = ({ onProjectsClick }) => {
  const { translations, lang, toggleLang } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);
  // Lien touché dans le menu mobile : reste en surbrillance pendant la fermeture
  const [chosen, setChosen] = useState(null);
  const containerRef = useRef(null);
  const toggleRef = useRef(null);
  const pendingScroll = useRef(null);
  // Section visée par un clic : la surbrillance ne bascule pas sur les sections traversées en chemin
  const scrollTarget = useRef(null);
  const scrollTargetTimer = useRef(null);

  // État « scrollé » et section active, recalculés au plus une fois par frame
  useEffect(() => {
    let frame = null;

    const update = () => {
      frame = null;
      const y = window.scrollY;
      setIsScrolled(y > 50);

      // En bas de page, la dernière section peut être trop courte pour atteindre le seuil
      const atBottom = window.innerHeight + y >= document.documentElement.scrollHeight - 2;
      let current = SECTION_IDS[0];
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= ACTIVE_OFFSET) current = id;
      }
      if (atBottom) current = SECTION_IDS[SECTION_IDS.length - 1];

      if (scrollTarget.current) {
        if (current !== scrollTarget.current) return;
        scrollTarget.current = null;
      }
      setActiveSection(current);
    };

    // L'utilisateur reprend la main : on revient au suivi normal du défilement
    const releaseTarget = () => {
      scrollTarget.current = null;
    };

    const schedule = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };

    const interruptions = ['wheel', 'touchstart'];

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    interruptions.forEach((evt) => window.addEventListener(evt, releaseTarget, { passive: true }));
    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      window.clearTimeout(scrollTargetTimer.current);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      interruptions.forEach((evt) => window.removeEventListener(evt, releaseTarget));
    };
  }, []);

  // Menu mobile : verrouillage du scroll, Échap, focus piégé, clic extérieur, passage en desktop
  useEffect(() => {
    if (!mobileOpen) return undefined;

    // Verrou sur <html> (fiable sur iOS) en compensant la barre de défilement pour éviter le saut
    const root = document.documentElement;
    root.style.setProperty('--scrollbar-comp', `${window.innerWidth - root.clientWidth}px`);
    root.classList.add('nav-locked');

    const close = () => setMobileOpen(false);

    const handleKey = (e) => {
      if (e.key === 'Escape') {
        close();
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== 'Tab' || !containerRef.current) return;

      // Le focus tourne entre le burger et les éléments du menu
      const focusables = [...containerRef.current.querySelectorAll('a[href], button')].filter(
        (el) => el.tabIndex >= 0 && el.offsetParent !== null
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const handlePointer = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) close();
    };
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const handleBreakpoint = () => {
      if (desktop.matches) close();
    };

    document.addEventListener('keydown', handleKey);
    document.addEventListener('pointerdown', handlePointer);
    desktop.addEventListener('change', handleBreakpoint);
    return () => {
      root.classList.remove('nav-locked');
      root.style.removeProperty('--scrollbar-comp');
      // Le scroll vers la section demandée ne part qu'une fois la page déverrouillée et le menu replié
      const run = pendingScroll.current;
      pendingScroll.current = null;
      if (run) {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.setTimeout(run, reduceMotion ? 0 : MENU_CLOSE_MS);
      }
      document.removeEventListener('keydown', handleKey);
      document.removeEventListener('pointerdown', handlePointer);
      desktop.removeEventListener('change', handleBreakpoint);
    };
  }, [mobileOpen]);

  const scrollToSection = (sectionId) => {
    const go = () => {
      if (sectionId === 'projects') {
        onProjectsClick();
      } else {
        goToSection(sectionId);
      }
    };

    if (sectionId !== 'projects') {
      setActiveSection(sectionId);
      scrollTarget.current = sectionId;
      window.clearTimeout(scrollTargetTimer.current);
      scrollTargetTimer.current = window.setTimeout(() => {
        scrollTarget.current = null;
      }, SCROLL_LOCK_MS);
    }

    if (mobileOpen) {
      pendingScroll.current = go;
      setChosen(sectionId);
      setMobileOpen(false);
    } else {
      go();
    }
  };

  const nav = translations.nav || {};
  const menuTabIndex = mobileOpen ? 0 : -1;

  const navItems = [
    { id: 'home', label: nav.home },
    { id: 'about', label: nav.about },
    { id: 'skills', label: nav.skills },
    { id: 'projects', label: nav.projects },
    { id: 'experience', label: nav.experience },
    { id: 'contact', label: nav.contact }
  ];

  const toggleLabel = lang === 'fr'
    ? (mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu')
    : (mobileOpen ? 'Close menu' : 'Open menu');

  return (
    <nav
      className={`navbar ${isScrolled ? 'scrolled' : ''} ${mobileOpen ? 'menu-open' : ''}`}
      aria-label={lang === 'fr' ? 'Navigation principale' : 'Main navigation'}
    >
      {/* Mobile backdrop */}
      <div className="nav-backdrop" aria-hidden="true" />

      <div className="navbar-container" ref={containerRef}>
        {/* Logo */}
        <a href="#home" className="navbar-logo" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>
          <div className="logo-icon">R</div>
          <span className="logo-text">Romaric</span>
        </a>

        {/* Desktop Navigation */}
        <div className="navbar-links">
          {navItems.map(item => (
            <button
              type="button"
              key={item.id}
              className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => scrollToSection(item.id)}
              aria-current={activeSection === item.id ? 'true' : undefined}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="navbar-actions">
          {/* Thème clair / sombre */}
          <ThemeToggle theme={theme} onToggle={toggleTheme} labels={nav} />

          {/* Language Toggle */}
          <LangSwitch lang={lang} onToggle={toggleLang} />

          {/* CV + lettre de motivation */}
          <DocLinks />

          {/* Mobile Menu Toggle */}
          <button
            ref={toggleRef}
            type="button"
            className={`mobile-toggle ${mobileOpen ? 'active' : ''}`}
            onClick={() => {
              if (!mobileOpen) setChosen(null);
              setMobileOpen(!mobileOpen);
            }}
            aria-label={toggleLabel}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          className={`mobile-menu ${mobileOpen ? 'open' : ''}`}
          style={{ '--count': navItems.length }}
        >
          {/* Décor dans son propre calque : il ne doit pas agrandir la zone défilable */}
          <span className="mobile-menu-decor" aria-hidden="true" />

          <p className="mobile-menu-label">Menu</p>
          <ul className="mobile-menu-list">
            {navItems.map((item, i) => (
              <li
                key={item.id}
                className={`mobile-menu-item ${chosen === item.id ? 'is-chosen' : ''}`}
                style={{ '--i': i }}
              >
                <button
                  type="button"
                  className={`mobile-link ${activeSection === item.id ? 'active' : ''} ${chosen === item.id ? 'is-chosen' : ''}`}
                  onClick={() => scrollToSection(item.id)}
                  tabIndex={menuTabIndex}
                  aria-current={activeSection === item.id ? 'true' : undefined}
                >
                  <span className="mobile-link-label">{item.label}</span>
                  <ArrowUpRight className="mobile-link-arrow" size={18} />
                </button>
              </li>
            ))}
          </ul>
          <div className="mobile-menu-actions" style={{ '--i': navItems.length }}>
            <LangSwitch lang={lang} onToggle={toggleLang} tabIndex={menuTabIndex} />
            <DocLinks tabIndex={menuTabIndex} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
