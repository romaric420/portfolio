import React from 'react';
import { useTranslation } from '../hooks/useTranslation.jsx';
import { Mail, Phone, FileDown, ArrowRight } from 'lucide-react';
import '../styles/Contact.css';

// Configuration - MODIFIER ICI
const CONFIG = {
  email: 'votre.email@example.com',
  phone: '+33 6 XX XX XX XX',
};

const Contact = ({ onProjectsClick }) => {
  const { translations } = useTranslation();
  const t = translations.contact || {};

  const contactItems = [
    {
      icon: <Mail size={20} />,
      label: t.email?.label,
      action: t.email?.action,
      href: `mailto:${CONFIG.email}`,
      isDownload: false
    },
    {
      icon: <Phone size={20} />,
      label: t.phone?.label,
      action: t.phone?.action,
      href: `tel:${CONFIG.phone.replace(/\s/g, '')}`,
      isDownload: false
    },
    {
      icon: <FileDown size={20} />,
      label: t.cv?.label,
      action: t.cv?.action,
      href: '/cv-romaric.pdf',
      isDownload: true
    }
  ];

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        {/* Header */}
        <div className="contact-header">
          <span className="contact-badge">{t.sectionNumber}</span>
          <h2 className="contact-title">{t.title}</h2>
          <p className="contact-subtitle">{t.subtitle}</p>
        </div>

        {/* Contact Card */}
        <div className="contact-card">
          <div className="contact-items">
            {contactItems.map((item, i) => (
              <a
                key={i}
                href={item.href}
                download={item.isDownload ? true : undefined}
                className="contact-item"
              >
                <div className="contact-item-icon">
                  {item.icon}
                </div>
                <div className="contact-item-text">
                  <span className="contact-item-label">{item.label}</span>
                  <span className="contact-item-action">{item.action}</span>
                </div>
              </a>
            ))}
          </div>

          {/* Projects Button */}
          <div className="contact-cta">
            <button onClick={onProjectsClick} className="btn-projects">
              <span>{t.viewProjects || 'Voir mes projets'}</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;