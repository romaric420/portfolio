import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { Download, ArrowUpRight } from 'lucide-react';
import '../styles/Navbar.css';

const MOBILE_BREAKPOINT = 1024;

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

const Navbar = ({ onProjectsClick }) => {
  const { translations, lang, toggleLang } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);
  const toggleRef = useRef(null);
  const pendingScroll = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position here
      const sections = ['home', 'about', 'skills', 'experience', 'contact'];
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Menu mobile : verrouillage du scroll, fermeture avec Échap, clic extérieur ou passage en desktop
  useEffect(() => {
    if (!mobileOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKey = (e) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        toggleRef.current?.focus();
      }
    };
    const handlePointer = (e) => {
      if (navRef.current && !navRef.current.querySelector('.navbar-container').contains(e.target)) {
        setMobileOpen(false);
      }
    };
    const handleResize = () => {
      if (window.innerWidth > MOBILE_BREAKPOINT) setMobileOpen(false);
    };

    document.addEventListener('keydown', handleKey);
    document.addEventListener('pointerdown', handlePointer);
    window.addEventListener('resize', handleResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      // Le scroll vers la section demandée ne part qu'une fois la page déverrouillée
      pendingScroll.current?.();
      pendingScroll.current = null;
      document.removeEventListener('keydown', handleKey);
      document.removeEventListener('pointerdown', handlePointer);
      window.removeEventListener('resize', handleResize);
    };
  }, [mobileOpen]);

  const scrollToSection = (sectionId) => {
    const go = () => {
      if (sectionId === 'projects') {
        onProjectsClick();
      } else {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }
    };

    if (sectionId !== 'projects') setActiveSection(sectionId);

    if (mobileOpen) {
      pendingScroll.current = go;
      setMobileOpen(false);
    } else {
      go();
    }
  };

  const nav = translations.nav || {};

  const navItems = [
    { id: 'home', label: nav.home },
    { id: 'about', label: nav.about },
    { id: 'skills', label: nav.skills },
    { id: 'projects', label: nav.projects },
    { id: 'experience', label: nav.experience },
    { id: 'contact', label: nav.contact }
  ];

  return (
    <nav
      ref={navRef}
      className={`navbar ${isScrolled ? 'scrolled' : ''} ${mobileOpen ? 'menu-open' : ''}`}
    >
      {/* Mobile backdrop */}
      <div className="nav-backdrop" aria-hidden="true" />

      <div className="navbar-container">
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
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="navbar-actions">
          {/* Language Toggle */}
          <LangSwitch lang={lang} onToggle={toggleLang} />

          {/* CV Download */}
          <a href="/cv/CV_2026-03-11_Romaric_TCHOFFO.pdf" download className="navbar-cta">
            <Download size={16} />
            <span>CV</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            ref={toggleRef}
            type="button"
            className={`mobile-toggle ${mobileOpen ? 'active' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
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
          <p className="mobile-menu-label">Menu</p>
          <ul className="mobile-menu-list">
            {navItems.map((item, i) => (
              <li key={item.id} className="mobile-menu-item" style={{ '--i': i }}>
                <button
                  type="button"
                  className={`mobile-link ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => scrollToSection(item.id)}
                  tabIndex={mobileOpen ? 0 : -1}
                >
                  <span className="mobile-link-index">{String(i + 1).padStart(2, '0')}</span>
                  <span className="mobile-link-label">{item.label}</span>
                  <ArrowUpRight className="mobile-link-arrow" size={18} />
                </button>
              </li>
            ))}
          </ul>
          <div className="mobile-menu-actions" style={{ '--i': navItems.length }}>
            <LangSwitch lang={lang} onToggle={toggleLang} tabIndex={mobileOpen ? 0 : -1} />
            <a
              href="/cv/CV_2026-03-11_Romaric_TCHOFFO.pdf"
              download
              className="navbar-cta"
              tabIndex={mobileOpen ? 0 : -1}
            >
              <Download size={16} />
              <span>CV</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
