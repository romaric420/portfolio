import React from 'react';
import { useTranslation } from '../hooks/useTranslation.jsx';
import { MapPin, Github, Linkedin, Mail } from 'lucide-react';
import DocLinks from './DocLinks';
import '../styles/Footer.css';

const LINKS = [
  { href: 'https://github.com/romaric420', label: 'GitHub', icon: Github, external: true },
  { href: 'https://www.linkedin.com/in/romaric-tchoffo-b23921250', label: 'LinkedIn', icon: Linkedin, external: true },
  { href: 'mailto:hippolytetchoffo3@gmail.com', label: 'Email', icon: Mail, external: false },
];

const Footer = () => {
  const { translations } = useTranslation();
  const t = translations.footer || {};

  return (
    <footer className="footer">
      <div className="footer-container">
        <button className="footer-brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Haut de page">
          <span className="footer-logo">R</span>
          <span className="footer-name">Romaric TCHOFFO</span>
        </button>

        <p className="footer-copyright">
          © {new Date().getFullYear()} {t.copyright}
          <span className="footer-location"><MapPin size={14} /> {t.location}</span>
        </p>

        <div className="footer-links">
          <DocLinks />
          <span className="footer-links-sep" aria-hidden="true" />
          {LINKS.map(({ href, label, icon: Icon, external }) => (
            <a
              key={label}
              href={href}
              className="footer-link"
              aria-label={label}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
