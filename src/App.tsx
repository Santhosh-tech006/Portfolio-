import React, { useState, useEffect } from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { CursorProvider } from './context/CursorContext';
import { CinematicBackground } from './components/CinematicBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Education } from './components/Education';
import { TechnicalSkills } from './components/TechnicalSkills';
import { FeaturedProjects } from './components/FeaturedProjects';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { FloatingBackToTop } from './components/FloatingBackToTop';
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

  // Intersection Observer for exact 6 sections
  useEffect(() => {
    const sectionIds = [
      'home',
      'education',
      'skills',
      'projects',
      'experience',
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
    <CursorProvider>
      <div className="min-h-screen bg-[#000000] text-[#FFFFFF] selection:bg-blue-600/30 selection:text-cyan-300 relative overflow-x-hidden">
        {/* Lightweight Cinematic Background Texture: Faint Grid & Sparse Canvas Particles */}
        <CinematicBackground />

        {/* Minimal Navigation Bar */}
        <Navbar onOpenAdmin={() => setIsAdminOpen(true)} />

        {/* Main Single-page Content Sections: Home, Education, Skills, Projects, Experience, Contact */}
        <main className="relative z-10">
          <Hero />
          <Education />
          <TechnicalSkills />
          <FeaturedProjects onOpenAdmin={() => setIsAdminOpen(true)} />
          <Experience onOpenAdmin={() => setIsAdminOpen(true)} />
          <Contact />
        </main>

        {/* Clean Minimal Footer */}
        <Footer />

        {/* Floating Back to Top Button */}
        <FloatingBackToTop />

        {/* Admin Panel Modal */}
        <AdminDashboard isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
      </div>
    </CursorProvider>
  );
};

export default function App() {
  return (
    <PortfolioProvider>
      <PortfolioContent />
    </PortfolioProvider>
  );
}
