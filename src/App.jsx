import React, { useState } from 'react';
import { LanguageProvider } from './hooks/useTranslation.jsx';
import useReveal from './hooks/useReveal';

// Components
import AIBackground from './components/AIBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Projects from './components/Projects';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import QuoteToast from './components/QuoteToast';

// Styles
import './index.css';

function Pages() {
  const [currentPage, setCurrentPage] = useState('home');

  // Animation d'apparition au scroll, relancée à chaque changement de page
  useReveal([currentPage]);

  const handleProjectsClick = () => {
    setCurrentPage('projects');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app">
      <AIBackground />
      <ScrollToTop />
      {/* Hors du switch de pages : le cycle des citations continue sans interruption */}
      <QuoteToast />

      {currentPage === 'home' ? (
        <>
          <Navbar onProjectsClick={handleProjectsClick} currentPage={currentPage} />
          <main>
            <Hero onProjectsClick={handleProjectsClick} />
            <About />
            <Skills />
            <Experience />
            <Contact onProjectsClick={handleProjectsClick} />
          </main>
          <Footer />
        </>
      ) : (
        <>
          <Projects onBack={handleBackToHome} />
          <Footer />
        </>
      )}
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <Pages />
    </LanguageProvider>
  );
}

export default App;
