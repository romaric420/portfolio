import React, { useState } from 'react';
import { LanguageProvider } from './hooks/useTranslation.jsx';
import useReveal from './hooks/useReveal';
import { pageTransition } from './utils/sectionTransition';

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
    pageTransition(() => setCurrentPage('projects'), 'to-projects');
  };

  const handleBackToHome = () => {
    pageTransition(() => setCurrentPage('home'), 'to-home');
  };

  return (
    <div className="app">
      <AIBackground />
      <ScrollToTop />
      {/* Citations uniquement sur l'accueil : sur la page Projets, elles masqueraient les cartes */}
      {currentPage === 'home' ? <QuoteToast /> : null}

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
