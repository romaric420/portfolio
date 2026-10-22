import React from 'react';
import { useTranslation } from '../hooks/useTranslation.jsx';
import { Mail, Phone, FileDown, FileText, ArrowRight, ArrowUpRight } from 'lucide-react';
import { CV_URL, LETTER_URL } from '../utils/documents';
import '../styles/Contact.css';

const CONFIG = {
  email: 'hippolytetchoffo3@gmail.com',
  phone: '+33753728781',
};

const Contact = ({ onProjectsClick }) => {
  const { translations } = useTranslation();
  const t = translations.contact || {};

  // L'email et le numéro ne sont pas affichés : les boutons ouvrent directement la messagerie ou l'appel
  const contactItems = [
    { icon: Mail, label: t.email?.label, action: t.email?.action, href: `mailto:${CONFIG.email}` },
    { icon: Phone, label: t.phone?.label, action: t.phone?.action, href: `tel:${CONFIG.phone}` },
    { icon: FileDown, label: t.cv?.label, action: t.cv?.action, href: CV_URL, download: true },
    { icon: FileText, label: t.letter?.label, action: t.letter?.action, href: LETTER_URL, download: true },
  ];

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <div className="contact-panel" data-reveal>
          <div className="contact-glow" aria-hidden="true" />

          <div className="contact-header">
            <span className="section-eyebrow">
              <span className="section-number">{t.sectionNumber}</span>
              {t.kicker}
            </span>
            <h2 className="contact-title">{t.title}</h2>
            <p className="contact-subtitle">{t.subtitle}</p>
          </div>

          <div className="contact-items">
            {contactItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <a
                  key={i}
                  href={item.href}
                  download={item.download ? true : undefined}
                  className="contact-item"
                  data-reveal
                  style={{ '--d': i + 1 }}
                >
                  <span className="contact-item-icon"><Icon size={20} /></span>
                  <span className="contact-item-text">
                    <span className="contact-item-label">{item.label}</span>
                    <span className="contact-item-action">{item.action}</span>
                  </span>
                  <ArrowUpRight size={18} className="contact-item-arrow" />
                </a>
              );
            })}
          </div>

          <div className="contact-cta">
            <button onClick={onProjectsClick} className="btn btn-primary">
              <span>{t.viewProjects}</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
