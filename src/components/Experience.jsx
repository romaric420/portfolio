import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { GraduationCap, Briefcase, Award, BookOpen } from 'lucide-react';
import useCarousel, { CAROUSEL_QUERY, useMediaQuery } from '../hooks/useCarousel';
import CarouselDots from './CarouselDots';
import '../styles/Experience.css';

const TINTS = { experience: '#2563eb', formation: '#7c3aed' };

/**
 * Une colonne de frise chronologique (expériences ou parcours académique).
 * Sur mobile, les étapes défilent une par une, chaque colonne avec sa propre animation.
 */
const Timeline = ({ title, icon: Icon, items, variant, isCarousel }) => {
  const carousel = useCarousel(items.length, { enabled: isCarousel, duration: 5500 });
  const { active, previous, backwards } = carousel;

  return (
    <div className={`experience-column ${variant}`}>
      <div className="column-header" data-reveal>
        <span className={`column-icon ${variant}`}><Icon size={22} /></span>
        <h3 className="column-title">{title}</h3>
      </div>

      <div
        ref={carousel.rootRef}
        className={`timeline ${isCarousel ? 'is-carousel' : ''} ${backwards ? 'is-backwards' : ''}`}
        aria-roledescription={isCarousel ? 'carousel' : undefined}
        {...carousel.swipeHandlers}
      >
        {items.map((item, index) => {
          const isActive = !isCarousel || index === active;
          return (
            <div
              key={index}
              className={`timeline-item ${isCarousel && isActive ? 'is-active' : ''} ${isCarousel && index === previous ? 'is-leaving' : ''}`}
              data-reveal
              aria-hidden={!isActive}
              style={{ '--d': index }}
            >
              <span className={`timeline-dot ${variant}`} />
              <div className="timeline-content card">
                <div className="timeline-top">
                  <span className="timeline-period">{item.period}</span>
                  {item.meta ? <span className="timeline-meta">{item.meta}</span> : null}
                </div>
                <h4 className="timeline-title">{item.title}</h4>
                <span className="timeline-company">{item.company}</span>
                <p className="timeline-description">{item.description}</p>
                <div className="timeline-skills">
                  {(item.skills || []).map((skill, i) => (
                    <span key={i} className={`skill-pill ${variant}`} style={{ '--t': i }}>{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {isCarousel ? (
        <CarouselDots
          carousel={carousel}
          items={items.map((item) => ({ label: `${item.title} · ${item.period}`, tint: TINTS[variant] }))}
        />
      ) : null}
    </div>
  );
};

/** Modules de la formation continue : grille sur grand écran, carrousel sur mobile. */
const TrainingModules = ({ modules, isCarousel }) => {
  const carousel = useCarousel(modules.length, { enabled: isCarousel, duration: 3500 });
  const { active, previous, backwards } = carousel;

  return (
    <>
      <ol
        ref={carousel.rootRef}
        className={`module-grid ${isCarousel ? 'is-carousel' : ''} ${backwards ? 'is-backwards' : ''}`}
        aria-roledescription={isCarousel ? 'carousel' : undefined}
        {...carousel.swipeHandlers}
      >
        {modules.map((m, i) => {
          const isActive = !isCarousel || i === active;
          return (
            <li
              key={i}
              className={`module ${isCarousel && isActive ? 'is-active' : ''} ${isCarousel && i === previous ? 'is-leaving' : ''}`}
              aria-hidden={!isActive}
              style={{ '--i': i }}
            >
              <span className="module-index">
                <span className="module-index-num">{String(i + 1).padStart(2, '0')}</span>
              </span>
              <div className="module-body">
                <span className="module-title">{m.title}</span>
                <span className="module-content">{m.content}</span>
              </div>
            </li>
          );
        })}
      </ol>

      {isCarousel ? (
        <CarouselDots carousel={carousel} items={modules.map((m) => ({ label: m.title, tint: '#10b981' }))} />
      ) : null}
    </>
  );
};

const Experience = () => {
  const { translations } = useTranslation();
  const t = translations.experience || {};
  const training = t.training || {};
  const isCarousel = useMediaQuery(CAROUSEL_QUERY);

  return (
    <section id="experience" className="section experience-section">
      <div className="container">
        <div className="section-header" data-reveal>
          <span className="section-eyebrow">
            <span className="section-number">{t.sectionNumber}</span>
            {t.kicker}
          </span>
          <h2 className="section-title">{t.title}</h2>
          <div className="section-line" />
        </div>

        <div className="experience-grid">
          <Timeline title={t.experienceTitle} icon={Briefcase} items={t.experiences || []} variant="experience" isCarousel={isCarousel} />
          <Timeline title={t.academicTitle} icon={GraduationCap} items={t.academic || []} variant="formation" isCarousel={isCarousel} />
        </div>

        {/* Formation continue : MLPRO */}
        <div className="training-block">
          <div className="column-header" data-reveal>
            <span className="column-icon training"><Award size={22} /></span>
            <h3 className="column-title">{t.trainingTitle}</h3>
          </div>

          <div className="training-card card" data-reveal>
            <div className="training-head">
              <div className="training-badge"><BookOpen size={26} /></div>
              <div className="training-intro">
                <h4 className="training-title">{training.title}</h4>
                <span className="training-company">{training.company}</span>
                <p className="training-description">{training.description}</p>
              </div>
            </div>

            <TrainingModules modules={training.modules || []} isCarousel={isCarousel} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
