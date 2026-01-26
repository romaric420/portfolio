import React, { useState } from 'react';
import { LanguageProvider } from './hooks/useTranslation.jsx';

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

// Styles
import './index.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleProjectsClick = () => {
    setCurrentPage('projects');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <LanguageProvider>
      <div className="app">
        <AIBackground />

        {currentPage === 'home' ? (
          <>
            <Navbar onProjectsClick={handleProjectsClick} currentPage={currentPage} />
            <Hero onProjectsClick={handleProjectsClick} />
            <About />
            <Skills />
            <Experience />
            <Contact onProjectsClick={handleProjectsClick} />
            <Footer />
          </>
        ) : (
          <>
            <Projects onBack={handleBackToHome} />
            <Footer />
          </>
        )}
      </div>
    </LanguageProvider>
  );
}

export default App;