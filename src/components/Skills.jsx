import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import useCarousel, { CAROUSEL_QUERY, useMediaQuery } from '../hooks/useCarousel';
import CarouselDots from './CarouselDots';
import {
  Database, TrendingUp, Cpu, Workflow, Cloud, Sigma,
  Target, Search, Brain, Rocket, Activity,
} from 'lucide-react';
import '../styles/Skills.css';

const ICONS = {
  database: Database,
  trending: TrendingUp,
  cpu: Cpu,
  workflow: Workflow,
  cloud: Cloud,
  sigma: Sigma,
  target: Target,
  search: Search,
  brain: Brain,
  rocket: Rocket,
  activity: Activity,
};

// Une teinte par catégorie pour guider l'œil
const TINTS = ['#2563eb', '#4f46e5', '#7c3aed', '#0891b2', '#0ea5e9', '#10b981'];

const Skills = () => {
  const { translations } = useTranslation();
  const t = translations.skills || {};
  const categories = t.categories || [];
  const method = t.method || [];

  const isCarousel = useMediaQuery(CAROUSEL_QUERY);
  const carousel = useCarousel(categories.length, { enabled: isCarousel, duration: 4500 });
  const { active, previous, backwards } = carousel;

  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        <div className="section-header" data-reveal>
          <span className="section-eyebrow">
            <span className="section-number">{t.sectionNumber}</span>
            Stack
          </span>
          <h2 className="section-title">{t.title}</h2>
          <p className="section-subtitle">{t.subtitle}</p>
        </div>

        {/* Méthode : pipeline d'un projet ML */}
        <div className="method card" data-reveal>
          <span className="method-title">{t.methodTitle}</span>
          <div className="method-flow">
          <div className="method-track" aria-hidden="true"><span /></div>
          <ol className="method-steps">
            {method.map((step, i) => {
              const Icon = ICONS[step.icon] || Target;
              return (
                <li key={i} className="method-step" style={{ '--i': i }}>
                  <span className="method-icon">
                    <Icon size={20} />
                    <span className="method-index">{String(i + 1).padStart(2, '0')}</span>
                  </span>
                  <span className="method-name">{step.title}</span>
                  <span className="method-text">{step.text}</span>
                </li>
              );
            })}
          </ol>
          </div>
        </div>

        {/* Catégories de compétences */}
        <div
          ref={carousel.rootRef}
          className={`skills-grid ${isCarousel ? 'is-carousel' : ''} ${backwards ? 'is-backwards' : ''}`}
          aria-roledescription={isCarousel ? 'carousel' : undefined}
          {...carousel.swipeHandlers}
        >
          {categories.map((cat, index) => {
            const Icon = ICONS[cat.icon] || Database;
            const isActive = !isCarousel || index === active;
            const isLeaving = isCarousel && index === previous;
            return (
              <article
                key={index}
                className={`skill-card card ${isCarousel && isActive ? 'is-active' : ''} ${isLeaving ? 'is-leaving' : ''}`}
                data-reveal
                aria-hidden={!isActive}
                style={{ '--d': index % 3, '--tint': TINTS[index % TINTS.length] }}
              >
                <header className="skill-card-header">
                  <span className="skill-icon-wrapper"><Icon size={22} strokeWidth={1.8} /></span>
                  <h3 className="skill-card-title">{cat.title}</h3>
                  <span className="skill-count">{(cat.skills || []).length}</span>
                </header>
                <div className="skill-tags">
                  {(cat.skills || []).map((skill, i) => (
                    <span key={i} className="skill-tag" style={{ '--t': i }}>{skill.name || skill}</span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>

        {isCarousel ? (
          <CarouselDots
            carousel={carousel}
            items={categories.map((cat, index) => ({ label: cat.title, tint: TINTS[index % TINTS.length] }))}
          />
        ) : null}
      </div>
    </section>
  );
};

export default Skills;
