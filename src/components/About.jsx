import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { Target, Sparkles } from 'lucide-react';
import '../styles/Sections.css';
import '../styles/About.css';

const About = () => {
  const { translations } = useTranslation();
  const t = translations.about || {};

  return (
    <section id="about" className="section">
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div className="section-header">
          <span className="section-number">{t.sectionNumber}</span>
          <h2 className="section-title">{t.title}</h2>
          <div className="section-line" />
        </div>

        {/* Content Grid */}
        <div className="about-grid">
          {/* Left - Text */}
          <div className="about-text">
            <p>{t.paragraph1}</p>
            <p>{t.paragraph2}</p>
            <p>{t.paragraph3}</p>

            {/* Traits Card */}
            <div className="traits-card glass">
              <h4 className="traits-title">{t.traitsTitle}</h4>
              <div className="traits-list">
                {(t.traits || []).map((trait, i) => (
                  <span key={i} className="trait-tag">{trait}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Cards */}
          <div className="about-cards">
            {/* Objective Card */}
            <div className="about-card glass">
              <div className="about-card-header">
                <div className="about-card-icon">
                  <Target size={28} />
                </div>
                <h4 className="about-card-title">{t.objectiveTitle}</h4>
              </div>
              <p className="about-card-text">{t.objectiveText}</p>
            </div>

            {/* Hobbies Card */}
            <div className="about-card glass">
              <div className="about-card-header">
                <div className="about-card-icon">
                  <Sparkles size={28} />
                </div>
                <h4 className="about-card-title">{t.hobbiesTitle}</h4>
              </div>
              <div className="hobbies-list">
                <span className="hobby-item">{t.fitness}</span>
                <span className="hobby-item">{t.reading}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
