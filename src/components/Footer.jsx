import React from 'react';
import { useTranslation } from '../hooks/useTranslation.jsx';
import { MapPin, Github, Linkedin, Mail } from 'lucide-react';
import '../styles/Footer.css';

const Footer = () => {
  const { translations } = useTranslation();
  const t = translations.footer || {};

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Logo */}
          <div className="footer-brand" onClick={scrollToTop}>
            <span className="footer-logo">R</span>
          </div>

          {/* Copyright */}
          <p className="footer-copyright">{t.copyright}</p>

          {/* Social Links */}
          <div className="footer-links">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="footer-link">
              <Github size={18} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-link">
              <Linkedin size={18} />
            </a>
            <a href="mailto:contact@example.com" className="footer-link">
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;