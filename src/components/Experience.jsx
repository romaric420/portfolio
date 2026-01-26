import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { GraduationCap, Briefcase } from 'lucide-react';
import '../styles/Sections.css';
import '../styles/Experience.css';

const Experience = () => {
  const { translations } = useTranslation();
  const t = translations.experience || {};
  const experiences = t.experiences || [];
  const formations = t.formations || [];

  return (
    <section id="experience" className="section experience-section">
      <div className="experience-container">
        {/* Header */}
        <div className="section-header">
          <span className="section-number">{t.sectionNumber}</span>
          <h2 className="section-title">{t.title}</h2>
          <div className="section-line" />
        </div>

        {/* Two Column Layout */}
        <div className="experience-grid">
          {/* Expériences Professionnelles */}
          <div className="experience-column">
            <div className="column-header">
              <div className="column-icon experience">
                <Briefcase size={24} />
              </div>
              <h3 className="column-title">{t.experienceTitle}</h3>
            </div>
            
            <div className="timeline">
              {experiences.map((item, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-dot experience" />
                  <div className="timeline-content">
                    <span className="timeline-period">{item.period}</span>
                    <h4 className="timeline-title">{item.title}</h4>
                    <span className="timeline-company">{item.company}</span>
                    <p className="timeline-description">{item.description}</p>
                    <div className="timeline-skills">
                      {(item.skills || []).map((skill, i) => (
                        <span key={i} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Formations */}
          <div className="experience-column">
            <div className="column-header">
              <div className="column-icon formation">
                <GraduationCap size={24} />
              </div>
              <h3 className="column-title">{t.formationTitle}</h3>
            </div>
            
            <div className="timeline">
              {formations.map((item, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-dot formation" />
                  <div className="timeline-content">
                    <span className="timeline-period">{item.period}</span>
                    <h4 className="timeline-title">{item.title}</h4>
                    <span className="timeline-company">{item.company}</span>
                    <p className="timeline-description">{item.description}</p>
                    <div className="timeline-skills">
                      {(item.skills || []).map((skill, i) => (
                        <span key={i} className="skill-tag formation">{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
