import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { ArrowLeft, ExternalLink, Github, Layers, Shield, Users, TrendingUp, Database, Sparkles } from 'lucide-react';
import '../styles/Projects.css';

// Configuration des projets - MODIFIER LES URLs ICI
const PROJECTS_CONFIG = [
  {
    id: 1,
    icon: Shield,
    color: '#2563eb',
    gradient: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
    image: '/images/churnguard.png',
    tags: ['Python', 'Streamlit', 'Scikit-learn', 'XGBoost', 'Pandas'],
    liveUrl: '', // Mets ton lien Streamlit ici
    githubUrl: '', // Mets ton lien GitHub ici
  },
  {
    id: 2,
    icon: Users,
    color: '#7c3aed',
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)',
    image: '/images/talentmatch.png',
    tags: ['Python', 'Streamlit', 'NLP', 'Machine Learning', 'Matching'],
    liveUrl: '', // Mets ton lien Streamlit ici
    githubUrl: '', // Mets ton lien GitHub ici
  },
  {
    id: 3,
    icon: TrendingUp,
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
    image: '/images/priceprediction.png',
    tags: ['Python', 'Streamlit', 'Régression', 'Data Analysis', 'Plotly'],
    liveUrl: '', // Mets ton lien Streamlit ici
    githubUrl: '', // Mets ton lien GitHub ici
  },
];

const Projects = ({ onBack }) => {
  const { translations } = useTranslation();
  const t = translations.projects || {};
  const projectsList = t.list || [];

  return (
    <div className="projects-page">
      {/* Decorative Background */}
      <div className="projects-bg">
        <div className="projects-bg-blob blob-1" />
        <div className="projects-bg-blob blob-2" />
        <div className="projects-bg-blob blob-3" />
      </div>

      {/* Back Button */}
      <button onClick={onBack} className="projects-back-btn">
        <ArrowLeft size={20} />
        <span>{t.backButton}</span>
      </button>

      {/* Header */}
      <div className="projects-header">
        <div className="projects-header-badge">
          <Sparkles size={16} />
          <span>{t.sectionNumber}</span>
        </div>
        <h1 className="projects-title">{t.title}</h1>
        <p className="projects-subtitle">{t.subtitle}</p>
      </div>

      {/* Projects Grid */}
      <div className="projects-grid">
        {PROJECTS_CONFIG.map((project, index) => {
          const projectData = projectsList[index] || {};
          const IconComponent = project.icon;
          
          return (
            <article key={project.id} className="project-card" style={{ '--card-delay': `${index * 0.15}s` }}>
              {/* Card Header with Icon */}
              <div className="project-card-header" style={{ background: project.gradient }}>
                <div className="project-icon-wrapper">
                  <IconComponent size={32} strokeWidth={1.5} />
                </div>
                <div className="project-card-pattern" />
              </div>

              {/* Image Placeholder */}
              <div className="project-image-container">
                <div className="project-image-placeholder">
                  <Database size={40} strokeWidth={1} />
                  <span>{t.imagePlaceholder || 'Image à venir'}</span>
                </div>
                {/* Quand tu auras les images, décommente et adapte:
                <img 
                  src={project.image} 
                  alt={projectData.title}
                  className="project-image"
                  loading="lazy"
                />
                */}
              </div>

              {/* Card Content */}
              <div className="project-card-content">
                <h3 className="project-title">{projectData.title || `Projet ${project.id}`}</h3>
                <p className="project-description">{projectData.description || 'Description du projet'}</p>
                
                {/* Tags */}
                <div className="project-tags">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="project-tag" style={{ '--tag-color': project.color }}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="project-links">
                  {project.liveUrl ? (
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="project-link project-link-primary"
                      style={{ background: project.gradient }}
                    >
                      <ExternalLink size={18} />
                      <span>{t.viewLive || 'Voir le projet'}</span>
                    </a>
                  ) : (
                    <span className="project-link project-link-disabled">
                      <ExternalLink size={18} />
                      <span>{t.comingSoon || 'Lien à venir'}</span>
                    </span>
                  )}
                  
                  {project.githubUrl ? (
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="project-link project-link-secondary"
                    >
                      <Github size={18} />
                      <span>Code</span>
                    </a>
                  ) : (
                    <span className="project-link project-link-secondary project-link-disabled">
                      <Github size={18} />
                      <span>Code</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="project-card-glow" style={{ background: project.gradient }} />
            </article>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="projects-cta">
        <p className="projects-cta-text">{t.ctaText || "D'autres projets arrivent bientôt !"}</p>
        <button onClick={onBack} className="btn btn-secondary">
          <Layers size={20} />
          {t.backButton}
        </button>
      </div>
    </div>
  );
};

export default Projects;
