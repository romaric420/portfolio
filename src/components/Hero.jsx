import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { MapPin, GraduationCap } from 'lucide-react';
import '../styles/Hero.css';


const CONFIG = {
  profileImage: '/images/profile.jpg',
  name: 'Romaric',
};


const PythonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="url(#pythonGrad)" strokeWidth="1.5">
    <defs>
      <linearGradient id="pythonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3776ab" />
        <stop offset="100%" stopColor="#ffd43b" />
      </linearGradient>
    </defs>
    <path d="M12 2C6.48 2 6 4.02 6 5.5v2.25h6v.75H4.5c-1.57 0-2.94 1.22-3.37 3.53-.5 2.66-.52 4.32 0 7.1.39 2.06 1.31 3.53 2.87 3.53H6v-3.18c0-1.78 1.54-3.35 3.37-3.35h5.26c1.5 0 2.37-.87 2.37-2.37V5.5c0-1.48-.61-2.75-2-3.12-.93-.25-1.83-.38-3-.38zm-2.75 2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z"/>
    <path d="M12 22c5.52 0 6-2.02 6-3.5v-2.25h-6v-.75h7.5c1.57 0 2.94-1.22 3.37-3.53.5-2.66.52-4.32 0-7.1-.39-2.06-1.31-3.53-2.87-3.53H18v3.18c0 1.78-1.54 3.35-3.37 3.35H9.37c-1.5 0-2.37.87-2.37 2.37v4.38c0 1.48.61 2.75 2 3.12.93.25 1.83.38 3 .38zm2.75-2c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
  </svg>
);

const AWSIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#ff9900" strokeWidth="1.5">
    <path d="M6.5 17c-1.5.5-3 .5-4.5 0M22 17c-1.5.5-3 .5-4.5 0M12 17c-2 .7-4 .7-6 0m9.5 0c-1.5.5-3 .5-4.5 0"/>
    <path d="M5 12l2-5h2l2 5M6 10h2M15 12l2-5h2l2 5M16 10h2M9 12v2M15 12v2"/>
  </svg>
);

const GCPIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
    <path d="M12 5l7 4v6l-7 4-7-4V9l7-4z" stroke="#4285f4"/>
    <path d="M12 5v14" stroke="#ea4335"/>
    <path d="M5 9l7 4 7-4" stroke="#fbbc05"/>
    <path d="M5 15l7-4 7 4" stroke="#34a853"/>
  </svg>
);

const MLIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="url(#mlGrad)" strokeWidth="1.5">
    <defs>
      <linearGradient id="mlGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06b6d4" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
    </defs>
    <circle cx="12" cy="6" r="2"/>
    <circle cx="6" cy="12" r="2"/>
    <circle cx="18" cy="12" r="2"/>
    <circle cx="8" cy="18" r="2"/>
    <circle cx="16" cy="18" r="2"/>
    <path d="M12 8v2M8 11l2 1M14 11l-2 1M9 16l2-2M15 16l-2-2"/>
  </svg>
);

const StatsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="1.5">
    <path d="M3 20h18"/>
    <path d="M5 20v-8"/>
    <path d="M9 20v-12"/>
    <path d="M13 20v-6"/>
    <path d="M17 20v-10"/>
    <path d="M21 20v-4"/>
    <path d="M3 12c4-4 8 2 12-2s4-4 6-2" strokeDasharray="2 2"/>
  </svg>
);

const DockerIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#2496ed" strokeWidth="1.5">
    <path d="M4 13h3v3H4zM8 13h3v3H8zM12 13h3v3h-3zM8 9h3v3H8zM12 9h3v3h-3zM16 9h3v3h-3zM12 5h3v3h-3z"/>
    <path d="M2 16c0 0 1 4 10 4s10-4 10-4c0-1-1-2-3-2"/>
  </svg>
);

const SQLIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.5">
    <ellipse cx="12" cy="6" rx="8" ry="3"/>
    <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6"/>
    <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"/>
  </svg>
);

const DataIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="url(#dataGrad)" strokeWidth="1.5">
    <defs>
      <linearGradient id="dataGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06b6d4" />
        <stop offset="100%" stopColor="#10b981" />
      </linearGradient>
    </defs>
    <path d="M3 3v18h18"/>
    <path d="M7 14l4-4 4 4 5-6"/>
    <circle cx="7" cy="14" r="1.5" fill="currentColor"/>
    <circle cx="11" cy="10" r="1.5" fill="currentColor"/>
    <circle cx="15" cy="14" r="1.5" fill="currentColor"/>
    <circle cx="20" cy="8" r="1.5" fill="currentColor"/>
  </svg>
);

// Icônes pour l'orbite interne
const TensorFlowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#ff6f00" strokeWidth="1.5">
    <path d="M12 2L4 6v12l8 4 8-4V6l-8-4z"/>
    <path d="M12 22V10M4 6l8 4 8-4"/>
  </svg>
);

const GitIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#f05032" strokeWidth="1.5">
    <circle cx="12" cy="12" r="3"/>
    <circle cx="6" cy="6" r="2"/>
    <circle cx="18" cy="18" r="2"/>
    <path d="M6 8v8c0 2 2 4 6 4M12 4v5"/>
    <path d="M18 16v-6c0-2-2-4-4-4"/>
  </svg>
);

const APIIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="1.5">
    <path d="M4 6h16M4 12h16M4 18h16"/>
    <circle cx="8" cy="6" r="1.5" fill="currentColor"/>
    <circle cx="14" cy="12" r="1.5" fill="currentColor"/>
    <circle cx="10" cy="18" r="1.5" fill="currentColor"/>
  </svg>
);

const CloudIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="1.5">
    <path d="M6 19a4 4 0 01-.78-7.93A7 7 0 0119.74 10a4.5 4.5 0 01-.26 9H6z"/>
    <path d="M12 13v5M9 16l3 3 3-3"/>
  </svg>
);

const OUTER_ORBIT_ICONS = [
  { Icon: PythonIcon, label: 'Python' },
  { Icon: AWSIcon, label: 'AWS' },
  { Icon: GCPIcon, label: 'GCP' },
  { Icon: MLIcon, label: 'Machine Learning' },
  { Icon: StatsIcon, label: 'Statistics' },
  { Icon: DockerIcon, label: 'Docker' },
  { Icon: SQLIcon, label: 'SQL' },
  { Icon: DataIcon, label: 'Data Science' },
];

const INNER_ORBIT_ICONS = [
  { Icon: TensorFlowIcon, label: 'TensorFlow' },
  { Icon: GitIcon, label: 'Git' },
  { Icon: APIIcon, label: 'APIs' },
  { Icon: CloudIcon, label: 'Cloud' },
];

const Hero = ({ onProjectsClick }) => {
  const { translations } = useTranslation();
  const t = translations.hero || {};

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero">
      <div className="hero-container">
        {/* Left Content */}
        <div className="hero-content">
          <div className="hero-badge">
            <div className="badge-dot-container">
              <span className="badge-dot" />
              <span className="badge-ring" />
            </div>
            <span className="badge-text">{t.status}</span>
          </div>

          <h1 className="hero-title">
            <span className="hero-name">{t.name}</span>
            <span className="hero-role">{t.title1}</span>
            <span className="hero-subtitle">{t.title2}</span>
          </h1>

          <p className="hero-description">{t.description}</p>

          <div className="hero-cta">
            <button onClick={onProjectsClick} className="btn btn-primary">
              {t.cta1}
            </button>
            <button onClick={scrollToContact} className="btn btn-secondary">
              {t.cta2}
            </button>
          </div>

          <div className="hero-info">
            <div className="info-item">
              <MapPin size={22} className="info-icon" />
              <div>
                <div className="info-text">{t.location}</div>
                <div className="info-sub">{t.mobile}</div>
              </div>
            </div>
            <div className="info-item">
              <GraduationCap size={22} className="info-icon" />
              <div>
                <div className="info-text">{t.school}</div>
                <div className="info-sub">{t.degree}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Profile with Orbiting Icons */}
        <div className="hero-visual">
          <div className="profile-wrapper">
            {/* Orbit Rings */}
            <div className="orbit-ring orbit-ring-1" />
            <div className="orbit-ring orbit-ring-2" />
            <div className="orbit-ring orbit-ring-3" />

            {/* Outer Orbit Icons */}
            <div className="orbit-icons">
              {OUTER_ORBIT_ICONS.map((item, i) => (
                <div key={i} className={`orbit-icon pos-${i + 1}`} title={item.label}>
                  <item.Icon />
                </div>
              ))}
            </div>

            {/* Inner Orbit Icons */}
            <div className="orbit-icons-reverse">
              {INNER_ORBIT_ICONS.map((item, i) => (
                <div key={i} className={`orbit-icon inner-${i + 1}`} title={item.label}>
                  <item.Icon />
                </div>
              ))}
            </div>

            {/* Profile Circle */}
            <div className="profile-circle">
              <div className="profile-circle-inner">
                <img
                  src={CONFIG.profileImage}
                  alt={CONFIG.name}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <span className="profile-emoji" style={{ display: 'none' }}>👨🏿‍💻</span>
              </div>
            </div>

            {/* Floating Tech Badges */}
            <div className="tech-badge top-left">
              <span className="tech-badge-text">🚀 Python • SQL • ML</span>
            </div>
            <div className="tech-badge bottom-right">
              <span className="tech-badge-text">☁️ MLOps • Docker • Cloud</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <span className="scroll-text">Scroll</span>
        <div className="scroll-mouse">
          <div className="scroll-wheel" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
