import React from 'react';
import { Download } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { CV_URL, LETTER_URL } from '../utils/documents';
import '../styles/DocLinks.css';

// Téléchargements regroupés dans une seule pastille : CV | LM, libellés complets pour l'infobulle et les lecteurs d'écran
const DocLinks = ({ tabIndex, className = '' }) => {
  const { translations } = useTranslation();
  const nav = translations.nav || {};

  return (
    <div className={`doc-links ${className}`.trim()} role="group" aria-label={`${nav.cvFull} / ${nav.letterFull}`}>
      <a href={CV_URL} download className="doc-link" title={nav.cvFull} aria-label={nav.cvFull} tabIndex={tabIndex}>
        <Download size={16} aria-hidden="true" />
        <span>{nav.cv}</span>
      </a>
      <a href={LETTER_URL} download className="doc-link" title={nav.letterFull} aria-label={nav.letterFull} tabIndex={tabIndex}>
        <span>{nav.letter}</span>
      </a>
    </div>
  );
};

export default DocLinks;
