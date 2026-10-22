import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { Target, Sparkles, Users } from 'lucide-react';
import useCarousel, { CAROUSEL_QUERY, useMediaQuery } from '../hooks/useCarousel';
import CarouselDots from './CarouselDots';
import '../styles/About.css';

const About = () => {
  const { translations } = useTranslation();
  const t = translations.about || {};
  const isCarousel = useMediaQuery(CAROUSEL_QUERY);
  const carousel = useCarousel(3, { enabled: isCarousel, duration: 5000 });
  const { active, previous, backwards } = carousel;

  // Classes et attributs d'une carte selon sa place dans le carrousel mobile
  const cardProps = (index) => {
    const isActive = !isCarousel || index === active;
    return {
      className: `about-card card ${isCarousel && isActive ? 'is-active' : ''} ${isCarousel && index === previous ? 'is-leaving' : ''}`,
      'aria-hidden': !isActive,
    };
  };

  return (
    <section id="about" className="section about-section">
      <div className="container">
        <div className="section-header" data-reveal>
          <span className="section-eyebrow">
            <span className="section-number">{t.sectionNumber}</span>
            {t.kicker}
          </span>
          <h2 className="section-title">{t.title}</h2>
          <div className="section-line" />
        </div>

        <div className="about-grid">
          {/* Texte */}
          <div className="about-text card" data-reveal>
            <p className="about-lead">{t.paragraph1}</p>
            <p>{t.paragraph2}</p>
            <p className="about-goal">{t.paragraph3}</p>

            <div className="about-highlights">
              {(t.highlights || []).map((h, i) => (
                <div key={i} className="highlight">
                  <span className="highlight-value text-gradient">{h.value}</span>
                  <span className="highlight-label">{h.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cartes : objectif, centres d'intérêt, puis soft skills */}
          <div className="about-cards-wrap">
            <div
              ref={carousel.rootRef}
              className={`about-cards ${isCarousel ? 'is-carousel' : ''} ${backwards ? 'is-backwards' : ''}`}
              aria-roledescription={isCarousel ? 'carousel' : undefined}
              {...carousel.swipeHandlers}
            >
              <div {...cardProps(0)} data-reveal style={{ '--d': 1 }}>
                <div className="about-card-header">
                  <span className="about-card-icon"><Target size={22} /></span>
                  <h3 className="about-card-title">{t.objectiveTitle}</h3>
                </div>
                <p className="about-card-text">{t.objectiveText}</p>
              </div>

              <div {...cardProps(1)} data-reveal style={{ '--d': 2 }}>
                <div className="about-card-header">
                  <span className="about-card-icon"><Sparkles size={22} /></span>
                  <h3 className="about-card-title">{t.hobbiesTitle}</h3>
                </div>
                <div className="tag-list">
                  {(t.hobbies || []).map((h, i) => (
                    <span key={i} className="chip" style={{ '--t': i }}>{h}</span>
                  ))}
                </div>
              </div>

              <div {...cardProps(2)} data-reveal style={{ '--d': 3 }}>
                <div className="about-card-header">
                  <span className="about-card-icon"><Users size={22} /></span>
                  <h3 className="about-card-title">{t.traitsTitle}</h3>
                </div>
                <div className="tag-list">
                  {(t.traits || []).map((trait, i) => (
                    <span key={i} className="chip chip-accent" style={{ '--t': i }}>{trait}</span>
                  ))}
                </div>
              </div>
            </div>

            {isCarousel ? (
              <CarouselDots
                carousel={carousel}
                items={[
                  { label: t.objectiveTitle, tint: '#2563eb' },
                  { label: t.hobbiesTitle, tint: '#4f46e5' },
                  { label: t.traitsTitle, tint: '#7c3aed' },
                ]}
              />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
