import React, { useState, useEffect } from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Education } from './components/Education';
import { TechnicalSkills } from './components/TechnicalSkills';
import { FeaturedProjects } from './components/FeaturedProjects';
import { Achievements } from './components/Achievements';
import { Certifications } from './components/Certifications';
import { ResumeSection } from './components/ResumeSection';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/AdminDashboard';

const PortfolioContent: React.FC = () => {
  const { setActiveSection } = usePortfolio();
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Check URL hash for admin trigger (#admin or ?admin)
  useEffect(() => {
    const checkAdminTrigger = () => {
      if (
        window.location.hash === '#admin' ||
        window.location.pathname.includes('/admin') ||
        window.location.search.includes('admin=true')
      ) {
        setIsAdminOpen(true);
      }
    };
    checkAdminTrigger();
    window.addEventListener('hashchange', checkAdminTrigger);
    return () => window.removeEventListener('hashchange', checkAdminTrigger);
  }, []);

  // Intersection Observer for scroll spy
  useEffect(() => {
    const sectionIds = [
      'home',
      'about',
      'education',
      'skills',
      'projects',
      'achievements',
      'certifications',
      'resume',
      'contact',
    ];

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [setActiveSection]);

  return (
    <div className="min-h-screen bg-white text-slate-700 selection:bg-blue-100 selection:text-blue-700">
      {/* Clean Fixed Header */}
      <Navbar onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Main Single-page Content Sections */}
      <main>
        <Hero />
        <About />
        <Education onOpenAdmin={() => setIsAdminOpen(true)} />
        <TechnicalSkills onOpenAdmin={() => setIsAdminOpen(true)} />
        <FeaturedProjects onOpenAdmin={() => setIsAdminOpen(true)} />
        <Achievements onOpenAdmin={() => setIsAdminOpen(true)} />
        <Certifications onOpenAdmin={() => setIsAdminOpen(true)} />
        <ResumeSection onOpenAdmin={() => setIsAdminOpen(true)} />
        <Contact />
      </main>

      {/* Clean Footer (#0F172A) */}
      <Footer />

      {/* Admin Panel Modal */}
      <AdminDashboard isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </div>
  );
};

export default function App() {
  return (
    <PortfolioProvider>
      <PortfolioContent />
    </PortfolioProvider>
  );
}
