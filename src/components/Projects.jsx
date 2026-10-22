import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { ArrowLeft, Layers, Sparkles, Brain, TrendingUp, Database, Cpu, Clock } from 'lucide-react';
import useCarousel, { CAROUSEL_QUERY, useMediaQuery } from '../hooks/useCarousel';
import CarouselDots from './CarouselDots';
import '../styles/Projects.css';

// Quatre emplacements de projets, affichés « À venir » en attendant la publication.
const SLOTS = [
  { id: 1, icon: Brain, from: '#2563eb', to: '#06b6d4' },
  { id: 2, icon: TrendingUp, from: '#4f46e5', to: '#7c3aed' },
  { id: 3, icon: Database, from: '#0891b2', to: '#10b981' },
  { id: 4, icon: Cpu, from: '#7c3aed', to: '#db2777' },
];

const Projects = ({ onBack }) => {
  const { translations } = useTranslation();
  const t = translations.projects || {};
  const isCarousel = useMediaQuery(CAROUSEL_QUERY);
  const carousel = useCarousel(SLOTS.length, { enabled: isCarousel, duration: 4000 });
  const { active, previous, backwards } = carousel;

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

      <div
        ref={carousel.rootRef}
        className={`projects-grid ${isCarousel ? 'is-carousel' : ''} ${backwards ? 'is-backwards' : ''}`}
        aria-roledescription={isCarousel ? 'carousel' : undefined}
        {...carousel.swipeHandlers}
      >
        {SLOTS.map((slot, index) => {
          const Icon = slot.icon;
          const isActive = !isCarousel || index === active;
          return (
            <article
              key={slot.id}
              className={`soon-card ${isCarousel && isActive ? 'is-active' : ''} ${isCarousel && index === previous ? 'is-leaving' : ''}`}
              aria-hidden={!isActive}
              style={{ '--from': slot.from, '--to': slot.to, '--i': index }}
            >
              <div className="soon-inner">
                <div className="soon-visual">
                  <span className="soon-ring soon-ring-1" />
                  <span className="soon-ring soon-ring-2" />
                  <span className="soon-icon"><Icon size={30} strokeWidth={1.6} /></span>
                  <span className="soon-particle p1" />
                  <span className="soon-particle p2" />
                  <span className="soon-particle p3" />
                </div>

                <div className="soon-body">
                  <span className="soon-label">{t.projectLabel} {String(slot.id).padStart(2, '0')}</span>
                  <span className="soon-badge"><Clock size={14} /> {t.comingSoon}</span>
                  <div className="soon-skeleton" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                  <span className="soon-text">{t.comingText}</span>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {isCarousel ? (
        <CarouselDots
          carousel={carousel}
          tone="dark"
          items={SLOTS.map((slot) => ({ label: `${t.projectLabel} ${String(slot.id).padStart(2, '0')}`, tint: slot.from }))}
        />
      ) : null}

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
