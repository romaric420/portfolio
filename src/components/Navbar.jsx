import React, { useState, useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { Download } from 'lucide-react';
import '../styles/Navbar.css';

const Navbar = ({ onProjectsClick }) => {
  const { translations, lang, setLanguage } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
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

  const scrollToSection = (sectionId) => {
    setMobileOpen(false);
    if (sectionId === 'projects') {
      onProjectsClick();
    } else {
      setActiveSection(sectionId);
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
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
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo */}
        <a href="#home" className="navbar-logo" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>
          <div className="logo-icon">R</div>
          <span className="logo-text">Romaric</span>
        </a>

        {/* Desktop Navigation */}
        <div className="navbar-links">
          {navItems.map(item => (
            <span
              key={item.id}
              className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => scrollToSection(item.id)}
            >
              {item.label}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="navbar-actions">
          {/* Language Toggle */}
          <div className="lang-toggle">
            <button 
              className={`lang-btn ${lang === 'fr' ? 'active' : ''}`}
              onClick={() => setLanguage('fr')}
            >
              FR
            </button>
            <button 
              className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
              onClick={() => setLanguage('en')}
            >
              EN
            </button>
          </div>

          {/* CV Download */}
          <a href="/pas encore" download className="navbar-cta">
            <Download size={16} />
            <span>CV</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button 
            className={`mobile-toggle ${mobileOpen ? 'active' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
          {navItems.map(item => (
            <span
              key={item.id}
              className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => scrollToSection(item.id)}
            >
              {item.label}
            </span>
          ))}
          <div className="mobile-menu-actions">
            <div className="lang-toggle">
              <button 
                className={`lang-btn ${lang === 'fr' ? 'active' : ''}`}
                onClick={() => setLanguage('fr')}
              >
                FR
              </button>
              <button 
                className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
                onClick={() => setLanguage('en')}
              >
                EN
              </button>
            </div>
            <a href="/romaric.pdf" download className="navbar-cta">
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
