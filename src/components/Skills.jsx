import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { Database, Cloud, Sigma, Brain } from 'lucide-react';
import '../styles/Skills.css';

const iconMap = {
  database: Database,
  cloud: Cloud,
  calculator: Sigma,
  brain: Brain
};

const Skills = () => {
  const { translations } = useTranslation();
  const t = translations.skills || {};
  const categories = t.categories || {};
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const categoryOrder = ['dataScience', 'mlops', 'mathematics', 'mlAlgorithms'];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className={`skills ${isVisible ? 'visible' : ''}`} ref={sectionRef}>
      <div className="skills-container">
        {/* Header */}
        <div className="skills-header">
          <span className="skills-number">{t.sectionNumber}</span>
          <h2 className="skills-title">{t.title}</h2>
        </div>

        {/* Skills Grid */}
        <div className="skills-grid">
          {categoryOrder.map((key, index) => {
            const category = categories[key];
            if (!category) return null;

            const IconComponent = iconMap[category.icon] || Database;

            return (
              <div 
                key={key} 
                className="skill-card"
                data-category={key}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Card Header */}
                <div className="skill-card-header">
                  <div className="skill-icon-wrapper">
                    <IconComponent size={24} strokeWidth={1.5} />
                  </div>
                  <h3 className="skill-card-title">{category.title}</h3>
                </div>

                {/* Skills Tags */}
                <div className="skill-tags">
                  {(category.skills || []).map((skill, i) => (
                    <span 
                      key={i} 
                      className="skill-tag"
                      style={{ animationDelay: `${(index * 0.1) + (i * 0.05)}s` }}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
