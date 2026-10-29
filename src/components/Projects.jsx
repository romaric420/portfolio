import React, { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import {
  ArrowLeft, ArrowUpRight, Layers, Sparkles, Lock, Github,
  BarChart3, TrendingUp, UserMinus, MessagesSquare,
  Server, Workflow, FlaskConical, Activity,
} from 'lucide-react';
import '../styles/Projects.css';

// Habillage de chaque piste : couleurs et icônes des 4 projets, dans l'ordre des locales
const TRACK_STYLES = {
  ds: { from: '#2563eb', to: '#06b6d4', icons: [BarChart3, TrendingUp, UserMinus, MessagesSquare] },
  mle: { from: '#7c3aed', to: '#db2777', icons: [Server, Workflow, FlaskConical, Activity] },
};

const ProjectCard = ({ item, index, Icon, prefix, t }) => (
  <article className="project-card" style={{ '--i': index }}>
    <div className="project-card-top">
      <span className="project-icon"><Icon size={22} strokeWidth={1.8} /></span>
      <span className="project-num">{prefix}-{String(index + 1).padStart(2, '0')}</span>
    </div>

    {/* Tant que le projet n'est pas publié, titre et détails restent floutés sous un cadenas */}
    <div className={`project-details ${item.github ? '' : 'is-locked'}`}>
      <div className="project-details-content" aria-hidden={!item.github}>
        <h3 className="project-title">{item.title}</h3>
        <p className="project-text">{item.text}</p>
        <ul className="project-tags">
          {item.tags.map((tag) => <li key={tag}>{tag}</li>)}
        </ul>
      </div>
      {item.github ? null : (
        <div className="project-lock">
          <span className="project-lock-icon"><Lock size={18} strokeWidth={2} /></span>
          <span className="project-lock-text">{t.comingSoon}</span>
        </div>
      )}
    </div>

    {/* Une fois le projet publié, renseigner "github" dans les locales pour activer le lien */}
    {item.github ? (
      <a className="project-link" href={item.github} target="_blank" rel="noopener noreferrer">
        <Github size={16} /> {t.viewCode} <ArrowUpRight size={15} />
      </a>
    ) : (
      <span className="project-link is-soon"><Github size={16} /> {t.codeSoon}</span>
    )}
  </article>
);

const Projects = ({ onBack }) => {
  const { translations } = useTranslation();
  const t = translations.projects || {};
  const tracks = t.tracks || [];
  // Sur mobile, une seule piste affichée à la fois (sélecteur) ; sur grand écran, les deux côte à côte
  const [selected, setSelected] = useState(tracks[0]?.id);

  return (
    <div className="projects-page">
      <button onClick={onBack} className="projects-back-btn">
        <ArrowLeft size={18} />
        <span>{t.backButton}</span>
      </button>

      <header className="projects-header">
        <span className="section-eyebrow">
          <span className="section-number">{t.sectionNumber}</span>
          <Sparkles size={14} /> Portfolio
        </span>
        <h1 className="projects-title">{t.title}</h1>
        <p className="projects-subtitle">{t.subtitle}</p>
      </header>

      <div className="track-switch" role="group" aria-label={t.switchLabel}>
        {tracks.map((track) => (
          <button
            key={track.id}
            type="button"
            className={`track-switch-btn ${selected === track.id ? 'active' : ''}`}
            style={{ '--from': TRACK_STYLES[track.id].from, '--to': TRACK_STYLES[track.id].to }}
            aria-pressed={selected === track.id}
            onClick={() => setSelected(track.id)}
          >
            {track.role}
          </button>
        ))}
      </div>

      <div className="tracks">
        {tracks.map((track) => {
          const style = TRACK_STYLES[track.id];
          return (
            <section
              key={track.id}
              className={`track ${selected === track.id ? 'is-selected' : ''}`}
              style={{ '--from': style.from, '--to': style.to }}
              aria-labelledby={`track-${track.id}`}
            >
              <header className="track-header">
                <span className="track-label">{track.label}</span>
                <h2 className="track-title" id={`track-${track.id}`}>
                  {t.titlePrefix} <span className="track-role">{track.role}</span>
                </h2>
                <p className="track-intro">{track.intro}</p>
              </header>

              <div className="track-grid">
                {track.items.map((item, index) => (
                  <ProjectCard
                    key={item.title}
                    item={item}
                    index={index}
                    Icon={style.icons[index]}
                    prefix={track.id.toUpperCase()}
                    t={t}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <div className="projects-cta">
        <p className="projects-cta-text">{t.ctaText}</p>
        <button onClick={onBack} className="btn btn-secondary">
          <Layers size={18} />
          {t.backButton}
        </button>
      </div>
    </div>
  );
};

export default Projects;
